import { useEffect, useRef, useState } from 'react'
import { useContent } from '../context/AdminContext'
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


const CC_RS_DOCS = [
  { label: 'CC&Rs Document', file: '/medina-villas-ccrs.pdf' },
  { label: 'First Amendment', file: '/ccrs-first-amendment.pdf' },
  { label: 'Second Amendment', file: '/ccrs-second-amendment.pdf' },
]

const BYLAWS_DOCS = [
  { label: 'Bylaws Document', file: '/medina-villas-bylaws.pdf' },
]

const GEOTECH_DOCS = [
  { label: 'Geo-Tech Report', file: '/medina-geotech-report.pdf' },
]

function DocViewer({ eyebrow, heading, docs }) {
  const [active, setActive] = useState(0)
  return (
    <RevealSection>
      <section className="bylaws__pdf">
        <div className="section-container">
          <div className="ornament"><span>✦</span></div>
          <p className="bylaws__pdf-eyebrow">{eyebrow}</p>
          <h2 className="bylaws__pdf-heading">{heading}</h2>
          {docs.length > 1 && (
            <div className="bylaws__pdf-tabs">
              {docs.map((doc, i) => (
                <button
                  key={i}
                  className={`bylaws__pdf-tab${active === i ? ' bylaws__pdf-tab--active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {doc.label}
                </button>
              ))}
            </div>
          )}
          <div className="bylaws__pdf-frame-wrap">
            <iframe
              key={docs[active].file}
              src={docs[active].file}
              className="bylaws__pdf-frame"
              title={docs[active].label}
            />
          </div>
          <a
            href={docs[active].file}
            download
            className="bylaws__pdf-download"
          >
            Download {docs[active].label}
          </a>
        </div>
      </section>
    </RevealSection>
  )
}

export default function Bylaws() {
  return (
    <main className="bylaws">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/IMG_8160.jpg"
          alt="Community"
          className="page-hero-img"
          fetchpriority="high"
          style={{ objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(43,20,89,0.9) 0%, rgba(10,5,30,0.55) 100%)'
        }} />
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Governing Documents</p>
          <h1 className="page-hero-title">Community Bylaws</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="bylaws__intro">
        <div className="section-container">
          <RevealSection>
            <div className="ornament"><span>✦</span></div>
            <EditableText contentKey="bylaws.intro" tag="p" className="bylaws__intro-text" />
          </RevealSection>
        </div>
      </section>

      {/* PULLQUOTE */}
      <RevealSection>
        <div className="bylaws__pullquote">
          <div className="bylaws__pullquote-inner section-container">
            <EditableText contentKey="bylaws.pullquote" tag="p" className="bylaws__pullquote-text" />
            <p className="bylaws__pullquote-attr">— Medina Villas HOA Board of Directors</p>
          </div>
        </div>
      </RevealSection>

      {/* CC&Rs PDF VIEWER */}
      <DocViewer
        eyebrow="CC&Rs"
        heading="Covenants, Conditions & Restrictions"
        docs={CC_RS_DOCS}
      />

      {/* BYLAWS PDF VIEWER */}
      <DocViewer
        eyebrow="Bylaws"
        heading="Community Bylaws"
        docs={BYLAWS_DOCS}
      />

      {/* GEO-TECH REPORT */}
      <DocViewer
        eyebrow="Reports"
        heading="Geo-Technical Report"
        docs={GEOTECH_DOCS}
      />

      {/* FOOTER CTA */}
      <RevealSection>
        <div className="bylaws__cta">
          <div className="section-container">
            <div className="ornament"><span>✦</span></div>
            <p className="bylaws__cta-text">
              Questions about the bylaws or need clarification on a specific article?
            </p>
            <a href="/contact" className="bylaws__cta-btn">Contact the HOA Board</a>
          </div>
        </div>
      </RevealSection>

      <style>{`
        .bylaws { flex: 1; }

        .bylaws__intro {
          padding: 80px 0 60px;
          background: var(--beige-pale);
          text-align: center;
        }
        .bylaws__intro-text {
          max-width: 720px;
          margin: 0 auto;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 300;
          font-style: italic;
          line-height: 1.8;
          color: #3a3347;
        }

        .bylaws__pullquote {
          background: var(--purple-deep);
          padding: 80px 0;
        }
        .bylaws__pullquote-inner {
          text-align: center;
        }
        .bylaws__pullquote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 300;
          font-style: italic;
          color: var(--white);
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 20px;
        }
        .bylaws__pullquote-attr {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--purple-pale);
          opacity: 0.7;
        }


        .bylaws__cta {
          background: var(--beige-light);
          padding: 80px 0;
          text-align: center;
        }
        .bylaws__cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-style: italic;
          color: var(--purple-deep);
          margin-bottom: 32px;
        }
        .bylaws__cta-btn {
          display: inline-block;
          padding: 14px 40px;
          background: var(--purple-deep);
          color: var(--white);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          border-radius: 1px;
          transition: background 0.2s, transform 0.2s;
        }
        .bylaws__cta-btn:hover {
          background: var(--purple-mid);
          transform: translateY(-2px);
        }

        /* PDF Viewer */
        .bylaws__pdf {
          padding: 80px 0;
          background: var(--beige-pale);
          text-align: center;
        }
        .bylaws__pdf-eyebrow {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--purple-light);
          margin-bottom: 12px;
        }
        .bylaws__pdf-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 36px;
          line-height: 1.1;
        }
        .bylaws__pdf-tabs {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-bottom: 24px;
        }
        .bylaws__pdf-tab {
          padding: 10px 32px;
          background: transparent;
          border: 1px solid var(--purple-light);
          color: var(--purple-deep);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .bylaws__pdf-tab:first-child { border-radius: 1px 0 0 1px; }
        .bylaws__pdf-tab:not(:first-child) { border-left: none; }
        .bylaws__pdf-tab:last-child  { border-radius: 0 1px 1px 0; }
        .bylaws__pdf-tab--active {
          background: var(--purple-deep);
          color: var(--white);
          border-color: var(--purple-deep);
        }
        .bylaws__pdf-tab:not(.bylaws__pdf-tab--active):hover {
          background: var(--beige-mid);
        }
        .bylaws__pdf-frame-wrap {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          border: 1px solid var(--beige-mid);
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(43,20,89,0.10);
        }
        .bylaws__pdf-frame {
          width: 100%;
          height: 700px;
          border: none;
          display: block;
        }
        .bylaws__pdf-download {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 32px;
          border: 1px solid var(--purple-deep);
          color: var(--purple-deep);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          border-radius: 1px;
          transition: background 0.2s, color 0.2s;
        }
        .bylaws__pdf-download:hover {
          background: var(--purple-deep);
          color: var(--white);
        }

        @media (max-width: 900px) {
          .bylaws__pdf-frame {
            height: 500px;
          }
        }
      `}</style>
    </main>
  )
}
