import { useEffect, useRef, useState } from 'react'
import { useContent } from '../context/AdminContext'
import EditableText from '../components/EditableText'
import emailjs from '@emailjs/browser'

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

function BoardMember({ index }) {
  const name = useContent(`contact.board.${index}.name`)
  return (
    <RevealSection delay={index * 60} className="contact-page__board-member">
      <div className="contact-page__board-avatar">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <EditableText contentKey={`contact.board.${index}.name`} tag="p" className="contact-page__board-name" multiline={false} />
      <EditableText contentKey={`contact.board.${index}.role`} tag="p" className="contact-page__board-role" multiline={false} />
    </RevealSection>
  )
}

export default function ContactUs() {
  const infoBody = useContent('contact.infoBody')
  const email = useContent('contact.email')
  const phone = useContent('contact.phone')
  const hours = useContent('contact.hours')
  const address = useContent('contact.address')

  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSendError(null)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      setSendError('Something went wrong. Please try emailing us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/IMG_8183.jpg"
          alt="Medina Villas sunrise"
          className="page-hero-img"
          fetchpriority="high"
          style={{ objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(43,20,89,0.92) 0%, rgba(10,5,30,0.45) 100%)'
        }} />
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Get in Touch</p>
          <h1 className="page-hero-title">Contact Us</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="contact-page__body">
        <div className="section-container">
          <div className="contact-page__grid">

            {/* INFO COLUMN */}
            <RevealSection className="contact-page__info">
              <div className="ornament"><span>✦</span></div>
              <h2 className="contact-page__info-heading">
                We're here<br /><em>to help.</em>
              </h2>
              <EditableText contentKey="contact.infoBody" tag="p" className="contact-page__info-body" />

              <div className="contact-page__details">
                <div className="contact-page__detail-item">
                  <span className="contact-page__detail-icon">📍</span>
                  <div>
                    <p className="contact-page__detail-label">HOA Office</p>
                    <EditableText contentKey="contact.address" tag="p" className="contact-page__detail-value" multiline={false} />
                  </div>
                </div>
                <div className="contact-page__detail-item">
                  <span className="contact-page__detail-icon">📧</span>
                  <div>
                    <p className="contact-page__detail-label">Email</p>
                    <EditableText contentKey="contact.email" tag="p" className="contact-page__detail-value" multiline={false} />
                  </div>
                </div>
                <div className="contact-page__detail-item">
                  <span className="contact-page__detail-icon">📞</span>
                  <div>
                    <p className="contact-page__detail-label">Phone</p>
                    <EditableText contentKey="contact.phone" tag="p" className="contact-page__detail-value" multiline={false} />
                  </div>
                </div>
                <div className="contact-page__detail-item">
                  <span className="contact-page__detail-icon">🕐</span>
                  <div>
                    <p className="contact-page__detail-label">Office Hours</p>
                    <EditableText contentKey="contact.hours" tag="p" className="contact-page__detail-value" multiline={false} />
                  </div>
                </div>
              </div>

              <div className="contact-page__photo">
                <img
                  src="/IMG_8179.jpg"
                  alt="Homes"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </RevealSection>

            {/* FORM COLUMN */}
            <RevealSection delay={150} className="contact-page__form-wrap">
              {submitted ? (
                <div className="contact-page__success">
                  <div className="contact-page__success-icon">✓</div>
                  <h3 className="contact-page__success-title">Message Received</h3>
                  <p className="contact-page__success-text">
                    Thank you for reaching out. A member of the HOA Board will respond to you within 2–3 business days.
                  </p>
                  <button
                    className="contact-page__success-btn"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-page__form" onSubmit={handleSubmit}>
                  <h3 className="contact-page__form-title">Send a Message</h3>
                  <p className="contact-page__form-sub">All fields marked * are required</p>

                  <div className="contact-page__form-row">
                    <div className="contact-page__field">
                      <label className="contact-page__label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="contact-page__input"
                      />
                    </div>
                    <div className="contact-page__field">
                      <label className="contact-page__label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(XXX) XXX-XXXX"
                        className="contact-page__input"
                      />
                    </div>
                  </div>

                  <div className="contact-page__field">
                    <label className="contact-page__label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="contact-page__input"
                    />
                  </div>

                  <div className="contact-page__field">
                    <label className="contact-page__label">Subject *</label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="contact-page__input contact-page__select"
                    >
                      <option value="">Select a subject...</option>
                      <option>General Inquiry</option>
                      <option>Maintenance Request</option>
                      <option>Rule / Violation Concern</option>
                      <option>Dues & Assessments</option>
                      <option>Event / Community Idea</option>
                      <option>Architectural Review Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="contact-page__field">
                    <label className="contact-page__label">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please describe your inquiry in detail..."
                      className="contact-page__input contact-page__textarea"
                    />
                  </div>

                  {sendError && (
                    <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>
                      {sendError}
                    </p>
                  )}
                  <button type="submit" className="contact-page__submit" disabled={sending}>
                    {sending ? 'Sending…' : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </RevealSection>

          </div>
        </div>
      </section>

      {/* BOARD MEMBERS */}
      <RevealSection>
        <section className="contact-page__board">
          <div className="section-container">
            <div className="ornament"><span>✦</span></div>
            <h2 className="contact-page__board-heading">HOA Board Members</h2>
            <div className="contact-page__board-grid">
              {[0, 1, 2].map((i) => (
                <BoardMember key={i} index={i} />
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      <style>{`
        .contact-page { flex: 1; }

        .contact-page__body {
          padding: 100px 0;
          background: var(--beige-pale);
        }
        .contact-page__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* INFO */
        .contact-page__info-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 400;
          color: var(--purple-deep);
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .contact-page__info-heading em { font-style: italic; color: var(--purple-mid); }
        .contact-page__info-body {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.8;
          color: #3a3347;
          margin-bottom: 40px;
        }

        .contact-page__details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }
        .contact-page__detail-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .contact-page__detail-icon {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .contact-page__detail-label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--purple-light);
          margin-bottom: 4px;
        }
        .contact-page__detail-value {
          font-size: 15px;
          font-weight: 300;
          color: var(--purple-deep);
        }

        .contact-page__photo {
          position: relative;
          overflow: hidden;
          height: 220px;
          border-radius: 3px;
        }

        /* FORM */
        .contact-page__form-wrap {
          background: var(--white);
          border: 1px solid var(--beige-mid);
          border-radius: 4px;
          padding: 48px;
          box-shadow: 0 4px 40px rgba(43,20,89,0.08);
        }
        .contact-page__form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 4px;
        }
        .contact-page__form-sub {
          font-size: 12px;
          font-weight: 300;
          color: var(--purple-light);
          margin-bottom: 32px;
        }
        .contact-page__form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .contact-page__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .contact-page__label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--purple-mid);
        }
        .contact-page__input {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: var(--black-soft);
          background: var(--beige-pale);
          border: 1px solid var(--beige-mid);
          border-radius: 2px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .contact-page__input:focus {
          border-color: var(--purple-light);
          box-shadow: 0 0 0 3px rgba(155, 111, 199, 0.12);
        }
        .contact-page__input::placeholder { color: var(--beige-dark); opacity: 0.7; }
        .contact-page__select { cursor: pointer; }
        .contact-page__textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }
        .contact-page__submit {
          width: 100%;
          padding: 16px;
          background: var(--purple-deep);
          color: var(--white);
          border: none;
          border-radius: 2px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s, transform 0.2s;
          margin-top: 8px;
        }
        .contact-page__submit:hover {
          background: var(--purple-mid);
          transform: translateY(-2px);
        }

        /* SUCCESS */
        .contact-page__success {
          text-align: center;
          padding: 60px 20px;
        }
        .contact-page__success-icon {
          width: 64px;
          height: 64px;
          background: var(--purple-deep);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 24px;
        }
        .contact-page__success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 12px;
        }
        .contact-page__success-text {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: #3a3347;
          max-width: 360px;
          margin: 0 auto 32px;
        }
        .contact-page__success-btn {
          padding: 12px 32px;
          background: transparent;
          border: 1px solid var(--purple-deep);
          color: var(--purple-deep);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s;
        }
        .contact-page__success-btn:hover {
          background: var(--purple-deep);
          color: var(--white);
        }

        /* BOARD */
        .contact-page__board {
          padding: 100px 0;
          background: var(--white);
          text-align: center;
        }
        .contact-page__board-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 400;
          color: var(--purple-deep);
          margin-bottom: 56px;
        }
        .contact-page__board-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
        }
        .contact-page__board-member {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          min-width: 140px;
        }
        .contact-page__board-avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--purple-mid), var(--purple-deep));
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 1px;
        }
        .contact-page__board-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          color: var(--purple-deep);
        }
        .contact-page__board-role {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--purple-light);
        }

        @media (max-width: 900px) {
          .contact-page__grid { grid-template-columns: 1fr; gap: 48px; }
          .contact-page__form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .contact-page__form-wrap { padding: 32px 24px; }
          .contact-page__body { padding: 60px 0; }
          .contact-page__board { padding: 60px 0; }
        }
      `}</style>
    </main>
  )
}
