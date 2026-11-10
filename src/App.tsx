import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "Instagram",
    label: "@Stephzz.Model",
    href: "https://www.instagram.com/Stephzz.Model",
  },
  {
    name: "Instagram links",
    label: "More links",
    href: "https://www.instagram.com/stephzz.model/links/",
  },
  {
    name: "Portfolio",
    label: "Visit portfolio",
    href: "http://stephenappiah.portfolio-page.com",
  },
  {
    name: "Models Direct",
    label: "Agency profile",
    href: "http://modelsdirect.com/profile/MNFD-8447",
  },
];

const navItems = [
  ["HOME", "home"],
  ["ABOUT", "about"],
  ["PORTFOLIO", "portfolio"],
  ["TALENTS", "talents"],
  ["PROFILE", "profile"],
  ["CONTACT", "contact"],
];

const categories = [
  "Commercial Modelling",
  "Catalogue Modelling",
  "Fashion & Editorial",
  "Runway & Catwalk",
  "Fitness Modelling",
  "Swimwear & Lingerie",
  "Fitting Model",
  "Television Commercials",
  "Film & TV Extra Work",
  "Promotional Work",
  "Social Media Influencer",
];

const galleryItems = [
  { category: "Fashion & Editorial", shape: "portrait" },
  { category: "Portrait Photography", shape: "landscape" },
  { category: "Contemporary & Streetwear", shape: "portrait" },
  { category: "Lifestyle & Creative", shape: "square" },
  { category: "Commercial Modelling", shape: "landscape" },
];

