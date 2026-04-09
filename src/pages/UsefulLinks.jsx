import { useEffect, useRef } from 'react'
import { useAdmin, useContent } from '../context/AdminContext'
import EditableText from '../components/EditableText'

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

export default function UsefulLinks() {
  const { usefulLinks, linksLoading } = useAdmin()

  return (
    <main className="ul-page">
      {/* Hero */}
      <section className="page-hero">
        <img src="/IMG_8148.jpg" alt="Medina Villas neighborhood" className="page-hero-img" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content fade-up">
          <p className="page-hero-eyebrow">Residents</p>
          <h1 className="page-hero-title">Useful Links</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="page-body">
        <div className="section-container">
          <RevealSection>
            <div className="ornament"><span>✦</span></div>
            <EditableText
              contentKey="links.intro"
              tag="p"
              className="ul-intro"
            />
          </RevealSection>

          {/* Link Categories */}
          {linksLoading ? (
            <div className="ul-loading">Loading…</div>
          ) : (
            <div className="ul-grid">
              {usefulLinks.map((cat, i) => (
                <RevealSection key={cat.id} delay={i * 80} className="ul-card-reveal">
                  <div className="ul-card">
                    <div className="ul-card__header">
                      <span className="ul-card__icon">{cat.icon}</span>
                      <div>
                        <h2 className="ul-card__title">{cat.title}</h2>
                        <p className="ul-card__subtitle">{cat.subtitle}</p>
                      </div>
                    </div>
                    <ul className="ul-card__links">
                      {cat.links.map(link => (
                        <li key={link.id} className="ul-card__link-item">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ul-card__link"
                          >
                            <span className="ul-card__link-label">{link.label}</span>
                            <svg className="ul-card__link-arrow" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          {link.description && (
                            <p className="ul-card__link-desc">{link.description}</p>
                          )}
                        </li>
                      ))}
                      {cat.links.length === 0 && (
                        <li className="ul-card__empty">No links added yet.</li>
                      )}
                    </ul>
                  </div>
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .ul-page { background: var(--beige-pale, #FAF6EF); min-height: 100vh; }

        .ul-intro {
          font-family: 'Jost', sans-serif;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.8;
          color: #4a3d5c;
          max-width: 680px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .ul-loading {
          text-align: center;
          font-family: 'Jost', sans-serif;
          color: #9b6fc7;
          padding: 60px 0;
          letter-spacing: 2px;
        }

        .ul-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
          margin-top: 12px;
        }

        .ul-card-reveal { height: 100%; }

        .ul-card {
          background: #fff;
          border: 1px solid rgba(155,111,199,0.15);
          border-radius: 4px;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .ul-card:hover {
          box-shadow: 0 8px 32px rgba(43,20,89,0.1);
          transform: translateY(-2px);
        }

        .ul-card__header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 24px 18px;
          border-bottom: 1px solid rgba(155,111,199,0.12);
          background: linear-gradient(135deg, rgba(43,20,89,0.03), transparent);
        }

        .ul-card__icon {
          font-size: 28px;
          line-height: 1;
          flex-shrink: 0;
        }

        .ul-card__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #2B1459;
          margin: 0 0 2px;
          line-height: 1.2;
        }

        .ul-card__subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #9b6fc7;
          margin: 0;
        }

        .ul-card__links {
          list-style: none;
          padding: 12px 0;
          margin: 0;
          flex: 1;
        }

        .ul-card__link-item {
          padding: 4px 24px 12px;
        }
        .ul-card__link-item + .ul-card__link-item {
          border-top: 1px solid rgba(155,111,199,0.08);
          padding-top: 12px;
        }

        .ul-card__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          text-decoration: none;
          color: #2B1459;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .ul-card__link:hover { color: #5B2D8E; }
        .ul-card__link:hover .ul-card__link-arrow { opacity: 1; transform: translateX(2px); }

        .ul-card__link-label { flex: 1; }

        .ul-card__link-arrow {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          opacity: 0.4;
          transition: opacity 0.2s, transform 0.2s;
        }

        .ul-card__link-desc {
          margin: 4px 0 0;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #7a6b8a;
          line-height: 1.5;
        }

        .ul-card__empty {
          padding: 16px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #b0a0c0;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .ul-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </main>
  )
}
