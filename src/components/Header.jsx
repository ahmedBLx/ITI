import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header({ orderedCount, onOrdersClick }) {
  return (
    <header className="header d-flex flex-wrap justify-content-between align-items-center mb-4" id="header">
      <Link to="/" className="header-logo text-decoration-none" style={{ color: "var(--accent-coffee)" }}>
        <span>☕</span> Coffeely Cafe
      </Link>
      
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

        <button 
          type="button"
          className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 fw-bold d-flex align-items-center gap-1"
          onClick={onOrdersClick}
          id="nav-orders-btn"
          style={{ borderColor: "var(--accent-gold)", color: "var(--accent-coffee)" }}
        >
          <span>📋</span> Ticket {orderedCount > 0 && `(${orderedCount})`}
        </button>
      </nav>

      {/* Dynamic Order Badge */}
      {orderedCount > 0 && (
        <div 
          className="header-badge" 
          id="order-badge" 
          style={{ cursor: "pointer" }}
          onClick={onOrdersClick}
        >
          {orderedCount} {orderedCount === 1 ? "Item Ordered" : "Items Ordered"}
        </div>
      )}
    </header>
  );
}
