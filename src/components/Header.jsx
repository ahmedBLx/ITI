import React from "react";

export default function Header({ orderedCount, onOrdersClick }) {
  return (
    <header className="header" id="header">
      <div className="header-logo">
        <span>☕</span> Coffeely Cafe
      </div>
      <nav className="header-nav">
        <a href="#menu" className="nav-link active">Menu</a>
        <a 
          href="#orders" 
          className="nav-link" 
          onClick={(e) => {
            e.preventDefault();
            onOrdersClick();
          }}
          id="nav-orders-link"
        >
          Orders {orderedCount > 0 && `(${orderedCount})`}
        </a>
        <a href="#about" className="nav-link">About Us</a>
      </nav>
      {/* && operator: Only display order badge if orderedCount is greater than 0 */}
      {orderedCount > 0 && (
        <div 
          className="header-badge" 
          id="order-badge" 
          style={{ cursor: "pointer" }}
          onClick={onOrdersClick}
        >
          {/* Ternary Operator: Correct pluralization based on ordered count */}
          Orders: {orderedCount} {orderedCount === 1 ? "Item" : "Items"}
        </div>
      )}
    </header>
  );
}
