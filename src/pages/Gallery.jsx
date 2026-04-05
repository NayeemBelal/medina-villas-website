import { useEffect, useRef } from 'react'
import { useAdmin } from '../context/AdminContext'

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

export default function Gallery() {
  const { gallery, galleryLoading } = useAdmin()

  return (
    <main className="gallery-page">
      {/* HERO */}
      <section className="page-hero">
        <img src="/IMG_8179.jpg" alt="Homes" className="page-hero-img" style={{ objectPosition: 'center' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(43,20,89,0.9) 0%, rgba(10,5,30,0.5) 100%)'
        }} />
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Community Photos</p>
          <h1 className="page-hero-title">Neighborhood Gallery</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="gallery-page__body">
        <div className="section-container">
          <RevealSection>
            <div className="ornament"><span>✦</span></div>
            <p className="gallery-page__intro">
              A living collection of photos shared by Medina Villas residents — capturing the beauty, character, and community spirit of our neighborhood.
            </p>
          </RevealSection>

          {galleryLoading ? (
            <RevealSection>
              <div className="gallery-page__empty">
                <p className="gallery-page__empty-sub">Loading gallery…</p>
              </div>
            </RevealSection>
          ) : gallery.length === 0 ? (
            <RevealSection>
              <div className="gallery-page__empty">
                <p className="gallery-page__empty-title">No photos yet</p>
                <p className="gallery-page__empty-sub">
                  Residents can submit neighborhood photos through the HOA admin portal.
                </p>
              </div>
            </RevealSection>
          ) : (
            <div className="gallery-page__grid">
              {gallery.map((photo, i) => (
                <RevealSection key={photo.id} delay={i * 50} className="gallery-page__item">
                  <div className="gallery-page__photo">
                    <img src={photo.url} alt={photo.caption || 'Neighborhood photo'} />
                  </div>
                  {photo.caption && (
                    <p className="gallery-page__caption">{photo.caption}</p>
                  )}
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .gallery-page { flex: 1; }

        .gallery-page__body {
          padding: 80px 0 100px;
          background: var(--white);
        }

        .gallery-page__intro {
          max-width: 640px;
          margin: 0 auto 64px;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 300;
          font-style: italic;
          line-height: 1.8;
          color: #3a3347;
        }

        .gallery-page__empty {
          text-align: center;
          padding: 80px 0;
          border: 1px dashed var(--beige-mid);
          border-radius: 4px;
          background: var(--beige-pale);
        }
        .gallery-page__empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 10px;
        }
        .gallery-page__empty-sub {
          font-size: 14px;
          font-weight: 300;
          color: var(--purple-light);
        }

        .gallery-page__grid {
          columns: 3;
          gap: 16px;
        }
        .gallery-page__item {
          break-inside: avoid;
          margin-bottom: 16px;
        }
        .gallery-page__photo {
          overflow: hidden;
          border-radius: 3px;
          background: var(--beige-light);
        }
        .gallery-page__photo img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.4s ease;
        }
        .gallery-page__item:hover .gallery-page__photo img {
          transform: scale(1.03);
        }
        .gallery-page__caption {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--purple-light);
          margin-top: 8px;
          padding: 0 2px;
        }

        @media (max-width: 900px) {
          .gallery-page__grid { columns: 2; }
        }
        @media (max-width: 600px) {
          .gallery-page__grid { columns: 1; }
          .gallery-page__body { padding: 56px 0 72px; }
        }
      `}</style>
    </main>
  )
}
