import React from "react";

export default function MenuItemCard({ item, isSelected, onClick }) {
  return (
    <div 
      className={`menu-card ${isSelected ? "selected" : ""}`} 
      onClick={() => onClick(item)}
      id={`menu-card-${item.id}`}
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
