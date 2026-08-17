import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../redux/slices/cartSlice";

export default function MenuItemCard({ item, isSelected, onClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.id === item.id);
  const inCartCount = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  return (
    <div
      className={`menu-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(item)}
      id={`menu-card-${item.id}`}
      style={{
        border: isSelected ? "2.5px solid var(--accent-gold)" : "1px solid var(--glass-border)",
        boxShadow: isSelected ? "0 8px 24px rgba(197, 155, 39, 0.15)" : "0 4px 12px rgba(0,0,0,0.02)",
        transform: isSelected ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Bestseller badge */}
      {item.isBestseller && (
        <span className="bestseller-badge" id={`bestseller-badge-${item.id}`}>
          ★ Bestseller
        </span>
      )}

      {/* Cart quantity indicator badge */}
      {inCartCount > 0 && (
        <span
          className="badge bg-success position-absolute top-0 end-0 m-2 rounded-pill px-2 py-1"
          style={{ fontSize: "0.75rem", zIndex: 2 }}
        >
          {inCartCount} in cart
        </span>
      )}

      <div className="card-emoji-container">
        <span className="card-emoji">{item.emoji}</span>
      </div>

      <h3 className="card-title">{item.name}</h3>
      <p className="card-desc-short">{item.description.slice(0, 50)}...</p>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <div>
          <span className="card-price">{item.price}</span>
          <span className="card-category-lbl ms-2">{item.category}</span>
        </div>

        {/* Quick Add to Redux Cart button */}
        <button
          type="button"
          className="btn btn-sm btn-outline-warning rounded-circle p-0 d-flex align-items-center justify-content-center"
          style={{ width: "30px", height: "30px", fontSize: "1rem" }}
          onClick={handleQuickAdd}
          title="Quick add to cart"
        >
          +
        </button>
      </div>
    </div>
  );
}
