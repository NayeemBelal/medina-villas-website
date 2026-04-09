import { useState, useRef } from 'react'
import { useAdmin, DEFAULT_CONTENT } from '../context/AdminContext'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

// ── Login Screen ────────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(username, password)
    if (!result.success) {
      setError('Invalid username or password.')
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      {/* Left — photo panel */}
      <div className="login-photo">
        <img src="/IMG_8148.jpg" alt="Medina Villas" className="login-photo__img" />
        <div className="login-photo__overlay" />
        <div className="login-photo__content">
          <p className="login-photo__eyebrow">Medina Villas</p>
          <h1 className="login-photo__title">Homeowners<br />Association</h1>
          <div className="login-photo__divider" />
          <p className="login-photo__sub">Resident Portal</p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          <div className="login-form-brand">
            <span className="login-form-brand__script">Medina Villas</span>
            <span className="login-form-brand__badge">Admin</span>
          </div>

          <h2 className="login-form-heading">Welcome back</h2>
          <p className="login-form-sub">Sign in to manage your community portal.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form__field">
              <label className="login-form__label">Username</label>
              <input
                type="text" value={username} autoComplete="username"
                onChange={e => { setUsername(e.target.value); setError('') }}
                className="login-form__input" placeholder="Enter your username" required
              />
            </div>
            <div className="login-form__field">
              <label className="login-form__label">Password</label>
              <input
                type="password" value={password} autoComplete="current-password"
                onChange={e => { setPassword(e.target.value); setError('') }}
                className="login-form__input" placeholder="••••••••" required
              />
            </div>

            {error && (
              <div className="login-form__error">
                <span>⚠</span> {error}
              </div>
            )}

            <button type="submit" className="login-form__btn" disabled={loading}>
              {loading
                ? <span className="login-form__btn-loading"><span /><span /><span /></span>
                : 'Sign In'
              }
            </button>
          </form>

          <p className="login-form-footer">
            ← <a href="/">Back to website</a>
          </p>
        </div>
      </div>

      <style>{`
        .login-wrap {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Jost', sans-serif;
        }

        /* Photo panel */
        .login-photo {
          position: relative;
          overflow: hidden;
          background: #1a0a35;
        }
        .login-photo__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
          animation: loginFadeIn 1.2s ease forwards;
        }
        .login-photo__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom right,
            rgba(43, 20, 89, 0.7) 0%,
            rgba(10, 5, 30, 0.5) 100%
          );
        }
        .login-photo__content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 64px;
          animation: loginSlideUp 1s ease 0.2s both;
        }
        .login-photo__eyebrow {
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(228, 211, 244, 0.7);
          margin-bottom: 16px;
        }
        .login-photo__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 300;
          color: #fefcf8;
          line-height: 1.05;
          margin-bottom: 24px;
        }
        .login-photo__divider {
          width: 48px;
          height: 1px;
          background: #9b6fc7;
          margin-bottom: 20px;
        }
        .login-photo__sub {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(228, 211, 244, 0.5);
        }

        /* Form panel */
        .login-form-panel {
          background: #0d0820;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          animation: loginFadeIn 0.8s ease 0.1s both;
        }
        .login-form-inner {
          width: 100%;
          max-width: 380px;
        }
        .login-form-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .login-form-brand__script {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #fefcf8;
        }
        .login-form-brand__badge {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: rgba(155, 111, 199, 0.15);
          color: #b896d4;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(155, 111, 199, 0.3);
        }
        .login-form-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 400;
          color: #fefcf8;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .login-form-sub {
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 224, 240, 0.4);
          margin-bottom: 40px;
          letter-spacing: 0.3px;
        }

        .login-form { display: flex; flex-direction: column; gap: 24px; }
        .login-form__field { display: flex; flex-direction: column; gap: 8px; }
        .login-form__label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #9b6fc7;
        }
        .login-form__input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(155, 111, 199, 0.18);
          border-radius: 4px;
          padding: 13px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #e8e0f0;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          width: 100%;
        }
        .login-form__input::placeholder { color: rgba(155, 111, 199, 0.3); }
        .login-form__input:focus {
          border-color: #9b6fc7;
          background: rgba(155, 111, 199, 0.07);
          box-shadow: 0 0 0 3px rgba(155, 111, 199, 0.1);
        }
        .login-form__error {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #e07575;
          background: rgba(200, 60, 60, 0.1);
          border: 1px solid rgba(200, 60, 60, 0.2);
          border-radius: 4px;
          padding: 10px 14px;
        }
        .login-form__btn {
          margin-top: 8px;
          padding: 15px;
          background: linear-gradient(135deg, #5b2d8e, #3d1c7a);
          color: #fefcf8;
          border: none;
          border-radius: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
        }
        .login-form__btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .login-form__btn:disabled { opacity: 0.6; cursor: default; }

        /* Loading dots */
        .login-form__btn-loading {
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .login-form__btn-loading span {
          width: 6px;
          height: 6px;
          background: rgba(254, 252, 248, 0.8);
          border-radius: 50%;
          animation: loginDot 1.2s ease-in-out infinite;
        }
        .login-form__btn-loading span:nth-child(2) { animation-delay: 0.2s; }
        .login-form__btn-loading span:nth-child(3) { animation-delay: 0.4s; }

        .login-form-footer {
          margin-top: 32px;
          font-size: 12px;
          font-weight: 300;
          color: rgba(232, 224, 240, 0.3);
          text-align: center;
        }
        .login-form-footer a {
          color: rgba(184, 150, 212, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-form-footer a:hover { color: #b896d4; }

        @keyframes loginFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes loginSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loginDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }

        @media (max-width: 768px) {
          .login-wrap { grid-template-columns: 1fr; }
          .login-photo { display: none; }
          .login-form-panel { padding: 48px 28px; background: linear-gradient(160deg, #0d0820 0%, #1a0a35 100%); min-height: 100vh; }
        }
      `}</style>
    </div>
  )
}

