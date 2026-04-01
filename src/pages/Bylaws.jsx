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

const BYLAWS_SECTIONS = [
  {
    number: 'I',
    title: 'Name & Purpose',
    content: [
      'The organization shall be known as the Medina Villas Homeowners Association (hereinafter "the Association").',
      'The purpose of the Association is to promote the health, safety, welfare, and general well-being of the residents of Medina Villas, to manage and maintain the common areas, and to enforce the covenants and restrictions applicable to the neighborhood.',
      'The Association shall operate exclusively for the benefit of its members and the community as a whole, fostering a spirit of cooperation, mutual respect, and civic pride among all residents.',
    ],
  },
  {
    number: 'II',
    title: 'Membership',
    content: [
      'Membership in the Association is automatic and mandatory for all property owners within the Medina Villas subdivision. Membership commences upon the recording of a deed conveying ownership of a lot within the subdivision.',
      'Each property owner shall be entitled to one (1) vote per lot owned on matters put before the Association membership, regardless of the number of individuals holding title to the property.',
      'Members in good standing — defined as those current in their dues obligations and not subject to disciplinary action — shall be eligible to vote, serve on committees, and hold elected office within the Association.',
    ],
  },
  {
    number: 'III',
    title: 'Annual Assessments & Dues',
    content: [
      'Annual assessments shall be levied against each lot within the subdivision to fund the operating expenses and capital reserve of the Association. The amount of the annual assessment shall be determined by the Board of Directors and communicated to all members no less than thirty (30) days prior to the due date.',
      'Annual dues are payable on January 1st of each calendar year. Assessments not paid within thirty (30) days of the due date shall be considered delinquent and subject to a late fee as established by the Board.',
      'The Association shall have the authority to place a lien upon any property for which assessments remain unpaid in excess of ninety (90) days, in accordance with applicable state law.',
    ],
  },
  {
    number: 'IV',
    title: 'Board of Directors',
    content: [
      'The Association shall be governed by a Board of Directors consisting of five (5) elected members. Directors shall serve staggered two-year terms to ensure continuity of governance.',
      'The Board shall meet not less than six (6) times per calendar year. Special meetings of the Board may be called by the President or by a majority of Directors upon five (5) days written notice.',
      'The Board of Directors shall have the power to adopt, amend, and enforce rules and regulations governing the use of common areas and the conduct of residents, provided such rules are not inconsistent with these Bylaws.',
    ],
  },
  {
    number: 'V',
    title: 'Annual Meetings',
    content: [
      'The Annual Meeting of the Association shall be held each year, the date, time, and location to be determined by the Board of Directors. Notice of the Annual Meeting shall be provided to all members not less than fourteen (14) days in advance.',
      'A quorum for the transaction of business at any membership meeting shall consist of members representing twenty percent (20%) of the total voting power of the Association, present in person or by proxy.',
      'The agenda for the Annual Meeting shall include, at minimum: a report from the President, a financial summary, election of directors (in applicable years), and an open forum for member questions and concerns.',
    ],
  },
  {
    number: 'VI',
    title: 'Property Standards',
    content: [
      'All property owners are responsible for maintaining their lots and structures in good condition and in compliance with the architectural standards established by the Association. Lawns shall be kept neat, trimmed, and free of weeds.',
      'No exterior alterations, additions, or improvements — including but not limited to fencing, painting, landscaping modifications, or structural changes — shall be undertaken without prior written approval from the Architectural Review Committee.',
      'Vehicles shall be parked in designated areas only. Inoperable, unlicensed, or commercial vehicles shall not be stored on residential lots or streets for extended periods. Recreational vehicles may be stored only in enclosed garages.',
    ],
  },
  {
    number: 'VII',
    title: 'Enforcement & Dispute Resolution',
    content: [
      'The Board of Directors shall have the authority to enforce these Bylaws and all applicable covenants, conditions, and restrictions. Upon identifying a violation, the Association shall provide written notice to the responsible party specifying the nature of the violation and a reasonable cure period.',
      'Any member who believes they have been aggrieved by a decision of the Board or the Association shall have the right to request a hearing before the Board. Such request must be submitted in writing within thirty (30) days of the contested decision.',
      'The Association encourages all disputes between neighbors to be resolved through good-faith communication and, where necessary, mediation. Legal action shall be considered only as a last resort after all other avenues have been exhausted.',
    ],
  },
  {
    number: 'VIII',
    title: 'Amendments',
    content: [
      'These Bylaws may be amended at any annual or special meeting of the Association, provided that the proposed amendment has been included in the notice of the meeting distributed to all members.',
      'Adoption of an amendment shall require an affirmative vote of not less than two-thirds (2/3) of the votes cast at a duly constituted meeting at which a quorum is present.',
      'All amendments shall be effective upon adoption by the membership and shall be filed with the appropriate county recording office as required by applicable law.',
    ],
  },
]

