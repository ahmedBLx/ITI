import React from "react";

export default function ItemDetail({ item, isOrdered, onOrder }) {
  // Ternary Operator: Render either item details or a select prompt placeholder
  return item ? (
    <div className="detail-panel" id="detail-panel">
      <div className="detail-header">
        <div>
          <h2 className="detail-name">{item.name}</h2>
          <span className="detail-tag">{item.category.toUpperCase()}</span>
        </div>
        <div className="detail-price-box">
          <div className="price-label">Price</div>
          <div className="price-val" id="detail-price">{item.price}</div>
        </div>
      </div>

      <p className="detail-desc">{item.description}</p>

      <div className="specs-grid">
        <div className="spec-item">
          <div className="spec-lbl">Est. Calories</div>
          <div className="spec-val">{item.calories} kcal</div>
        </div>
        <div className="spec-item">
          <div className="spec-lbl">Serve Temp</div>
          <div className="spec-val">{item.category === "cold" ? "Chilled (4°C)" : "Steamed (70°C)"}</div>
        </div>
      </div>

      <div className="detail-ingredients">
        <h4 className="ingredients-title">Ingredients Used</h4>
        <ul className="ingredients-list">
          {/* Mapping over ingredients list */}
          {item.ingredients.map((ing, index) => (
            <li key={index} className="ingredient-item">
              <span className="ingredient-bullet">☕</span>
              <span>{ing}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-container">
        {/* Ternary Operator: Conditionally toggle button label and styles based on order status */}
        <button 
          className={`order-btn ${isOrdered ? "ordered" : ""}`}
          onClick={() => !isOrdered && onOrder(item.id)}
          disabled={isOrdered}
          id="order-btn"
        >
          {isOrdered ? "✓ Added to Order" : "Add to Order"}
        </button>

        {/* && operator: Display success message banner when isOrdered is true */}
        {isOrdered && (
          <div className="order-success-banner" id="order-success-banner">
            <span className="success-icon">🎉</span>
            <div>
              <strong>Order Confirmed!</strong> {item.name} was successfully added to your ticket.
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="detail-panel" id="detail-panel-empty">
      <div className="detail-placeholder">
        <div className="placeholder-icon">☕</div>
        <h3>Select an Item</h3>
        <p>Pick any delicious coffee or pastry from the menu on the left to see its price, calorie count, and ingredients details.</p>
      </div>
    </div>
  );
}
