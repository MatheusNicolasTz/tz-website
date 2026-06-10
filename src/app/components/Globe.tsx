"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BRAZIL = { lat: -14.235, lon: -51.9253 };
const MASK_W = 1024;
const MASK_H = 512;

function ll2v(latDeg: number, lonDeg: number, r: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.cos(lon),
    r * Math.sin(lat),
    -r * Math.cos(lat) * Math.sin(lon)
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function sampleImage(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = MASK_W;
  c.height = MASK_H;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, MASK_W, MASK_H);
  return ctx.getImageData(0, 0, MASK_W, MASK_H).data;
}

const dustVertex = /* glsl */ `
  attribute float aElev;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPxRatio;
  varying float vElev;
  varying float vFade;
  void main() {
    vec3 p = position;
    float breathe = sin(uTime * 0.7 + aPhase * 6.28318);
    p += normalize(position) * breathe * 0.006 * (0.25 + aElev);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min((2.2 + aElev * 3.5) * uPxRatio * (3.2 / -mv.z), 18.0);
    vElev = aElev;
    vFade = 0.82 + 0.18 * breathe;
  }
`;

const dustFragment = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  varying float vElev;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, d) * vFade;
    vec3 col = mix(uColorLow, uColorHigh, smoothstep(0.0, 0.35, vElev));
    gl_FragColor = vec4(col, alpha * 0.9);
  }