function BySection({ section, photo, photoOnRight }) {
  return (
    <RevealSection className="bylaws__section">
      <div className={`bylaws__section-inner ${photoOnRight ? 'bylaws__section-inner--reverse' : ''}`}>
        <div className="bylaws__section-text">
          <div className="bylaws__section-number">
            Article {section.number}
          </div>
          <h2 className="bylaws__section-title">{section.title}</h2>
          <div className="bylaws__section-divider" />
          {section.content.map((para, i) => (
            <p key={i} className="bylaws__section-para">{para}</p>
          ))}
        </div>
        {photo && (
          <div className="bylaws__section-photo">
            <img
              src={photo.src}
              alt={photo.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
      </div>
    </RevealSection>
  )
}

const SECTION_PHOTOS = [
  { src: '/IMG_8148.jpg', alt: 'Entrance' },
  null,
  { src: '/IMG_8174.jpg', alt: 'Courtyard' },
  null,
  { src: '/IMG_8179.jpg', alt: 'Homes' },
  null,
  { src: '/IMG_8169.jpg', alt: 'Tiles' },
  null,
]

export default function Bylaws() {
  return (
    <main className="bylaws">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/IMG_8160.jpg"
          alt="Community"
          className="page-hero-img"
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
            <p className="bylaws__intro-text">
              The following bylaws govern the Medina Villas Homeowners Association. They have been established to ensure the harmonious operation of our community and to protect the interests and property values of all residents. We ask that every homeowner familiarize themselves with these governing principles.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* PULLQUOTE */}
      <RevealSection>
        <div className="bylaws__pullquote">
          <div className="bylaws__pullquote-inner section-container">
            <p className="bylaws__pullquote-text">
              "A community governed with care, transparency, and respect for every homeowner — that is the promise of Medina Villas."
            </p>
            <p className="bylaws__pullquote-attr">— Medina Villas HOA Board of Directors</p>
          </div>
        </div>
      </RevealSection>

      {/* SECTIONS */}
      <div className="bylaws__body">
        <div className="section-container">
          {BYLAWS_SECTIONS.map((section, i) => (
            <BySection
              key={section.number}
              section={section}
              photo={SECTION_PHOTOS[i]}
              photoOnRight={i % 2 === 0}
            />
          ))}
        </div>
      </div>

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

        .bylaws__body {
          padding: 80px 0 100px;
          background: var(--white);
        }

        .bylaws__section {
          border-bottom: 1px solid var(--beige-mid);
          padding: 72px 0;
        }
        .bylaws__section:last-child { border-bottom: none; }

        .bylaws__section-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .bylaws__section-inner--reverse { }

        .bylaws__section-number {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--purple-light);
          margin-bottom: 12px;
        }
        .bylaws__section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 20px;
          line-height: 1.1;
        }
        .bylaws__section-divider {
          width: 48px;
          height: 2px;
          background: var(--purple-light);
          margin-bottom: 28px;
        }
        .bylaws__section-para {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: #3a3347;
          margin-bottom: 16px;
        }
        .bylaws__section-para:last-child { margin-bottom: 0; }

        .bylaws__section-photo {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          height: 320px;
        }

        /* Two-column layout when photo present */
        .bylaws__section-inner:has(.bylaws__section-photo) {
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        .bylaws__section-inner--reverse:has(.bylaws__section-photo) {
          direction: rtl;
        }
        .bylaws__section-inner--reverse:has(.bylaws__section-photo) > * {
          direction: ltr;
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

        @media (max-width: 900px) {
          .bylaws__section-inner:has(.bylaws__section-photo) {
            grid-template-columns: 1fr;
          }
          .bylaws__section-inner--reverse:has(.bylaws__section-photo) {
            direction: ltr;
          }
        }
      `}</style>
    </main>
  )
}
