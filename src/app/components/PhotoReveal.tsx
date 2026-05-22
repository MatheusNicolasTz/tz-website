import Image from "next/image";

export default function PhotoReveal() {
  return (
    <div className="absolute top-25 right-30 hidden md:block" style={{ width: 820, height: 454 }}>
      <Image
        src="/tz/tzdev-.png"
        alt="Matheus Nicolas — TzDev"
        fill
        className="object-contain mix-blend-multiply"
        priority
      />
    </div>
  );
}
