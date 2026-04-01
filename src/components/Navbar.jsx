import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Bylaws', path: '/bylaws' },
  {
    label: 'Services',
    dropdown: [
      { label: 'Handyman Contacts', path: '/contacts' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__brand-script">Medina Villas</span>
        <span className="navbar__brand-sub">Homeowners Association</span>
      </NavLink>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {NAV_LINKS.map((item) =>
          item.dropdown ? (
            <li key={item.label} className="navbar__item navbar__item--dropdown" ref={dropdownRef}>
              <button
                className={`navbar__link navbar__dropdown-trigger ${dropdownOpen ? 'active' : ''}`}
                onClick={() => setDropdownOpen((p) => !p)}
                aria-expanded={dropdownOpen}
              >
                {item.label}
                <svg className="navbar__chevron" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="navbar__dropdown">
                  {item.dropdown.map((sub) => (
                    <li key={sub.path}>
                      <NavLink to={sub.path} className="navbar__dropdown-link">
                        {sub.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.path} className="navbar__item">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          )
        )}
      </ul>

      <button
        className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          height: 80px;
          transition: background 0.4s ease, box-shadow 0.4s ease, height 0.3s ease;
          background: transparent;
        }
        .navbar--scrolled {
          background: rgba(10, 8, 20, 0.92);
          backdrop-filter: blur(14px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.3);
          height: 68px;
        }
        .navbar__brand {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
        }
        .navbar__brand-script {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 400;
          color: #FEFCF8;
          letter-spacing: 0.5px;
        }
        .navbar__brand-sub {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #B896D4;
          margin-top: 2px;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }
        .navbar__item { position: relative; }
        .navbar__link {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(254, 252, 248, 0.8);
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 100%;
          height: 1px;
          background: #9B6FC7;
          transition: right 0.3s ease;
        }
        .navbar__link:hover::after,
        .navbar__link--active::after,
        .navbar__link.active::after { right: 0; }
        .navbar__link:hover,
        .navbar__link--active,
        .navbar__link.active { color: #FEFCF8; }
        .navbar__chevron {
          width: 10px; height: 6px;
          transition: transform 0.2s;
        }
        .navbar__dropdown-trigger[aria-expanded="true"] .navbar__chevron {
          transform: rotate(180deg);
        }
        .navbar__dropdown {
          position: absolute;
          top: calc(100% + 16px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 10, 40, 0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(155, 111, 199, 0.25);
          border-radius: 4px;
          padding: 8px 0;
          min-width: 200px;
          list-style: none;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          animation: fadeIn 0.2s ease;
        }
        .navbar__dropdown-link {
          display: block;
          padding: 12px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(254, 252, 248, 0.75);
          transition: color 0.2s, background 0.2s;
        }
        .navbar__dropdown-link:hover {
          color: #FEFCF8;
          background: rgba(155, 111, 199, 0.15);
        }
        .navbar__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
        }
        .navbar__burger span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: #FEFCF8;
          transition: transform 0.3s, opacity 0.3s;
        }
        .navbar__burger--open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .navbar__burger--open span:nth-child(2) { opacity: 0; }
        .navbar__burger--open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        @media (max-width: 768px) {
          .navbar { padding: 0 24px; }
          .navbar__burger { display: flex; }
          .navbar__links {
            position: fixed;
            top: 68px; left: 0; right: 0; bottom: 0;
            background: rgba(10, 5, 25, 0.97);
            flex-direction: column;
            justify-content: center;
            gap: 40px;
            transform: translateX(100%);
            transition: transform 0.35s ease;
          }
          .navbar__links--open { transform: translateX(0); }
          .navbar__link { font-size: 14px; letter-spacing: 3px; }
          .navbar__dropdown {
            position: static;
            transform: none;
            background: rgba(155, 111, 199, 0.1);
            border: none;
            padding: 8px 0;
            margin-top: 12px;
            box-shadow: none;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  )
}