`;

const oceanVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  void main() {
    vec3 p = position;
    float ripple = sin(position.x * 9.0 + uTime * 0.8)
                 * sin(position.y * 8.0 - uTime * 0.6)
                 * sin(position.z * 10.0 + uTime * 0.5);
    p += normal * ripple * 0.0035;
    vec4 wp = modelMatrix * vec4(p, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const oceanFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uGlow;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 n = normalize(vNormal);
    float fres = pow(1.0 - max(dot(viewDir, n), 0.0), 2.2);
    vec3 col = uDeep + uGlow * fres * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const haloVertex = /* glsl */ `
  varying vec3 vN;
  void main() {
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vN;
  void main() {
    float rim = 1.0 - abs(dot(normalize(vN), vec3(0.0, 0.0, 1.0)));
    float i = pow(rim, 6.0) * 0.3;
    gl_FragColor = vec4(uColor * i, i);
  }
`;

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    let disposed = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
    camera.position.set(0, 0, 3.3);

    const pitchGroup = new THREE.Group();
    const yawGroup = new THREE.Group();
    pitchGroup.add(yawGroup);
    scene.add(pitchGroup);

    const cream = new THREE.Color("#ece7db");
    const brass = new THREE.Color("#7d7568");
    const warm = new THREE.Color("#d98c5f");
    const deep = new THREE.Color("#10100c");

    // Liquid ocean sphere
    const oceanMat = new THREE.ShaderMaterial({
      vertexShader: oceanVertex,
      fragmentShader: oceanFragment,
      uniforms: {
        uTime: { value: 0 },
        uDeep: { value: deep },
        uGlow: { value: cream.clone().multiplyScalar(0.22) },
      },
      transparent: false,
    });
    const ocean = new THREE.Mesh(new THREE.SphereGeometry(0.992, 96, 96), oceanMat);
    yawGroup.add(ocean);

    // Subtle holographic halo
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: haloVertex,
      fragmentShader: haloFragment,
      uniforms: { uColor: { value: cream.clone().multiplyScalar(0.55) } },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.12, 64, 64), haloMat);
    halo.renderOrder = 0;
    ocean.renderOrder = 1;
    scene.add(halo);

    // Brazil marker: small glowing dot only — no pulsing rings
    const markerPos = ll2v(BRAZIL.lat, BRAZIL.lon, 1.005);
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 16, 16),
      new THREE.MeshBasicMaterial({ color: warm })
    );
    dot.position.copy(markerPos);
    dot.renderOrder = 2;
    yawGroup.add(dot);

    // Land dust particles, displaced by elevation
    let dustMat: THREE.ShaderMaterial | null = null;
    let dustGeo: THREE.BufferGeometry | null = null;
    Promise.all([loadImage("/globe/earth-water.png"), loadImage("/globe/earth-topology.png")])
      .then(([waterImg, topoImg]) => {
        if (disposed) return;
        const water = sampleImage(waterImg);
        const topo = sampleImage(topoImg);

        const candidates = 60000;
        const positions: number[] = [];
        const elevs: number[] = [];
        const phases: number[] = [];
        const golden = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < candidates; i++) {
          const y = 1 - (i / (candidates - 1)) * 2;
          const rad = Math.sqrt(1 - y * y);
          const theta = golden * i;
          const x = Math.cos(theta) * rad;
          const z = Math.sin(theta) * rad;

          const lat = (Math.asin(y) * 180) / Math.PI;
          const lon = (Math.atan2(-z, x) * 180) / Math.PI;
          const px = Math.min(MASK_W - 1, Math.floor(((lon + 180) / 360) * MASK_W));
          const py = Math.min(MASK_H - 1, Math.floor(((90 - lat) / 180) * MASK_H));
          const idx = (py * MASK_W + px) * 4;

          // water mask: land is black, ocean is white
          if (water[idx] > 100) continue;

          const elev = topo[idx] / 255;
          const jitter = (Math.random() - 0.5) * 0.07 * elev;
          const r = 1.012 + elev * 0.05 + jitter;
          positions.push(x * r, y * r, z * r);
          elevs.push(elev);
          phases.push(Math.random());
        }

        dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        dustGeo.setAttribute("aElev", new THREE.Float32BufferAttribute(elevs, 1));
        dustGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));

        dustMat = new THREE.ShaderMaterial({
          vertexShader: dustVertex,
          fragmentShader: dustFragment,
          uniforms: {
            uTime: { value: 0 },
            uPxRatio: { value: renderer.getPixelRatio() },
            uColorLow: { value: brass },
            uColorHigh: { value: cream },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const dust = new THREE.Points(dustGeo, dustMat);
        dust.renderOrder = 4;
        yawGroup.add(dust);
      })
      .catch(() => {});

    // Face Brazil and stay there: drag is clamped to a window around it
    const brazilYaw = -Math.atan2(markerPos.x, markerPos.z);
    const YAW_RANGE = 0.55;
    let targetYaw = brazilYaw;
    let targetPitch = 0.18;
    let yaw = targetYaw;
    let pitch = targetPitch;
    const clampYaw = (v: number) =>
      Math.max(brazilYaw - YAW_RANGE, Math.min(brazilYaw + YAW_RANGE, v));

    // Drag to rotate, with idle auto-rotation
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastInteract = 0;
    let lastMoveT = 0;
    let flickVx = 0;
    const el = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      targetYaw = clampYaw(targetYaw + dx * 0.005);
      targetPitch = Math.max(-0.35, Math.min(0.5, targetPitch + (e.clientY - lastY) * 0.003));
      flickVx = (dx * 0.005) / (Math.max(now - lastMoveT, 1) / 1000);
      lastMoveT = now;
      lastX = e.clientX;
      lastY = e.clientY;
      lastInteract = now;
    };
    const onPointerUp = () => {
      if (dragging) {
        // momentum: carry the flick velocity into the eased target
        targetYaw = clampYaw(targetYaw + Math.max(-1.2, Math.min(1.2, flickVx * 0.2)));
        flickVx = 0;
      }
      dragging = false;
      lastInteract = performance.now();
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Pause rendering while offscreen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (!dragging && performance.now() - lastInteract > 2500) {
        // gentle sway around Brazil instead of full rotation
        const home = brazilYaw + Math.sin(t * 0.25) * 0.1;
        targetYaw += (home - targetYaw) * 0.015;
        targetPitch += (0.18 - targetPitch) * 0.01;
      }
      const follow = dragging ? 0.35 : 0.06;
      yaw += (targetYaw - yaw) * follow;
      pitch += (targetPitch - pitch) * follow;
      yawGroup.rotation.y = yaw;
      pitchGroup.rotation.x = pitch;

      oceanMat.uniforms.uTime.value = t;
      if (dustMat) dustMat.uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      dustGeo?.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive holographic globe marking Brazil"
      className="relative h-full w-full"
    >
      <div className="pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted)">
        <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent-warm) pulse-dot" />
        Based in Brazil · GMT−3
      </div>
    </div>
  );
}
