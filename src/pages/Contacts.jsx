import { useEffect, useRef } from 'react'

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

const CATEGORIES = [
  {
    id: 'handyman',
    icon: '🔨',
    title: 'General Handyman',
    subtitle: 'Repairs, Maintenance & Odd Jobs',
    accent: '#5B2D8E',
    contacts: [
      { name: 'Robert Martinez', phone: '(214) 555-0142', note: 'Available weekends' },
      { name: 'James Wilson', phone: '(214) 555-0187', note: 'Full-service repairs' },
      { name: 'David Chen', phone: '(972) 555-0234', note: 'Licensed & insured' },
    ],
  },
  {
    id: 'plumber',
    icon: '🔧',
    title: 'Plumbing',
    subtitle: 'Pipes, Leaks & Water Systems',
    accent: '#2B1459',
    contacts: [
      { name: 'Carlos Rivera', phone: '(214) 555-0358', note: '24hr emergency service' },
      { name: 'Michael Thompson', phone: '(972) 555-0291', note: 'Residential specialist' },
    ],
  },
  {
    id: 'mechanic',
    icon: '🚗',
    title: 'Auto Mechanics',
    subtitle: 'Vehicle Repair & Maintenance',
    accent: '#9B6FC7',
    contacts: [
      { name: 'Tony Garcia', phone: '(214) 555-0476', note: 'All makes & models' },
      { name: 'Kevin Patel', phone: '(972) 555-0512', note: 'Mobile service available' },
      { name: 'Luis Hernandez', phone: '(214) 555-0638', note: 'Certified technician' },
    ],
  },
  {
    id: 'electrical',
    icon: '⚡',
    title: 'Electrical',
    subtitle: 'Wiring, Panels & Fixtures',
    accent: '#2B1459',
    contacts: [
      { name: 'Eric Johnson', phone: '(214) 555-0723', note: 'Master electrician' },
      { name: 'Samuel Brown', phone: '(972) 555-0849', note: 'Licensed & bonded' },
    ],
  },
  {
    id: 'landscaping',
    icon: '🌿',
    title: 'Landscaping',
    subtitle: 'Lawn Care & Garden Services',
    accent: '#5B2D8E',
    contacts: [
      { name: 'Marco Delgado', phone: '(214) 555-0917', note: 'Weekly maintenance' },
      { name: 'Andre Williams', phone: '(972) 555-0153', note: 'Design & installation' },
      { name: 'Rosa Flores', phone: '(214) 555-0284', note: 'Irrigation specialist' },
    ],
  },
  {
    id: 'painting',
    icon: '🎨',
    title: 'Painting',
    subtitle: 'Interior & Exterior',
    accent: '#9B6FC7',
    contacts: [
      { name: 'Frank Nguyen', phone: '(214) 555-0391', note: 'Residential expert' },
      { name: 'Isaiah Scott', phone: '(972) 555-0467', note: 'Eco-friendly paints' },
    ],
  },
]

function ContactCard({ contact, delay }) {
  return (
    <RevealSection delay={delay} className="contact-card">
      <div className="contact-card__name">{contact.name}</div>
      <a href={`tel:${contact.phone}`} className="contact-card__phone">
        {contact.phone}
      </a>
      {contact.note && (
        <span className="contact-card__note">{contact.note}</span>
      )}
    </RevealSection>
  )
}

