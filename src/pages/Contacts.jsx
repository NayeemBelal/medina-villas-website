import { useEffect, useRef, useState } from 'react'
import { useAdmin, useContent } from '../context/AdminContext'
import { supabase } from '../lib/supabase'
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

// ── Star Rating ────────────────────────────────────
function StarRating({ value, onChange, readonly = false }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="stars" style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={`star ${n <= (readonly ? value : (hovered || value)) ? 'star--on' : ''}`}
          onClick={() => !readonly && onChange(n)}
          onMouseEnter={() => !readonly && setHovered(n)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{ cursor: readonly ? 'default' : 'pointer', fontSize: readonly ? 14 : 22, lineHeight: 1 }}
        >★</span>
      ))}
    </div>
  )
}

// ── Review Form ─────────────────────────────────────
function ReviewForm({ contactId, onSubmitted }) {
  const [form, setForm] = useState({ name: '', address: '', review: '', stars: 0 })
  const [photos, setPhotos] = useState([])
  const [previews, setPreviews] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setPhotos(files)
    setPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const charsLeft = 200 - form.review.length

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.stars === 0) { setError('Please select a star rating.'); return }
    setSubmitting(true)
    setError('')

    const { data: review, error: reviewErr } = await supabase
      .from('reviews')
      .insert({ contact_id: contactId, reviewer_name: form.name, address: form.address, stars: form.stars, review_text: form.review })
      .select().single()

    if (reviewErr) { setError('Failed to submit review. Please try again.'); setSubmitting(false); return }

    for (const file of photos) {
      const path = `${review.id}/${Date.now()}_${file.name}`
      const { error: upErr } = await supabase.storage.from('review-photos').upload(path, file, { contentType: file.type })
      if (!upErr) await supabase.from('review_photos').insert({ review_id: review.id, storage_path: path })
    }

    setForm({ name: '', address: '', review: '', stars: 0 })
    setPhotos([]); setPreviews([])
    setSubmitting(false)
    onSubmitted()
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <p className="review-form__title">Write a Review</p>
      <div className="review-form__row">
        <div className="review-form__field">
          <label className="review-form__label">Your Name *</label>
          <input className="review-form__input" required value={form.name}
            onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Jane Smith" />
        </div>
        <div className="review-form__field">
          <label className="review-form__label">Your Address *</label>
          <input className="review-form__input" required value={form.address}
            onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="123 Medina Dr" />
        </div>
      </div>
      <div className="review-form__field">
        <label className="review-form__label">Rating *</label>
        <StarRating value={form.stars} onChange={v => setForm(f => ({...f, stars: v}))} />
      </div>
      <div className="review-form__field">
        <label className="review-form__label">Review * <span style={{ color: charsLeft < 30 ? '#e07575' : 'var(--beige-dark)', float: 'right' }}>{charsLeft} left</span></label>
        <textarea className="review-form__input review-form__textarea" required
          maxLength={200} rows={3} value={form.review}
          onChange={e => setForm(f => ({...f, review: e.target.value}))}
          placeholder="Share your experience (max 200 characters)..." />
      </div>
      <div className="review-form__field">
        <label className="review-form__label">Photos (optional, up to 4)</label>
        <div className="review-form__photo-row">
          {previews.map((p, i) => (
            <img key={i} src={p} alt="" className="review-form__photo-preview" />
          ))}
          {previews.length < 4 && (
            <button type="button" className="review-form__photo-btn" onClick={() => fileRef.current?.click()}>
              + Add Photo
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotos} />
      </div>
      {error && <p className="review-form__error">{error}</p>}
      <button type="submit" className="review-form__submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}

// ── Review Display ──────────────────────────────────
function ReviewList({ contactId, refreshKey }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('reviews')
        .select('*, review_photos(*)')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false })
      if (data) setReviews(data)
      setLoading(false)
    }
    fetch()
  }, [contactId, refreshKey])

  if (loading) return <p className="reviews-loading">Loading reviews…</p>
  if (reviews.length === 0) return <p className="reviews-empty">No reviews yet. Be the first!</p>

  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)

  return (
    <div className="reviews-list">
      <div className="reviews-summary">
        <span className="reviews-avg">{avg}</span>
        <StarRating value={Math.round(avg)} readonly />
        <span className="reviews-count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
      </div>
      {reviews.map(r => (
        <div key={r.id} className="review-item">
          <div className="review-item__header">
            <div>
              <span className="review-item__name">{r.reviewer_name}</span>
              <span className="review-item__addr">{r.address}</span>
            </div>
            <StarRating value={r.stars} readonly />
          </div>
          <p className="review-item__text">{r.review_text}</p>
          {r.review_photos?.length > 0 && (
            <div className="review-item__photos">
              {r.review_photos.map(p => (
                <img
                  key={p.id}
                  src={supabase.storage.from('review-photos').getPublicUrl(p.storage_path).data.publicUrl}
                  alt="Review photo"
                  className="review-item__photo"
                />
              ))}
            </div>
          )}
          <span className="review-item__date">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      ))}
    </div>
  )
}