function PhotoPlaceholder({
  className = "",
  label = "PHOTO TO BE ADDED",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={`photo-placeholder ${className}`} aria-label={label} role="img">
      <span className="placeholder-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="placeholder-caption">{label}</span>
    </div>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryFilter, setGalleryFilter] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const visibleGallery =
    galleryFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);
  const galleryFilters = ["All", ...new Set(galleryItems.map((item) => item.category))];

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Stephzz.Model home">
          STEPHZZ<span>.</span>MODEL
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              className={activeSection === id ? "active" : ""}
              href={`#${id}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <PhotoPlaceholder className="hero-photo" label="HERO IMAGE — ADD PHOTO" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow hero-kicker">LONDON · GHANA · EVERYWHERE</p>
            <h1>
              Stephen
              <br />
              <em>Appiah S.A.</em>
            </h1>
            <p className="hero-brand">STEPHZZ.MODEL</p>
            <div className="hero-rule" />
            <p className="hero-roles">FASHION MODEL <i /> ACTOR <i /> SINGER <i /> CREATIVE ARTIST</p>
            <p className="hero-intro">
              More than a model. A storyteller through art, style and expression.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#portfolio">
                EXPLORE PORTFOLIO <Arrow />
              </a>
              <a className="text-link" href="#about">
                DISCOVER MY STORY <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-index"><span>01</span> / 08</div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-line" />
          </a>
          <div className="hero-vertical">A CREATIVE IN MOTION</div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-meta reveal">
            <span className="eyebrow">01 — THE PERSON</span>
            <span className="meta-line" />
            <span className="eyebrow">INTRODUCTION</span>
          </div>
          <div className="about-grid">
            <div className="about-image-wrap reveal">
              <PhotoPlaceholder className="about-photo" label="PORTRAIT — ADD PHOTO" />
              <span className="image-index">S.A. / 01</span>
            </div>
            <div className="about-copy reveal">
              <p className="eyebrow gold">A LIFE IN MANY FRAMES</p>
              <h2>Beyond<br />the <em>frame.</em></h2>
              <p className="lead">
                I’m Stephen Appiah S.A. — a Ghanaian-born model and multidisciplinary
                creative, building a life in London through image, sound and story.
              </p>
              <p>
                Professionally known as Stephzz.Model, I moved to London in 2021. With
                a background in Visual Arts, I see modelling as a universal language:
                movement, emotion and style can tell a story without saying a word.
              </p>
              <p>
                Each shoot is a chance to inhabit a new character and explore a
                different perspective. My interests span fashion, streetwear,
                editorial, music, acting, dance and filmmaking.
              </p>
              <p>
                I sing, write songs and play the trumpet, and I’m developing my path
                in film production and direction. Away from the arts, I work as a
                Manufacturing Supervisor — a role that keeps discipline, teamwork
                and adaptability at the centre of everything I do.
              </p>
              <p className="signature">Still learning. Still exploring. Always evolving.</p>
              <a className="text-link dark-link" href="#profile">MEET THE PERSON <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="portfolio section-pad" id="portfolio">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow gold">02 — SELECTED WORK</p>
              <h2>The art<br />of <em>presence.</em></h2>
            </div>
            <p className="section-aside">Every frame<br />tells a different story.</p>
          </div>
          <div className="gallery-toolbar reveal">
            <span className="eyebrow">PORTFOLIO / {String(visibleGallery.length).padStart(2, "0")}</span>
            <div className="gallery-filters" aria-label="Filter portfolio images">
              {galleryFilters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={galleryFilter === filter ? "selected" : ""}
                  onClick={() => setGalleryFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-grid">
            {visibleGallery.map((item, index) => (
              <article className={`gallery-item ${item.shape} reveal`} key={item.category}>
                <PhotoPlaceholder
                  className="gallery-photo"
                  label={`IMAGE ${String(index + 1).padStart(2, "0")} — ADD PHOTO`}
                />
                <div className="gallery-caption">
                  <span>{item.category}</span>
                  <span className="gallery-number">0{index + 1}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="gallery-note">A space for the stories still to be told.</p>
        </section>

        <section className="categories section-pad">
          <div className="category-intro reveal">
            <p className="eyebrow">03 — THE CRAFT</p>
            <h2>Versatility<br /><em>without limits.</em></h2>
            <p>Available for a range of creative briefs, formats and collaborations.</p>
          </div>
          <div className="category-list reveal">
            {categories.map((category, index) => (
              <div className="category-row" key={category}>
                <span className="category-index">0{index + 1}</span>
                <span>{category}</span>
                <Arrow diagonal />
              </div>
            ))}
          </div>
        </section>

        <section className="talents section-pad" id="talents">
          <div className="talents-heading reveal">
            <p className="eyebrow">04 — CREATIVE PRACTICE</p>
            <h2>More than<br /><em>one art form.</em></h2>
            <p>A curious mind, always looking for a new way to express an idea.</p>
          </div>
          <div className="talent-grid">
            <article className="talent-card reveal">
              <span className="talent-no">01</span>
              <div className="talent-symbol" aria-hidden="true">♪</div>
              <p className="eyebrow">SOUND & EXPRESSION</p>
              <h3>Music</h3>
              <ul><li>Singing</li><li>Songwriting</li><li>Trumpet</li></ul>
            </article>
            <article className="talent-card reveal">
              <span className="talent-no">02</span>
              <div className="talent-symbol" aria-hidden="true">✳</div>
              <p className="eyebrow">MOVEMENT & CHARACTER</p>
              <h3>Performance</h3>
              <ul><li>Acting</li><li>Dancing</li></ul>
            </article>
            <article className="talent-card reveal">
              <span className="talent-no">03</span>
              <div className="talent-symbol" aria-hidden="true">◌</div>
              <p className="eyebrow">A STORY IN MOTION</p>
              <h3>Film & visual<br />storytelling</h3>
              <ul><li>Film production</li><li>Film direction</li></ul>
            </article>
          </div>
        </section>

        <section className="profile section-pad" id="profile">
          <div className="profile-head reveal">
            <p className="eyebrow gold">05 — THE DETAILS</p>
            <h2>Model<br /><em>profile.</em></h2>
            <p>Essential information for casting, creative teams and collaborators.</p>
          </div>
          <div className="profile-table reveal">
            <div className="profile-group">
              <p className="eyebrow">ABOUT</p>
              <Fact label="Name" value="Stephen Appiah S.A." />
              <Fact label="Professional name" value="Stephzz.Model" />
              <Fact label="Date of birth" value="20 January 2003" />
              <Fact label="Age" value="23" />
              <Fact label="Nationality" value="Ghanaian" />
              <Fact label="Based in" value="London, United Kingdom" />
            </div>
            <div className="profile-group">
              <p className="eyebrow">MEASUREMENTS</p>
              <Fact label="Height" value="180 cm / 5′11″" />
              <Fact label="Weight" value="Approx. 60 kg" />
              <Fact label="Chest" value="34 in" />
              <Fact label="Waist" value="30 in" />
              <Fact label="Hips" value="32 in" />
              <Fact label="Shoe size" value="UK 6" />
            </div>
            <div className="profile-group profile-group-short">
              <p className="eyebrow">APPEARANCE</p>
              <Fact label="Hair" value="Black" />
              <Fact label="Eyes" value="Brown" />
            </div>
          </div>
        </section>

        <section className="experience section-pad">
          <div className="experience-title reveal">
            <p className="eyebrow">06 — EXPERIENCE & LEARNING</p>
            <h2>Grounded<br />in <em>curiosity.</em></h2>
          </div>
          <div className="experience-content reveal">
            <div className="experience-block">
              <span className="eyebrow gold">PROFESSIONAL EXPERIENCE</span>
              <h3>Manufacturing Supervisor</h3>
              <p>
                Professional experience beyond the creative industries, bringing
                leadership, discipline, adaptability and teamwork to every project.
              </p>
            </div>
            <div className="experience-block">
              <span className="eyebrow gold">EDUCATION & CERTIFICATIONS</span>
              <h3>Visual Arts Education</h3>
              <h3>Cabin Crew Certification</h3>
            </div>
          </div>
        </section>

        <section className="philosophy">
          <PhotoPlaceholder className="philosophy-photo" label="CAMPAIGN IMAGE — ADD PHOTO" />
          <div className="philosophy-shade" />
          <div className="philosophy-content reveal">
            <p className="eyebrow">A PERSONAL PHILOSOPHY</p>
            <h2>The courage<br />to create<br />your own <em>path.</em></h2>
            <blockquote>
              “Every individual holds the keys to doors they are destined to open.
              Sometimes, the greatest achievements come from having the confidence
              to take the first step and open those doors yourself.”
            </blockquote>
            <span className="eyebrow">STEPHEN APPIAH S.A.</span>
          </div>
          <span className="philosophy-vertical">KEEP BECOMING</span>
        </section>

        <section className="social section-pad">
          <div className="social-heading reveal">
            <p className="eyebrow gold">07 — ONLINE PRESENCE</p>
            <h2>Follow<br />the <em>journey.</em></h2>
          </div>
          <div className="social-content reveal">
            <p className="lead">Find me across the platforms and follow what comes next.</p>
            <div className="social-list">
              {socialLinks.map((link, index) => (
                <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
                  <span className="social-index">0{index + 1}</span>
                  <span className="social-name">{link.name}</span>
                  <span className="social-label">{link.label}</span>
                  <Arrow diagonal />
                </a>
              ))}
              <div className="social-unlinked">
                <span className="social-index">05</span>
                <span className="social-name">TikTok · Facebook · YouTube</span>
                <span className="social-label">Stephzz.Model</span>
                <span className="eyebrow">PROFILE LINKS NOT PROVIDED</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-top reveal">
            <p className="eyebrow">08 — GET IN TOUCH</p>
            <span className="contact-coordinate">LONDON, UK · AVAILABLE WORLDWIDE</span>
          </div>
          <div className="contact-main reveal">
            <h2>Let’s create<br />something <em>extraordinary.</em></h2>
            <p>
              Open to modelling opportunities, commercial collaborations, creative
              projects, acting opportunities, brand partnerships and artistic collaborations.
            </p>
            <a className="button button-gold" href="https://www.instagram.com/Stephzz.Model" target="_blank" rel="noreferrer">
              CONNECT ON INSTAGRAM <Arrow diagonal />
            </a>
          </div>
          <div className="contact-links reveal">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
                {link.name} <Arrow diagonal />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a className="wordmark footer-wordmark" href="#home">STEPHZZ<span>.</span>MODEL</a>
          <p>Stephen Appiah S.A.<br />Fashion Model · Actor · Singer · Songwriter · Creative Artist</p>
          <p className="footer-location">London, United Kingdom.</p>
          <p className="footer-quote">More than a model. A storyteller through art, style and expression.</p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} STEPHZZ.MODEL</span>
          <div>
            <a href="https://www.instagram.com/Stephzz.Model" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a href="https://www.instagram.com/stephzz.model/links/" target="_blank" rel="noreferrer">LINKS</a>
            <a href="#home">BACK TO TOP ↑</a>
          </div>
          <span>INDEPENDENTLY CREATIVE.</span>
        </div>
      </footer>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default App;
