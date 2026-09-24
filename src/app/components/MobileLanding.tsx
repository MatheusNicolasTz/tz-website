import Image from "next/image";
import { designProjects as projects, profile } from "./portfolio-data";
import { thumbs } from "./thumbs";
import "./mobile-landing.css";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function MobileLanding() {
  return (
    <main className="mobile-landing">
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#mobile-top" className="mobile-mark" aria-label="Matthew, home">m<span>✳</span></a>
        <a href="#mobile-contact" className="mobile-nav-contact">Let&apos;s talk <Arrow /></a>
      </nav>

      <section className="mobile-hero" id="mobile-top">
        <div className="mobile-availability"><i /> Available for work</div>
        <h1>
          I&apos;m Matthew.<br />
          <em>I make things.</em>
        </h1>
        <p>
          {profile.intro}
        </p>
        <div className="mobile-hero-actions">
          <a href="#mobile-work" className="mobile-button mobile-button--dark">See my work <Arrow /></a>
          <a href="#mobile-about" className="mobile-button mobile-button--light">About me</a>
        </div>
        <div className="mobile-hero-note">
          <span>Based in Brazil</span>
          <span>Working worldwide</span>
        </div>
      </section>

      <section className="mobile-proof" aria-label="Career highlights">
        <div><strong>{profile.youtubeViews}</strong><span>YouTube views</span></div>
        <div><strong>{profile.creators}</strong><span>Creators</span></div>
        <div><strong>{profile.adventureUsers}</strong><span>Adventure AI users</span></div>
      </section>

      <section className="mobile-section mobile-about" id="mobile-about">
        <div className="mobile-section-label"><span>01</span><span>About</span></div>
        <h2>Design instinct.<br /><em>Builder mindset.</em></h2>
        <div className="mobile-about-copy">
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mobile-tags" aria-label="Skills">
          {profile.skills.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      <section className="mobile-section mobile-thumbnails" id="mobile-thumbnails">
        <div className="mobile-section-label"><span>02</span><span>Thumbnails</span></div>
        <h2>Made to stop<br /><em>the scroll.</em></h2>
        <p className="mobile-thumbnails-intro">
          Thumbnail design for creators who care about attention, story and the click.
        </p>
        <div className="mobile-thumbnail-grid">
          {thumbs.slice(0, 7).map((thumbnail, index) => (
            <div className="mobile-thumbnail" key={thumbnail}>
              <Image
                src={`/thumbnails/${thumbnail}`}
                alt={`YouTube thumbnail designed by Matthew ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 40px), 1px"
              />
            </div>
          ))}
        </div>
        <div className="mobile-thumbnail-result">
          <strong>{profile.youtubeViews}</strong>
          <span>views generated for creators worldwide</span>
        </div>
      </section>

      <section className="mobile-section mobile-work" id="mobile-work">
        <div className="mobile-section-label"><span>03</span><span>Selected work</span></div>
        <h2>Things I&apos;ve<br /><em>brought to life.</em></h2>
        <div className="mobile-projects">
          {projects.map((project, index) => (
            <a key={project.name} href={project.url} target="_blank" rel="noreferrer noopener" className="mobile-project">
              <div className="mobile-project-image">
                {project.image && <Image src={`/projects/${project.image}.webp`} alt={`${project.name} project preview`} fill sizes="(max-width: 767px) 92vw, 1px" />}
                <span>0{index + 1}</span>
              </div>
              <div className="mobile-project-info">
                <div><h3>{project.name}</h3><p>{project.type}</p></div>
                <Arrow />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mobile-newsletter" aria-labelledby="mobile-newsletter-title">
        <div className="mobile-newsletter-topline">
          <span>04 · Newsletter</span>
          <span className="mobile-soon-badge">Soon</span>
        </div>
        <p className="mobile-newsletter-kicker">Notes from the process</p>
        <h2 id="mobile-newsletter-title">Ideas, experiments<br />and things <em>I&apos;m building.</em></h2>
        <p className="mobile-newsletter-copy">
          A quiet email about design, development, AI and building products from scratch.
        </p>
        <div className="mobile-newsletter-preview" aria-label="Newsletter coming soon">
          <span>Your email</span>
          <strong>Soon</strong>
        </div>
      </section>

      <section className="mobile-contact" id="mobile-contact">
        <div className="mobile-section-label"><span>05</span><span>Contact</span></div>
        <p className="mobile-contact-kicker">Have an idea?</p>
        <h2>Let&apos;s make it<br /><em>real.</em></h2>
        <p className="mobile-contact-copy">Tell me what you&apos;re building. My inbox is open for projects, partnerships and good ideas.</p>
        <a className="mobile-contact-email" href="mailto:contact@tzstrategist.com">
          <span>contact@tzstrategist.com</span><Arrow />
        </a>
        <div className="mobile-socials">
          <a href="https://wa.me/5535991147978" target="_blank" rel="noreferrer noopener">WhatsApp</a>
          <a href="https://www.instagram.com/tzdev.ai/" target="_blank" rel="noreferrer noopener">Instagram</a>
          <a href="https://x.com/TzDev_" target="_blank" rel="noreferrer noopener">X / Twitter</a>
        </div>
      </section>

      <footer className="mobile-footer">
        <span>© {new Date().getFullYear()} Matthew</span>
        <a href="#mobile-top">Back to top ↑</a>
      </footer>
    </main>
  );
}