// ── Contact Card ────────────────────────────────────
function ContactCard({ contact, delay }) {
  const [showReviews, setShowReviews] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmitted = () => {
    setShowForm(false)
    setShowReviews(true)
    setRefreshKey(k => k + 1)
  }

  return (
    <RevealSection delay={delay} className="contact-card">
      <div className="contact-card__name">{contact.name}</div>
      <a href={`tel:${contact.phone}`} className="contact-card__phone">{contact.phone}</a>
      {contact.note && <span className="contact-card__note">{contact.note}</span>}

      <div className="contact-card__actions">
        <button className="contact-card__btn" onClick={() => { setShowReviews(v => !v); setShowForm(false) }}>
          {showReviews ? 'Hide Reviews' : 'View Reviews'}
        </button>
        <button className="contact-card__btn contact-card__btn--primary" onClick={() => { setShowForm(v => !v); setShowReviews(true) }}>
          {showForm ? 'Cancel' : '+ Review'}
        </button>
      </div>

      {showReviews && (
        <div className="contact-card__reviews">
          {showForm && <ReviewForm contactId={contact.id} onSubmitted={handleSubmitted} />}
          <ReviewList contactId={contact.id} refreshKey={refreshKey} />
        </div>
      )}
    </RevealSection>
  )
}

export default function Contacts() {
  const { serviceContacts } = useAdmin()
  const contactsIntro = useContent('contacts.intro')

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
            <EditableText contentKey="contacts.intro" tag="p" className="contacts__intro-text" />
          </RevealSection>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="contacts__body">
        <div className="section-container">
          {serviceContacts.map((cat, ci) => (
            <RevealSection key={cat.id} delay={ci * 60} className="contacts__category">
              <div className="contacts__category-header">
                <span className="contacts__category-icon">{cat.icon}</span>
                <div>
                  <h2 className="contacts__category-title">{cat.title}</h2>
                  <p className="contacts__category-sub">{cat.subtitle}</p>
                </div>
                <div className="contacts__category-line" />
              </div>
              <div className="contacts__cards">
                {cat.contacts.map((contact, i) => (
                  <ContactCard key={contact.id} contact={contact} delay={i * 70} />
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

        /* ── Card action buttons ── */
        .contact-card__actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        .contact-card__btn {
          flex: 1;
          padding: 8px 12px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border: 1px solid var(--purple-pale);
          background: transparent;
          color: var(--purple-mid);
        }
        .contact-card__btn:hover { background: var(--beige-light); }
        .contact-card__btn--primary {
          background: var(--purple-deep);
          color: var(--white);
          border-color: var(--purple-deep);
        }
        .contact-card__btn--primary:hover { background: var(--purple-mid); }

        .contact-card__reviews {
          margin-top: 20px;
          border-top: 1px solid var(--beige-mid);
          padding-top: 20px;
        }

        /* ── Review Form ── */
        .review-form {
          background: var(--beige-light);
          border-radius: 4px;
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .review-form__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          color: var(--purple-deep);
        }
        .review-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .review-form__field { display: flex; flex-direction: column; gap: 6px; }
        .review-form__label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--purple-mid);
        }
        .review-form__input {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: var(--black-soft);
          background: var(--white);
          border: 1px solid var(--beige-mid);
          border-radius: 2px;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .review-form__input:focus { border-color: var(--purple-light); }
        .review-form__textarea { resize: none; line-height: 1.6; }
        .review-form__photo-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .review-form__photo-preview {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid var(--beige-mid);
        }
        .review-form__photo-btn {
          width: 64px;
          height: 64px;
          border: 2px dashed var(--purple-pale);
          border-radius: 3px;
          background: transparent;
          color: var(--purple-light);
          font-size: 11px;
          cursor: pointer;
          transition: border-color 0.2s;
          font-family: 'Jost', sans-serif;
        }
        .review-form__photo-btn:hover { border-color: var(--purple-mid); }
        .review-form__error { font-size: 13px; color: #c0392b; }
        .review-form__submit {
          align-self: flex-start;
          padding: 10px 28px;
          background: var(--purple-deep);
          color: var(--white);
          border: none;
          border-radius: 2px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .review-form__submit:hover:not(:disabled) { background: var(--purple-mid); }
        .review-form__submit:disabled { opacity: 0.5; cursor: default; }

        /* ── Stars ── */
        .star { color: var(--beige-mid); transition: color 0.15s; }
        .star--on { color: #c9921a; }

        /* ── Review List ── */
        .reviews-loading, .reviews-empty {
          font-size: 13px;
          color: var(--purple-light);
          font-style: italic;
          padding: 8px 0;
        }
        .reviews-summary {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--beige-mid);
        }
        .reviews-avg {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: var(--purple-deep);
          line-height: 1;
        }
        .reviews-count {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--purple-light);
          text-transform: uppercase;
        }
        .review-item {
          padding: 14px 0;
          border-bottom: 1px solid var(--beige-light);
        }
        .review-item:last-child { border-bottom: none; }
        .review-item__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
          gap: 8px;
        }
        .review-item__name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 500;
          color: var(--purple-deep);
        }
        .review-item__addr {
          display: block;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--beige-dark);
          margin-top: 2px;
        }
        .review-item__text {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: #3a3347;
          margin-bottom: 10px;
        }
        .review-item__photos {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .review-item__photo {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid var(--beige-mid);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .review-item__photo:hover { transform: scale(1.05); }
        .review-item__date {
          font-size: 11px;
          color: var(--beige-dark);
          letter-spacing: 1px;
        }

        @media (max-width: 600px) {
          .review-form__row { grid-template-columns: 1fr; }
          .contact-card__actions { flex-direction: column; }
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
