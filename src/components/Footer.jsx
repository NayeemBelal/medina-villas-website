import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__script">Medina Villas</span>
          <p className="footer__tagline">A Community of Distinction</p>
        </div>

        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/bylaws">Bylaws</Link>
          <Link to="/contacts">Handyman Contacts</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Medina Villas HOA. All rights reserved.
        </p>
      </div>

      <style>{`
        .footer {
          background: var(--purple-deep);
          padding: 64px 60px 40px;
          margin-top: auto;
        }
        .footer__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(155, 111, 199, 0.2);
        }
        .footer__brand { text-align: left; }
        .footer__script {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--white);
          display: block;
          margin-bottom: 6px;
        }
        .footer__tagline {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--purple-pale);
          opacity: 0.7;
        }
        .footer__nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }
        .footer__nav a {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(254, 252, 248, 0.6);
          transition: color 0.2s;
        }
        .footer__nav a:hover { color: var(--white); }
        .footer__copy {
          text-align: right;
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(254, 252, 248, 0.35);
        }
        @media (max-width: 768px) {
          .footer { padding: 48px 24px 32px; }
          .footer__inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer__brand, .footer__copy { text-align: center; }
          .footer__nav { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 16px 24px; }
        }
      `}</style>
    </footer>
  )
}
