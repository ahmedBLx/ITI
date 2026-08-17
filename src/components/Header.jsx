import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../redux/slices/cartSlice";
import { useTheme } from "../context/useTheme";

export default function Header({ onOpenCart }) {
  // 1. Context API: Consume global theme state and toggle function
  const { isDark, toggleTheme } = useTheme();

  // 2. Redux: Consume global cart total quantity
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="header d-flex flex-wrap justify-content-between align-items-center mb-4 p-3 rounded-4 shadow-sm" id="header">
      {/* Brand / Logo */}
      <Link to="/" className="header-logo text-decoration-none d-flex align-items-center gap-2" style={{ color: "var(--accent-coffee)" }}>
        <span style={{ fontSize: "1.8rem" }}>☕</span>
        <span className="fw-bold" style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
          Coffeely Cafe
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="header-nav d-flex align-items-center gap-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Contact
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Register
        </NavLink>
      </nav>

      {/* Action Buttons: Theme Toggle (Context) & Shopping Cart (Redux) */}
      <div className="d-flex align-items-center gap-2">
        {/* Context API Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1"
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          id="theme-toggle-btn"
        >
          <span>{isDark ? "☀️ Light" : "🌙 Dark"}</span>
        </button>

        {/* Redux Shopping Cart Button */}
        <button
          type="button"
          className="btn btn-sm btn-warning text-white rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-2 shadow-sm"
          onClick={onOpenCart}
          id="nav-cart-btn"
          style={{ background: "var(--accent-coffee)", borderColor: "var(--accent-coffee)" }}
        >
          <span>🛒 Cart</span>
          <span className="badge bg-light text-dark rounded-pill px-2" style={{ fontSize: "0.75rem" }}>
            {totalQuantity}
          </span>
        </button>
      </div>
    </header>
  );
}
