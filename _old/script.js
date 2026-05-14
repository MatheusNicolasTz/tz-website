// Ano dinâmico no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animação ao scrollar
const revealTargets = document.querySelectorAll('.card, .project, .section-head, .about-grid, .contact-card, .hero-stats');
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// Efeito parallax sutil no glow do hero
const glow = document.querySelector('.bg-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    glow.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
  });
}
