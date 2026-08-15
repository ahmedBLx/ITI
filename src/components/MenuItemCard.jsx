import React from "react";

export default function MenuItemCard({ item, isSelected, onClick }) {
  return (
    <div 
      className={`menu-card ${isSelected ? "selected" : ""}`} 
      onClick={() => onClick(item)}
      id={`menu-card-${item.id}`}
      style={{
        border: isSelected ? "2.5px solid var(--accent-gold)" : "1px solid var(--glass-border)",
        boxShadow: isSelected ? "0 8px 24px rgba(197, 155, 39, 0.15)" : "0 4px 12px rgba(0,0,0,0.02)",
        transform: isSelected ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
      }}
    >
      {/* && operator: Only show bestseller badge if isBestseller is true */}
      {item.isBestseller && (
        <span className="bestseller-badge" id={`bestseller-badge-${item.id}`}>
          ★ Bestseller
        </span>
      )}
      
      <div className="card-emoji-container">
        <span className="card-emoji">{item.emoji}</span>
      </div>
      
      <h3 className="card-title">{item.name}</h3>
      <p className="card-desc-short">{item.description.slice(0, 50)}...</p>
      
      <div className="card-footer">
        <span className="card-price">{item.price}</span>
        <span className="card-category-lbl">{item.category}</span>
      </div>
    </div>
  );
}
