import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-container py-5 mt-5 border-top" style={{ color: "var(--text-secondary)" }}>
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ fontSize: "1.6rem" }}>☕</span>
            <h4 className="mb-0 fw-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
              Coffeely Cafe
            </h4>
          </div>
          <p className="small text-muted mb-3" style={{ lineHeight: "1.6" }}>
            Ethically sourced beans, hand-crafted espresso, artisanal pastries, and warm moments delivered daily.
          </p>
          <div className="d-flex gap-2">
            <span className="badge bg-warning text-dark px-2 py-1">Est. 2026</span>
            <span className="badge bg-secondary text-light px-2 py-1">Organic Beans</span>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <h6 className="fw-bold text-dark mb-3" style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
            Quick Links
          </h6>
          <ul className="list-unstyled d-flex flex-column gap-2 small">
            <li>
              <Link to="/" className="text-decoration-none text-secondary">
                ☕ Menu & Specials
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-decoration-none text-secondary">
                📖 Our Story & Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-decoration-none text-secondary">
                ✉️ Contact & Feedback
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-decoration-none text-secondary">
                ⭐ VIP Membership
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-6 col-md-4">
          <h6 className="fw-bold text-dark mb-3" style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
            Visit Us
          </h6>
          <p className="small mb-1">📍 101 Madison Avenue, Downtown</p>
          <p className="small mb-1">⏰ Open Daily: 7:00 AM – 8:00 PM</p>
          <p className="small mb-1">📞 +1 (555) 349-2633</p>
          <p className="small text-muted">✉️ hello@coffeelycafe.com</p>
        </div>
      </div>

      <div className="text-center pt-3 border-top" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
        <p className="mb-1">© 2026 Coffeely Cafe House. All rights reserved. For assignment grading purposes.</p>
        <p className="mb-0">
          ReactJS Assignment 3 • React Router DOM • Multi-Page Navigation • Controlled Forms & Validation • 404 Route
        </p>
      </div>
    </footer>
  );
}
