import { useEffect, useRef } from 'react'
import { useContent } from '../context/AdminContext'
import EditableText from '../components/EditableText'

const GALLERY = [
  { src: '/IMG_8148.jpg', label: 'Neighborhood Entrance' },
  { src: '/IMG_8160.jpg', label: 'The Street' },
  { src: '/IMG_8165.jpg', label: 'Golden Hour' },
  { src: '/IMG_8169.jpg', label: 'Our Tiles' },
  { src: '/IMG_8174.jpg', label: 'Courtyard Walk' },
  { src: '/IMG_8176.jpg', label: 'Evening View' },
  { src: '/IMG_8179.jpg', label: 'Homes' },
  { src: '/IMG_8183.jpg', label: 'Sunrise' },
]

const STATS = [
  { value: '120+', label: 'Homes' },
  { value: '1998', label: 'Established' },
  { value: '24/7', label: 'Community Support' },
  { value: '4', label: 'Annual Events' },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function RotatedPhoto({ src, label, style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px', ...style }}>
      <img
        src={src}
        alt={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

export default function Home() {

  return (
    <main className="home">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="home__hero">
        <div className="home__hero-bg">
          <img
            src="/IMG_8148.jpg"
            alt="Medina Villas sign"
            className="home__hero-img"
            fetchpriority="high"
            style={{ objectPosition: 'center' }}
          />
          <div className="home__hero-overlay" />
        </div>
        <div className="home__hero-content">
          <p className="home__hero-eyebrow fade-up" style={{ animationDelay: '0.2s' }}>
            Welcome to
          </p>
          <h1 className="home__hero-title fade-up" style={{ animationDelay: '0.45s' }}>
            Medina Villas
          </h1>
          <p className="home__hero-sub fade-up" style={{ animationDelay: '0.7s' }}>
            Homeowners Association
          </p>
          <div className="home__hero-divider fade-up" style={{ animationDelay: '0.9s' }} />
          <EditableText contentKey="home.heroDesc" tag="p" className="home__hero-desc fade-up" style={{ animationDelay: '1.05s' }} />
        </div>
        <div className="home__hero-scroll">
          <span>Scroll</span>
          <div className="home__hero-scroll-line" />
        </div>
      </section>

      {/* ── WELCOME ───────────────────────────────── */}
      <section className="home__welcome">
        <div className="section-container">
          <div className="home__welcome-grid">
            <RevealSection className="home__welcome-text">
              <p className="home__welcome-eyebrow">Our Community</p>
              <EditableText contentKey="home.welcomeHeading" tag="h2" className="home__welcome-heading" multiline={false} />
              <EditableText contentKey="home.welcomeBody1" tag="p" className="home__welcome-body" />
              <EditableText contentKey="home.welcomeBody2" tag="p" className="home__welcome-body" style={{ marginTop: 16 }} />
            </RevealSection>

            <RevealSection delay={150} className="home__welcome-photo">
              <RotatedPhoto
                src="/IMG_8174.jpg"
                label="Courtyard"
                style={{ width: '100%', height: '440px' }}
              />
              <div className="home__welcome-photo-accent" />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────── */}
      <section className="home__gallery">
        <div className="section-container">
          <RevealSection>
            <div className="ornament"><span>✦</span></div>
            <h2 className="home__gallery-heading">A Glimpse of Home</h2>
            <p className="home__gallery-sub">
              Beauty in every corner of Medina Villas
            </p>
          </RevealSection>

          <div className="home__gallery-grid">
            {GALLERY.map((photo, i) => (
              <RevealSection key={photo.src} delay={i * 60} className="home__gallery-item">
                <RotatedPhoto
                  src={photo.src}
                  label={photo.label}
                  style={{ width: '100%', height: '260px' }}
                />
                <p className="home__gallery-label">{photo.label}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>


      <style>{`
        .home { flex: 1; }

        /* HERO */
        .home__hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .home__hero-bg {
          position: absolute;
          inset: 0;
          background: var(--purple-deep);
        }
        .home__hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
          transform-origin: center center;
        }
        .home__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 5, 30, 0.92) 0%,
            rgba(43, 20, 89, 0.5) 40%,
            rgba(43, 20, 89, 0.2) 100%
          );
        }
        .home__hero-content {
          position: relative;
          z-index: 2;
          padding: 0 80px 100px;
          max-width: 900px;
        }
        .home__hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--purple-pale);
          margin-bottom: 16px;
        }
        .home__hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 10vw, 130px);
          font-weight: 300;
          color: var(--white);
          line-height: 0.95;
          margin-bottom: 8px;
        }
        .home__hero-sub {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(254,252,248,0.5);
          margin-bottom: 32px;
        }
        .home__hero-divider {
          width: 60px;
          height: 1px;
          background: var(--purple-light);
          margin-bottom: 24px;
        }
        .home__hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          font-style: italic;
          color: rgba(254,252,248,0.75);
          line-height: 1.55;
        }
        .home__hero-scroll {
          position: absolute;
          bottom: 40px;
          right: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 2;
        }
        .home__hero-scroll span {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(254,252,248,0.4);
          writing-mode: vertical-rl;
        }
        .home__hero-scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(155,111,199,0.6), transparent);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.6); opacity: 1; }
        }

        /* WELCOME */
        .home__welcome {
          padding: 120px 0;
          background: var(--beige-pale);
        }
        .home__welcome-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .home__welcome-eyebrow {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--purple-mid);
          margin-bottom: 20px;
        }
        .home__welcome-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 400;
          color: var(--purple-deep);
          line-height: 1.15;
          margin-bottom: 28px;
        }
        .home__welcome-heading em { font-style: italic; color: var(--purple-mid); }
        .home__welcome-body {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: #3a3347;
        }
        .home__welcome-photo { position: relative; }
        .home__welcome-photo-accent {
          position: absolute;
          bottom: -16px;
          right: -16px;
          width: 80%;
          height: 80%;
          border: 1px solid var(--purple-pale);
          border-radius: 2px;
          z-index: -1;
        }

        /* STATS */
        .home__stats {
          background: var(--purple-deep);
          padding: 72px 0;
        }
        .home__stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(155,111,199,0.15);
        }
        .home__stat {
          padding: 40px 24px;
          text-align: center;
          background: var(--purple-deep);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .home__stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          color: var(--white);
          line-height: 1;
        }
        .home__stat-label {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--purple-pale);
          opacity: 0.7;
        }

        /* GALLERY */
        .home__gallery {
          padding: 120px 0;
          background: var(--white);
        }
        .home__gallery-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 8px;
          text-align: center;
        }
        .home__gallery-sub {
          text-align: center;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 2px;
          color: var(--purple-light);
          text-transform: uppercase;
          margin-bottom: 64px;
        }
        .home__gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .home__gallery-item { cursor: default; }
        .home__gallery-item:hover img { opacity: 0.9; }
        .home__gallery-label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--purple-light);
          margin-top: 10px;
          text-align: center;
        }

        /* COMMUNITY */
        .home__community {
          position: relative;
          padding: 140px 0;
          overflow: hidden;
        }
        .home__community-bg {
          position: absolute;
          inset: 0;
          background: var(--black-soft);
        }
        .home__community-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          transform-origin: center;
        }
        .home__community-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(43,20,89,0.85) 0%, rgba(10,5,30,0.7) 100%);
        }
        .home__community-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }
        .home__community-eyebrow {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--purple-pale);
          margin-bottom: 20px;
        }
        .home__community-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 28px;
        }
        .home__community-heading em { font-style: italic; color: var(--purple-pale); }
        .home__community-body {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(254,252,248,0.7);
          max-width: 560px;
        }

        @media (max-width: 1024px) {
          .home__gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .home__stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .home__hero-content { padding: 0 24px 80px; }
          .home__hero-scroll { display: none; }
          .home__welcome { padding: 72px 0; }
          .home__welcome-grid { grid-template-columns: 1fr; gap: 40px; }
          .home__gallery { padding: 72px 0; }
          .home__gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .home__community { padding: 90px 0; }
          .home__stat-value { font-size: 40px; }
        }
      `}</style>
    </main>
  )
}
