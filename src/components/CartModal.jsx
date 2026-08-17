import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";

export default function CartModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      dispatch(clearCart());
      setOrderPlaced(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="modal-overlay d-flex justify-content-center align-items-center"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content border-0 p-4 shadow-lg rounded-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "520px",
          width: "90%",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Header */}
        <div className="modal-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">🛒</span>
            <h3 className="modal-title h5 mb-0 fw-bold" style={{ color: "var(--accent-coffee)" }}>
              Shopping Cart ({totalQuantity})
            </h3>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            id="close-cart-modal-btn"
            aria-label="Close"
          ></button>
        </div>

        {/* Order Placed Success Banner */}
        {orderPlaced ? (
          <div className="text-center py-4">
            <div className="display-4 mb-2">🎉</div>
            <h4 className="fw-bold text-success">Order Placed Successfully!</h4>
            <p className="small text-secondary mb-0">Your coffee and pastries are being prepared fresh.</p>
          </div>
        ) : cartItems.length > 0 ? (
          <div>
            {/* Items List */}
            <div className="order-list overflow-auto pe-1" style={{ maxHeight: "320px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center p-3 mb-2 rounded-3"
                  style={{
                    background: "rgba(92, 64, 51, 0.03)",
                    border: "1px solid var(--glass-border)",
                  }}
                  id={`cart-item-${item.id}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-3">{item.emoji}</span>
                    <div>
                      <h6 className="mb-0 fw-bold" style={{ color: "var(--text-primary)" }}>
                        {item.name}
                      </h6>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="badge bg-secondary text-uppercase" style={{ fontSize: "0.6rem" }}>
                          {item.category}
                        </span>
                        <span className="small fw-semibold text-success">${item.priceNumber.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls and Remove */}
                  <div className="d-flex align-items-center gap-2">
                    <div className="btn-group btn-group-sm border rounded-pill overflow-hidden">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-2 py-0"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 py-0 fw-bold d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-2 py-0"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm text-danger p-0 ms-1"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      title="Remove from cart"
                      style={{ fontSize: "1.2rem", lineHeight: "1" }}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Actions */}
            <div className="mt-3 pt-3 border-top">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-secondary">Total Amount:</span>
                <span className="fw-bold text-success fs-4">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-pill px-3"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className="btn btn-warning text-white flex-grow-1 rounded-pill fw-bold shadow-sm"
                  style={{ background: "var(--accent-coffee)", borderColor: "var(--accent-coffee)" }}
                  onClick={handleCheckout}
                >
                  Checkout & Place Order (${totalAmount.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4" id="cart-empty-state">
            <div className="fs-1 mb-2">☕</div>
            <h6 className="fw-bold text-secondary">Your Cart is Empty</h6>
            <p className="small text-muted mb-0">Browse our delicious coffee menu and add items to your cart!</p>
          </div>
        )}
      </div>
    </div>
  );
}