export default function Contacts() {
  return (
    <main className="contacts">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/IMG_8169.jpg"
          alt="Medina Villas tiles"
          className="page-hero-img"
          style={{ objectPosition: 'center', opacity: 0.4 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(43,20,89,0.9) 0%, rgba(10,5,30,0.5) 100%)'
        }} />
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Services Directory</p>
          <h1 className="page-hero-title">Handyman Contacts</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="contacts__intro">
        <div className="section-container">
          <RevealSection>
            <div className="ornament"><span>✦</span></div>
            <p className="contacts__intro-text">
              Below is a curated list of trusted service providers recommended by Medina Villas residents. Please note these are community recommendations — always verify credentials and get multiple quotes before hiring.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="contacts__body">
        <div className="section-container">
          {CATEGORIES.map((cat, ci) => (
            <RevealSection key={cat.id} delay={ci * 60} className="contacts__category">
              <div className="contacts__category-header" style={{ '--cat-accent': cat.accent }}>
                <span className="contacts__category-icon">{cat.icon}</span>
                <div>
                  <h2 className="contacts__category-title">{cat.title}</h2>
                  <p className="contacts__category-sub">{cat.subtitle}</p>
                </div>
                <div className="contacts__category-line" />
              </div>
              <div className="contacts__cards">
                {cat.contacts.map((contact, i) => (
                  <ContactCard key={contact.name} contact={contact} delay={i * 70} />
                ))}
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <RevealSection>
        <div className="contacts__disclaimer">
          <div className="section-container">
            <div className="ornament"><span>✦</span></div>
            <p className="contacts__disclaimer-text">
              The Medina Villas HOA does not formally endorse or warranty the work of any listed service provider. These contacts are provided as a courtesy to residents. Always obtain proper permits and verify licensing independently.
            </p>
            <p className="contacts__disclaimer-cta">
              Know a great service provider? <a href="/contact">Suggest an addition →</a>
            </p>
          </div>
        </div>
      </RevealSection>

      <style>{`
        .contacts { flex: 1; }

        .contacts__intro {
          padding: 72px 0 56px;
          background: var(--beige-pale);
          text-align: center;
        }
        .contacts__intro-text {
          max-width: 680px;
          margin: 0 auto;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 300;
          font-style: italic;
          line-height: 1.8;
          color: #3a3347;
        }

        .contacts__body {
          padding: 80px 0 100px;
          background: var(--white);
        }

        .contacts__category {
          margin-bottom: 80px;
        }
        .contacts__category:last-child { margin-bottom: 0; }

        .contacts__category-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--beige-mid);
        }
        .contacts__category-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          background: var(--beige-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contacts__category-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 400;
          color: var(--purple-deep);
          line-height: 1;
          margin-bottom: 4px;
        }
        .contacts__category-sub {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--purple-light);
        }
        .contacts__category-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--purple-pale), transparent);
        }

        .contacts__cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .contact-card {
          background: var(--beige-pale);
          border: 1px solid var(--beige-mid);
          border-radius: 4px;
          padding: 28px 32px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          cursor: default;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(43, 20, 89, 0.1);
          border-color: var(--purple-pale);
        }
        .contact-card__name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          color: var(--purple-deep);
          margin-bottom: 10px;
        }
        .contact-card__phone {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 18px;
          font-weight: 300;
          color: var(--purple-mid);
          margin-bottom: 10px;
          transition: color 0.2s;
          text-decoration: none;
        }
        .contact-card__phone:hover { color: var(--purple-deep); }
        .contact-card__note {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--beige-dark);
          background: var(--beige-mid);
          padding: 4px 10px;
          border-radius: 2px;
        }

        .contacts__disclaimer {
          background: var(--purple-deep);
          padding: 72px 0;
          text-align: center;
        }
        .contacts__disclaimer .ornament::before,
        .contacts__disclaimer .ornament::after {
          background: linear-gradient(90deg, transparent, rgba(155,111,199,0.4), transparent);
        }
        .contacts__disclaimer .ornament span { color: var(--purple-pale); }
        .contacts__disclaimer-text {
          max-width: 620px;
          margin: 0 auto 16px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          line-height: 1.8;
          color: rgba(254,252,248,0.65);
        }
        .contacts__disclaimer-cta {
          font-size: 13px;
          font-weight: 300;
          color: rgba(254,252,248,0.5);
        }
        .contacts__disclaimer-cta a {
          color: var(--purple-pale);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contacts__disclaimer-cta a:hover { color: var(--white); }

        @media (max-width: 768px) {
          .contacts__body { padding: 56px 0 72px; }
          .contacts__cards { grid-template-columns: 1fr; }
          .contacts__category-header { flex-wrap: wrap; }
          .contacts__category-line { display: none; }
        }
      `}</style>
    </main>
  )
}
