import { useState } from 'react'
import { useAdmin, useContent } from '../context/AdminContext'

/**
 * Renders text normally for visitors.
 * When admin is logged in, shows a pencil button on hover.
 * Clicking it opens an inline editor — save writes to context immediately.
 *
 * Props:
 *   contentKey  — key in AdminContext content store
 *   tag         — HTML element to render (default 'p')
 *   className   — forwarded to the element
 *   multiline   — use textarea instead of input (default true)
 *   style       — forwarded to the element
 *   children    — optional override (ignored in edit mode)
 */
export default function EditableText({ contentKey, tag: Tag = 'p', className = '', multiline = true, style = {}, children }) {
  const { isAuthenticated, updateContent } = useAdmin()
  const stored = useContent(contentKey)
  const value = stored || ''

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateContent(contentKey, draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (!isAuthenticated) {
    return <Tag className={className} style={style}>{children ?? value}</Tag>
  }

  if (editing) {
    return (
      <div className="et-edit-wrap" style={{ position: 'relative', width: '100%' }}>
        {multiline
          ? <textarea
              className="et-textarea"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              autoFocus
              rows={Math.max(3, draft.split('\n').length + 1)}
            />
          : <input
              className="et-input"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              autoFocus
            />
        }
        <div className="et-actions">
          <button className="et-btn et-btn--save" onClick={handleSave}>Save</button>
          <button className="et-btn et-btn--cancel" onClick={handleCancel}>Cancel</button>
        </div>
        <style>{STYLES}</style>
      </div>
    )
  }

  return (
    <div className={`et-wrap ${saved ? 'et-wrap--saved' : ''}`} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <Tag className={className} style={style}>{children ?? value}</Tag>
      <button
        className="et-trigger"
        onClick={() => { setDraft(value); setEditing(true) }}
        title="Edit this text"
      >
        <PencilIcon />
        Edit
      </button>
      {saved && <span className="et-saved-badge">✓ Saved</span>}
      <style>{STYLES}</style>
    </div>
  )
}

function PencilIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const STYLES = `
  .et-wrap {
    position: relative;
  }
  .et-wrap:hover .et-trigger {
    opacity: 1;
    pointer-events: auto;
  }
  .et-trigger {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    background: #5b2d8e;
    color: #fefcf8;
    border: none;
    border-radius: 20px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, background 0.2s;
    z-index: 10;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(43,20,89,0.3);
  }
  .et-trigger:hover { background: #7a3db8; }

  .et-edit-wrap {
    margin: 4px 0;
  }
  .et-textarea, .et-input {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: #1e1a24;
    background: #fff;
    border: 2px solid #9b6fc7;
    border-radius: 4px;
    padding: 10px 12px;
    outline: none;
    resize: vertical;
    box-shadow: 0 0 0 4px rgba(155,111,199,0.12);
    box-sizing: border-box;
  }
  .et-textarea { min-height: 80px; }
  .et-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  .et-btn {
    padding: 7px 20px;
    border-radius: 3px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    border: none;
  }
  .et-btn--save { background: #5b2d8e; color: #fefcf8; }
  .et-btn--save:hover { background: #7a3db8; }
  .et-btn--cancel { background: transparent; color: #9b6fc7; border: 1px solid rgba(155,111,199,0.3); }
  .et-btn--cancel:hover { background: rgba(155,111,199,0.08); }

  .et-saved-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    font-size: 11px;
    color: #4caf6e;
    background: #f0faf4;
    border: 1px solid #a8d5b5;
    border-radius: 20px;
    padding: 3px 10px;
    letter-spacing: 1px;
    pointer-events: none;
  }

  .et-wrap--saved {
    outline: 1px solid rgba(76,175,110,0.3);
    border-radius: 2px;
  }
`
