import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../redux/slices/cartSlice";

const DetailContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(92, 64, 51, 0.08);
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--glass-border-hover);
    box-shadow: 0 15px 35px rgba(197, 155, 39, 0.12);
  }
`;

const DetailPlaceholderContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 30px rgba(92, 64, 51, 0.08);
  text-align: center;
  color: var(--text-muted);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CaloriesBadge = styled.div`
  background: rgba(92, 64, 51, 0.04);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(197, 155, 39, 0.1);
    transform: translateY(-2px);
  }
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.8rem;
  background: rgba(92, 64, 51, 0.03);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  list-style-type: none;

  &:hover {
    background: rgba(197, 155, 39, 0.08);
    transform: translateX(3px);
  }
`;

const OrderButton = styled.button`
  width: 100%;
  background: ${(props) => (props.$inCart ? "#28a745" : "var(--accent-coffee)")};
  color: #fff;
  border: none;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px
    ${(props) => (props.$inCart ? "rgba(40, 167, 69, 0.2)" : "rgba(92, 64, 51, 0.2)")};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$inCart ? "#218838" : "var(--accent-gold)")};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px
      ${(props) => (props.$inCart ? "rgba(40, 167, 69, 0.3)" : "rgba(197, 155, 39, 0.3)")};
  }
`;

export default function ItemDetail({ item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const existingCartItem = item ? cartItems.find((i) => i.id === item.id) : null;
  const inCartCount = existingCartItem ? existingCartItem.quantity : 0;

  const handleAddToCart = () => {
    if (item) {
      dispatch(addToCart(item));
    }
  };

  return item ? (
    <DetailContainer id="detail-panel">
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
        <CaloriesBadge>
          <div className="spec-lbl">Est. Calories</div>
          <div className="spec-val">{item.calories} kcal</div>
        </CaloriesBadge>
        <CaloriesBadge>
          <div className="spec-lbl">Serve Temp</div>
          <div className="spec-val">{item.category === "cold" ? "Chilled (4°C)" : "Steamed (70°C)"}</div>
        </CaloriesBadge>
      </div>

      <div className="detail-ingredients">
        <h4 className="ingredients-title">Ingredients Used</h4>
        <ul className="ingredients-list" style={{ paddingLeft: "0" }}>
          {item.ingredients.map((ing, index) => (
            <IngredientItem key={index}>
              <span className="ingredient-bullet">☕</span>
              <span>{ing}</span>
            </IngredientItem>
          ))}
        </ul>
      </div>

      <div className="order-container">
        <OrderButton
          $inCart={inCartCount > 0}
          onClick={handleAddToCart}
          id="order-btn"
        >
          {inCartCount > 0 ? `+ Add More to Cart (${inCartCount} added)` : "🛒 Add to Shopping Cart"}
        </OrderButton>

        {inCartCount > 0 && (
          <div className="order-success-banner mt-2" id="order-success-banner">
            <span className="success-icon">🎉</span>
            <div>
              <strong>In Shopping Cart!</strong> {inCartCount} × {item.name} added.
            </div>
          </div>
        )}
      </div>
    </DetailContainer>
  ) : (
    <DetailPlaceholderContainer id="detail-panel-empty">
      <div className="detail-placeholder">
        <div className="placeholder-icon">☕</div>
        <h3>Select an Item</h3>
        <p>Pick any delicious coffee or pastry from the menu on the left to see its price, calorie count, and ingredients details.</p>
      </div>
    </DetailPlaceholderContainer>
  );
}