// ── Gallery Tab ─────────────────────────────────────────────────
function GalleryTab() {
  const { gallery, galleryLoading, addGalleryPhoto, removeGalleryPhoto } = useAdmin()
  const [caption, setCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
    setUploadError('')
  }

  const handleAdd = async () => {
    if (!selectedFile) return
    setUploading(true)
    setUploadError('')
    const result = await addGalleryPhoto(selectedFile, caption)
    setUploading(false)
    if (!result.success) {
      setUploadError(result.message)
      return
    }
    setPreview(null)
    setSelectedFile(null)
    setCaption('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleDelete = (id, storagePath) => {
    removeGalleryPhoto(id, storagePath)
    setConfirmDelete(null)
  }

  return (
    <div className="adm-tab">
      <h2 className="adm-tab__heading">Neighborhood Gallery</h2>
      <p className="adm-tab__sub">Upload photos submitted by residents. These appear on the public Gallery page.</p>

      {/* Upload */}
      <div className="adm-gallery-upload">
        <h3 className="adm-section-title">Add a Photo</h3>
        <div className="adm-gallery-upload__row">
          <div className="adm-gallery-upload__file-area" onClick={() => fileRef.current?.click()}>
            {preview
              ? <img src={preview} alt="preview" className="adm-gallery-upload__preview" />
              : <div className="adm-gallery-upload__placeholder">
                  <span className="adm-gallery-upload__icon">＋</span>
                  <span>Click to choose a photo</span>
                </div>
            }
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          </div>
          <div className="adm-gallery-upload__meta">
            <div className="adm-field">
              <label className="adm-label">Caption (optional)</label>
              <input
                type="text" value={caption}
                onChange={e => setCaption(e.target.value)}
                className="adm-input" placeholder="e.g. Front entrance in spring"
              />
            </div>
            {uploadError && <p style={{ color: '#e07575', fontSize: 13 }}>{uploadError}</p>}
            <button className="adm-btn adm-btn--primary" onClick={handleAdd} disabled={!selectedFile || uploading}>
              {uploading ? 'Uploading…' : 'Add to Gallery'}
            </button>
            {preview && !uploading && (
              <button className="adm-btn adm-btn--ghost" onClick={() => { setPreview(null); setSelectedFile(null); setCaption('') }}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="adm-gallery-grid-wrap">
        <h3 className="adm-section-title">
          Current Gallery
          <span className="adm-section-count">{gallery.length} photos</span>
        </h3>
        {galleryLoading
          ? <p className="adm-empty">Loading gallery…</p>
          : gallery.length === 0
          ? <p className="adm-empty">No photos yet. Upload the first one above.</p>
          : (
            <div className="adm-gallery-grid">
              {gallery.map(photo => (
                <div key={photo.id} className="adm-gallery-card">
                  <img src={photo.url} alt={photo.caption} className="adm-gallery-card__img" />
                  <div className="adm-gallery-card__footer">
                    <span className="adm-gallery-card__caption">{photo.caption || '—'}</span>
                    {confirmDelete === photo.id
                      ? (
                        <div className="adm-gallery-card__confirm">
                          <span>Delete?</span>
                          <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => handleDelete(photo.id, photo.storage_path)}>Yes</button>
                          <button className="adm-btn-sm" onClick={() => setConfirmDelete(null)}>No</button>
                        </div>
                      )
                      : (
                        <button className="adm-gallery-card__del" onClick={() => setConfirmDelete(photo.id)}>✕</button>
                      )
                    }
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

// ── Content Tab ──────────────────────────────────────────────────
const CONTENT_SECTIONS = [
  {
    page: 'Home',
    fields: [
      { key: 'home.heroDesc', label: 'Hero Description', multiline: true },
      { key: 'home.welcomeHeading', label: 'Welcome Section Heading' },
      { key: 'home.welcomeBody1', label: 'Welcome Paragraph 1', multiline: true },
      { key: 'home.welcomeBody2', label: 'Welcome Paragraph 2', multiline: true },
    ],
  },
  {
    page: 'Bylaws',
    fields: [
      { key: 'bylaws.intro', label: 'Intro Paragraph', multiline: true },
      { key: 'bylaws.pullquote', label: 'Pull Quote', multiline: true },
    ],
  },
  {
    page: 'Contacts',
    fields: [
      { key: 'contacts.intro', label: 'Intro Paragraph', multiline: true },
    ],
  },
  {
    page: 'Useful Links',
    fields: [
      { key: 'links.intro', label: 'Intro Paragraph', multiline: true },
    ],
  },
  {
    page: 'Contact Us',
    fields: [
      { key: 'contact.infoBody', label: 'Info Description', multiline: true },
      { key: 'contact.email', label: 'Email Address' },
      { key: 'contact.phone', label: 'Phone Number' },
      { key: 'contact.hours', label: 'Office Hours' },
      { key: 'contact.address', label: 'Address' },
    ],
  },
]

function ContentTab() {
  const { content, updateContent } = useAdmin()
  const [activeSection, setActiveSection] = useState('Home')
  const [saved, setSaved] = useState({})

  const handleSave = (key, value) => {
    updateContent(key, value)
    setSaved(s => ({ ...s, [key]: true }))
    setTimeout(() => setSaved(s => { const n = { ...s }; delete n[key]; return n }), 2000)
  }

  const section = CONTENT_SECTIONS.find(s => s.page === activeSection)

  return (
    <div className="adm-tab">
      <h2 className="adm-tab__heading">Page Content</h2>
      <p className="adm-tab__sub">Edit the text shown on each page. Changes save immediately and appear live.</p>

      <div className="adm-content-layout">
        {/* Sidebar */}
        <div className="adm-content-sidebar">
          {CONTENT_SECTIONS.map(s => (
            <button
              key={s.page}
              className={`adm-content-nav ${activeSection === s.page ? 'adm-content-nav--active' : ''}`}
              onClick={() => setActiveSection(s.page)}
            >
              {s.page}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="adm-content-fields">
          {section?.fields.map(field => (
            <ContentField
              key={field.key}
              field={field}
              value={content[field.key] ?? DEFAULT_CONTENT[field.key] ?? ''}
              onSave={handleSave}
              saved={!!saved[field.key]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContentField({ field, value, onSave, saved }) {
  const [draft, setDraft] = useState(value)
  const isDirty = draft !== value

  return (
    <div className="adm-content-field">
      <div className="adm-content-field__header">
        <label className="adm-label">{field.label}</label>
        {saved && <span className="adm-saved">✓ Saved</span>}
      </div>
      {field.multiline
        ? <textarea
            className="adm-input adm-textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
          />
        : <input
            type="text"
            className="adm-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
      }
      <button
        className={`adm-btn adm-btn--save ${isDirty ? '' : 'adm-btn--save-idle'}`}
        onClick={() => onSave(field.key, draft)}
        disabled={!isDirty}
      >
        Save
      </button>
    </div>
  )
}

// ── Contacts Tab ────────────────────────────────────────────────
function ContactsTab() {
  const { serviceContacts, updateContact, addContact, removeContact, addCategory, removeCategory } = useAdmin()
  const [activecat, setActiveCat] = useState(serviceContacts[0]?.id)
  const [showNewCat, setShowNewCat] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(false)

  const cat = serviceContacts.find(c => c.id === activecat)

  const handleAddCategory = () => {
    if (!newTitle.trim()) return
    const id = addCategory('', newTitle.trim(), newSubtitle.trim())
    setActiveCat(id)
    setNewTitle('')
    setNewSubtitle('')
    setShowNewCat(false)
  }

  const handleDeleteCategory = () => {
    const remaining = serviceContacts.filter(c => c.id !== activecat)
    setActiveCat(remaining[0]?.id)
    removeCategory(activecat)
    setConfirmDeleteCat(false)
  }

  return (
    <div className="adm-tab">
      <h2 className="adm-tab__heading">Service Contacts</h2>
      <p className="adm-tab__sub">Add, edit, or remove contacts in each service category.</p>

      <div className="adm-content-layout">
        {/* Sidebar */}
        <div className="adm-content-sidebar">
          {serviceContacts.map(c => (
            <button
              key={c.id}
              className={`adm-content-nav ${activecat === c.id ? 'adm-content-nav--active' : ''}`}
              onClick={() => { setActiveCat(c.id); setConfirmDeleteCat(false) }}
            >
              {c.icon} {c.title}
            </button>
          ))}
          <button className="adm-content-nav adm-content-nav--add" onClick={() => setShowNewCat(v => !v)}>
            + New Category
          </button>
          {showNewCat && (
            <div className="adm-new-cat-form">
              <input
                className="adm-input adm-input--sm"
                placeholder="Category name *"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <input
                className="adm-input adm-input--sm"
                placeholder="Subtitle"
                value={newSubtitle}
                onChange={e => setNewSubtitle(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="adm-btn adm-btn--primary adm-btn--sm" onClick={handleAddCategory} disabled={!newTitle.trim()}>
                  Create
                </button>
                <button className="adm-btn adm-btn--sm" onClick={() => setShowNewCat(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contacts list */}
        <div className="adm-content-fields">
          {cat && (
            <>
              <div className="adm-contacts-header">
                <span className="adm-section-title">{cat.icon} {cat.title}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="adm-btn adm-btn--primary adm-btn--sm" onClick={() => addContact(cat.id)}>
                    + Add Contact
                  </button>
                  {confirmDeleteCat ? (
                    <>
                      <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={handleDeleteCategory}>
                        Confirm Delete
                      </button>
                      <button className="adm-btn adm-btn--sm" onClick={() => setConfirmDeleteCat(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="adm-btn adm-btn--sm" onClick={() => setConfirmDeleteCat(true)}>
                      Delete Category
                    </button>
                  )}
                </div>
              </div>
              {cat.contacts.map(contact => (
                <ContactEditCard
                  key={contact.id}
                  contact={contact}
                  catId={cat.id}
                  onUpdate={updateContact}
                  onRemove={removeContact}
                />
              ))}
              {cat.contacts.length === 0 && (
                <p className="adm-empty">No contacts yet. Click "Add Contact" to add one.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ContactEditCard({ contact, catId, onUpdate, onRemove }) {
  const [name, setName] = useState(contact.name)
  const [phone, setPhone] = useState(contact.phone)
  const [note, setNote] = useState(contact.note)
  const [confirm, setConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    onUpdate(catId, contact.id, 'name', name)
    onUpdate(catId, contact.id, 'phone', phone)
    onUpdate(catId, contact.id, 'note', note)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const isDirty = name !== contact.name || phone !== contact.phone || note !== contact.note

  return (
    <div className="adm-contact-card">
      <div className="adm-contact-card__row">
        <div className="adm-field" style={{ flex: 2 }}>
          <label className="adm-label">Name</label>
          <input type="text" className="adm-input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="adm-field" style={{ flex: 2 }}>
          <label className="adm-label">Phone</label>
          <input type="text" className="adm-input" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="adm-field" style={{ flex: 2 }}>
          <label className="adm-label">Note</label>
          <input type="text" className="adm-input" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Available weekends" />
        </div>
        <div className="adm-contact-card__actions">
          <button
            className={`adm-btn adm-btn--save ${isDirty ? '' : 'adm-btn--save-idle'}`}
            onClick={handleSave} disabled={!isDirty}
          >
            {saved ? '✓' : 'Save'}
          </button>
          {confirm
            ? <>
                <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => onRemove(catId, contact.id)}>Delete</button>
                <button className="adm-btn-sm" onClick={() => setConfirm(false)}>Cancel</button>
              </>
            : <button className="adm-btn-sm adm-btn-sm--danger-outline" onClick={() => setConfirm(true)}>✕</button>
          }
        </div>
      </div>
    </div>
  )
}

// ── Migrate Tab ─────────────────────────────────────────────────
function MigrateTab() {
  const [status, setStatus] = useState(null)
  const [running, setRunning] = useState(false)

  const run = async () => {
    setRunning(true)
    setStatus(null)
    let contentCount = 0
    let contactsCount = 0

    try {
      // Migrate site content
      const rawContent = localStorage.getItem('mv_content')
      if (rawContent) {
        const saved = JSON.parse(rawContent)
        const rows = Object.entries(saved).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }))
        const { error } = await supabase.from('site_content').upsert(rows)
        if (error) throw new Error(error.message)
        contentCount = rows.length
      }

      // Migrate service contacts
      const rawContacts = localStorage.getItem('mv_contacts')
      if (rawContacts) {
        const saved = JSON.parse(rawContacts)
        const rows = saved.map(({ id, ...rest }) => ({ id, data: rest }))
        const { error } = await supabase.from('service_contacts').upsert(rows)
        if (error) throw new Error(error.message)
        contactsCount = saved.reduce((n, c) => n + c.contacts.length, 0)
      }

      setStatus({ ok: true, contentCount, contactsCount })
    } catch (e) {
      setStatus({ ok: false, error: e.message })
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="adm-tab">
      <h2 className="adm-tab__heading">Migrate Local Data</h2>
      <p className="adm-tab__sub">
        If you previously edited content on this device before the database was set up, click below to push those saved changes into Supabase so they appear site-wide.
      </p>
      <div style={{ maxWidth: 480, marginTop: 32 }}>
        <button className="adm-btn adm-btn--primary" onClick={run} disabled={running}>
          {running ? 'Migrating…' : 'Migrate This Device\'s Local Data → Supabase'}
        </button>
        {status?.ok && (
          <p style={{ marginTop: 16, color: '#4caf6e', fontSize: 14 }}>
            ✓ Done — pushed {status.contentCount} content fields and {status.contactsCount} contacts to Supabase.
            You can now use this tab on any device and changes will be live everywhere.
          </p>
        )}
        {status && !status.ok && (
          <p style={{ marginTop: 16, color: '#e05050', fontSize: 14 }}>
            ✗ Error: {status.error}
          </p>
        )}
        <p style={{ marginTop: 24, fontSize: 12, color: '#6b5f7a', lineHeight: 1.6 }}>
          Note: this overwrites whatever is currently in the database with the data from this browser's localStorage. Only run this once, on the device that has the most up-to-date edits.
        </p>
      </div>
    </div>
  )
}

// ── Links Tab ───────────────────────────────────────────────────
function LinkEditCard({ link, catId, onUpdate, onRemove }) {
  const [label, setLabel] = useState(link.label)
  const [url, setUrl] = useState(link.url)
  const [description, setDescription] = useState(link.description)
  const [confirm, setConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    onUpdate(catId, link.id, 'label', label)
    onUpdate(catId, link.id, 'url', url)
    onUpdate(catId, link.id, 'description', description)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const isDirty = label !== link.label || url !== link.url || description !== link.description

  return (
    <div className="adm-contact-card">
      <div className="adm-contact-card__row" style={{ flexWrap: 'wrap' }}>
        <div className="adm-field" style={{ flex: '2 1 180px' }}>
          <label className="adm-label">Label</label>
          <input type="text" className="adm-input" value={label} onChange={e => setLabel(e.target.value)} />
        </div>
        <div className="adm-field" style={{ flex: '3 1 240px' }}>
          <label className="adm-label">URL</label>
          <input type="url" className="adm-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://" />
        </div>
        <div className="adm-field" style={{ flex: '3 1 240px' }}>
          <label className="adm-label">Description</label>
          <input type="text" className="adm-input" value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description (optional)" />
        </div>
        <div className="adm-contact-card__actions">
          <button
            className={`adm-btn adm-btn--save ${isDirty ? '' : 'adm-btn--save-idle'}`}
            onClick={handleSave} disabled={!isDirty}
          >
            {saved ? '✓' : 'Save'}
          </button>
          {confirm
            ? <>
                <button className="adm-btn-sm adm-btn-sm--danger" onClick={() => onRemove(catId, link.id)}>Delete</button>
                <button className="adm-btn-sm" onClick={() => setConfirm(false)}>Cancel</button>
              </>
            : <button className="adm-btn-sm adm-btn-sm--danger-outline" onClick={() => setConfirm(true)}>✕</button>
          }
        </div>
      </div>
    </div>
  )
}

function LinksTab() {
  const { usefulLinks, linksLoading, updateLink, addLink, removeLink, addLinkCategory, removeLinkCategory } = useAdmin()
  const [activeCat, setActiveCat] = useState(null)
  const [showNewCat, setShowNewCat] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')
  const [newIcon, setNewIcon] = useState('🔗')
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(false)

  const cat = usefulLinks.find(c => c.id === activeCat) || usefulLinks[0]

  const handleAddCategory = () => {
    if (!newTitle.trim()) return
    const id = addLinkCategory(newIcon, newTitle.trim(), newSubtitle.trim())
    setActiveCat(id)
    setShowNewCat(false)
    setNewTitle('')
    setNewSubtitle('')
    setNewIcon('🔗')
  }

  const handleDeleteCategory = () => {
    removeLinkCategory(cat.id)
    setActiveCat(null)
    setConfirmDeleteCat(false)
  }

  if (linksLoading) return <div className="adm-tab"><p style={{ color: '#9b6fc7' }}>Loading…</p></div>

  return (
    <div className="adm-tab">
      <h2 className="adm-tab__heading">Useful Links</h2>
      <p className="adm-tab__sub">Manage the links displayed on the Useful Links page for residents.</p>
      <div className="adm-content-layout">
        {/* Sidebar */}
        <div className="adm-content-sidebar">
          {usefulLinks.map(c => (
            <button
              key={c.id}
              className={`adm-content-nav ${(cat && cat.id === c.id) ? 'adm-content-nav--active' : ''}`}
              onClick={() => { setActiveCat(c.id); setConfirmDeleteCat(false) }}
            >
              {c.icon} {c.title}
            </button>
          ))}
          <button className="adm-content-nav adm-content-nav--add" onClick={() => setShowNewCat(v => !v)}>
            + New Category
          </button>
          {showNewCat && (
            <div className="adm-new-cat-form">
              <input
                className="adm-input adm-input--sm"
                placeholder="Icon (emoji)"
                value={newIcon}
                onChange={e => setNewIcon(e.target.value)}
                style={{ width: 64 }}
              />
              <input
                className="adm-input adm-input--sm"
                placeholder="Category name *"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <input
                className="adm-input adm-input--sm"
                placeholder="Subtitle"
                value={newSubtitle}
                onChange={e => setNewSubtitle(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="adm-btn adm-btn--primary adm-btn--sm" onClick={handleAddCategory} disabled={!newTitle.trim()}>
                  Create
                </button>
                <button className="adm-btn adm-btn--sm" onClick={() => setShowNewCat(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links list */}
        <div className="adm-content-fields">
          {cat && (
            <>
              <div className="adm-contacts-header">
                <span className="adm-section-title">{cat.icon} {cat.title}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="adm-btn adm-btn--primary adm-btn--sm" onClick={() => addLink(cat.id)}>
                    + Add Link
                  </button>
                  {confirmDeleteCat ? (
                    <>
                      <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={handleDeleteCategory}>
                        Confirm Delete
                      </button>
                      <button className="adm-btn adm-btn--sm" onClick={() => setConfirmDeleteCat(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="adm-btn adm-btn--sm" onClick={() => setConfirmDeleteCat(true)}>
                      Delete Category
                    </button>
                  )}
                </div>
              </div>
              {cat.links.map(link => (
                <LinkEditCard
                  key={link.id}
                  link={link}
                  catId={cat.id}
                  onUpdate={updateLink}
                  onRemove={removeLink}
                />
              ))}
              {cat.links.length === 0 && (
                <p className="adm-empty">No links yet. Click "Add Link" to add one.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard Shell ─────────────────────────────────────────────
const TABS = ['Gallery', 'Content', 'Contacts', 'Links', 'Migrate']

export default function Admin() {
  const { isAuthenticated, authLoading, logout } = useAdmin()
  const [tab, setTab] = useState('Gallery')
  const navigate = useNavigate()

  if (authLoading) return (
    <div style={{ minHeight: '100vh', background: '#0d0820', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: 'rgba(184,150,212,0.5)' }}>Medina Villas</span>
    </div>
  )

  if (!isAuthenticated) return <LoginScreen />

  return (
    <div className="adm">
      {/* Topbar */}
      <div className="adm-topbar">
        <div className="adm-topbar__brand">
          <span className="adm-topbar__script">Medina Villas</span>
          <span className="adm-topbar__badge">Admin</span>
        </div>
        <div className="adm-topbar__right">
          <button className="adm-topbar__view" onClick={() => navigate('/')}>← View Site</button>
          <button className="adm-topbar__logout" onClick={logout}>Sign Out</button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="adm-tabnav">
        {TABS.map(t => (
          <button
            key={t}
            className={`adm-tabnav__btn ${tab === t ? 'adm-tabnav__btn--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="adm-body">
        {tab === 'Gallery' && <GalleryTab />}
        {tab === 'Content' && <ContentTab />}
        {tab === 'Contacts' && <ContactsTab />}
        {tab === 'Links' && <LinksTab />}
        {tab === 'Migrate' && <MigrateTab />}
      </div>

      <style>{`
        /* ── Base ── */
        .adm {
          min-height: 100vh;
          background: #0f0c1a;
          color: #e8e0f0;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
        }

        /* ── Login ── */
        .adm-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0c1a 0%, #1e1030 100%);
        }
        .adm-login__box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(155,111,199,0.2);
          border-radius: 8px;
          padding: 48px;
          width: 100%;
          max-width: 400px;
        }
        .adm-login__brand {
          text-align: center;
          margin-bottom: 36px;
        }
        .adm-login__script {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          color: #fefcf8;
          margin-bottom: 4px;
        }
        .adm-login__sub {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #9b6fc7;
        }
        .adm-login__form { display: flex; flex-direction: column; gap: 20px; }
        .adm-login__error {
          font-size: 13px;
          color: #e06060;
          text-align: center;
          margin: 0;
        }

        /* ── Topbar ── */
        .adm-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(155,111,199,0.15);
        }
        .adm-topbar__brand { display: flex; align-items: center; gap: 12px; }
        .adm-topbar__script {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #fefcf8;
        }
        .adm-topbar__badge {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: rgba(155,111,199,0.2);
          color: #b896d4;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid rgba(155,111,199,0.25);
        }
        .adm-topbar__right { display: flex; gap: 16px; align-items: center; }
        .adm-topbar__view, .adm-topbar__logout {
          background: none;
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .adm-topbar__view { color: rgba(232,224,240,0.5); }
        .adm-topbar__view:hover { color: #e8e0f0; }
        .adm-topbar__logout {
          color: #e8e0f0;
          border: 1px solid rgba(155,111,199,0.3);
          padding: 6px 16px;
          border-radius: 4px;
        }
        .adm-topbar__logout:hover { background: rgba(155,111,199,0.1); }

        /* ── Tab nav ── */
        .adm-tabnav {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(155,111,199,0.15);
          padding: 0 40px;
        }
        .adm-tabnav__btn {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 16px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(232,224,240,0.45);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          margin-bottom: -1px;
        }
        .adm-tabnav__btn:hover { color: #e8e0f0; }
        .adm-tabnav__btn--active {
          color: #b896d4;
          border-bottom-color: #9b6fc7;
        }

        /* ── Body ── */
        .adm-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 40px 80px;
        }
        .adm-tab__heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 400;
          color: #fefcf8;
          margin-bottom: 6px;
        }
        .adm-tab__sub {
          font-size: 13px;
          color: rgba(232,224,240,0.45);
          margin-bottom: 40px;
        }

        /* ── Shared form elements ── */
        .adm-field { display: flex; flex-direction: column; gap: 7px; }
        .adm-label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #9b6fc7;
        }
        .adm-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(155,111,199,0.2);
          border-radius: 4px;
          padding: 10px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #e8e0f0;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .adm-input:focus { border-color: #9b6fc7; }
        .adm-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

        .adm-btn {
          padding: 10px 24px;
          border-radius: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }
        .adm-btn--primary { background: #5b2d8e; color: #fefcf8; }
        .adm-btn--primary:hover { background: #6e38ab; }
        .adm-btn--primary:disabled { opacity: 0.4; cursor: default; }
        .adm-btn--ghost {
          background: transparent;
          color: rgba(232,224,240,0.5);
          border: 1px solid rgba(155,111,199,0.2);
        }
        .adm-btn--ghost:hover { color: #e8e0f0; }
        .adm-btn--save {
          background: #2b1459;
          color: #b896d4;
          border: 1px solid rgba(155,111,199,0.3);
          padding: 8px 20px;
          font-size: 10px;
          margin-top: 6px;
        }
        .adm-btn--save:hover:not(:disabled) { background: #3d1c7a; }
        .adm-btn--save-idle { opacity: 0.35; cursor: default; }
        .adm-btn--sm { padding: 7px 16px; }
        .adm-btn--danger { background: #8e2d2d; color: #fefcf8; }
        .adm-btn--danger:hover { background: #b03030; }

        .adm-btn-sm {
          padding: 5px 12px;
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          cursor: pointer;
          border: 1px solid rgba(155,111,199,0.2);
          background: rgba(255,255,255,0.05);
          color: #e8e0f0;
          transition: background 0.2s;
        }
        .adm-btn-sm:hover { background: rgba(255,255,255,0.1); }
        .adm-btn-sm--danger { background: rgba(200,60,60,0.2); border-color: rgba(200,60,60,0.4); color: #e88; }
        .adm-btn-sm--danger:hover { background: rgba(200,60,60,0.35); }
        .adm-btn-sm--danger-outline { border-color: rgba(200,60,60,0.3); color: rgba(232,100,100,0.7); background: none; }
        .adm-btn-sm--danger-outline:hover { background: rgba(200,60,60,0.15); }

        .adm-saved {
          font-size: 11px;
          color: #6dbf8a;
          letter-spacing: 1px;
        }
        .adm-empty {
          font-size: 14px;
          color: rgba(232,224,240,0.35);
          padding: 24px 0;
          font-style: italic;
        }
        .adm-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #fefcf8;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .adm-section-count {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          color: rgba(232,224,240,0.35);
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* ── Gallery ── */
        .adm-gallery-upload {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(155,111,199,0.15);
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 48px;
        }
        .adm-gallery-upload__row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          align-items: start;
        }
        .adm-gallery-upload__file-area {
          width: 200px;
          height: 150px;
          border: 2px dashed rgba(155,111,199,0.3);
          border-radius: 6px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s;
        }
        .adm-gallery-upload__file-area:hover { border-color: #9b6fc7; }
        .adm-gallery-upload__preview {
          width: 100%; height: 100%; object-fit: cover;
        }
        .adm-gallery-upload__placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(155,111,199,0.6); font-size: 13px; text-align: center; padding: 16px;
        }
        .adm-gallery-upload__icon { font-size: 28px; }
        .adm-gallery-upload__meta { display: flex; flex-direction: column; gap: 16px; }

        .adm-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
        .adm-gallery-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(155,111,199,0.15);
          border-radius: 6px;
          overflow: hidden;
        }
        .adm-gallery-card__img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .adm-gallery-card__footer {
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .adm-gallery-card__caption {
          font-size: 12px;
          color: rgba(232,224,240,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .adm-gallery-card__del {
          background: none;
          border: none;
          color: rgba(200,100,100,0.6);
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 0;
          padding: 2px 4px;
          transition: color 0.2s;
        }
        .adm-gallery-card__del:hover { color: #e06060; }
        .adm-gallery-card__confirm { display: flex; align-items: center; gap: 6px; font-size: 11px; }

        /* ── Content ── */
        .adm-content-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          align-items: start;
        }
        .adm-content-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(155,111,199,0.15);
          border-radius: 8px;
          padding: 8px;
        }
        .adm-content-nav {
          background: none;
          border: none;
          text-align: left;
          padding: 10px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: rgba(232,224,240,0.55);
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.15s, color 0.15s;
        }
        .adm-content-nav:hover { background: rgba(155,111,199,0.1); color: #e8e0f0; }
        .adm-content-nav--active { background: rgba(91,45,142,0.3); color: #b896d4; }
        .adm-content-nav--add { color: #9b6fc7; border-top: 1px solid rgba(155,111,199,0.15); margin-top: 4px; padding-top: 12px; }
        .adm-new-cat-form { display: flex; flex-direction: column; gap: 8px; padding: 12px 8px; border-top: 1px solid rgba(155,111,199,0.15); }
        .adm-input--sm { padding: 7px 10px; font-size: 13px; }
        .adm-content-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .adm-content-field {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(155,111,199,0.12);
          border-radius: 8px;
          padding: 24px;
        }
        .adm-content-field__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        /* ── Contacts ── */
        .adm-contacts-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .adm-contacts-header .adm-section-title { margin-bottom: 0; }
        .adm-contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(155,111,199,0.12);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 12px;
        }
        .adm-contact-card__row {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .adm-contact-card__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 2px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .adm-body { padding: 32px 20px 60px; }
          .adm-topbar { padding: 0 20px; }
          .adm-tabnav { padding: 0 20px; }
          .adm-content-layout { grid-template-columns: 1fr; }
          .adm-content-sidebar { flex-direction: row; flex-wrap: wrap; }
          .adm-gallery-upload__row { grid-template-columns: 1fr; }
          .adm-contact-card__row { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
