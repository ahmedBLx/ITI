import React, { useState } from "react";
import { menuItems } from "./data/menu";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuItemCard from "./components/MenuItemCard";
import ItemDetail from "./components/ItemDetail";

export default function App() {
  // State for active menu category: 'all', 'hot', 'cold', 'pastry'
  const [filter, setFilter] = useState("all");
  
  // State for currently selected menu item (default to Classic Espresso)
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  
  // State for tracking ordered items: Array of { id, time }
  const [orders, setOrders] = useState([]);

  // State to control modal display
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Handler for adding items to the current ticket with current timestamp
  const handleAddToOrder = (id) => {
    if (!orders.some(o => o.id === id)) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setOrders([...orders, { id, time: timeString }]);
    }
  };

  // Filter items based on active category tab
  const filteredItems = menuItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  const filterOptions = ["all", "hot", "cold", "pastry"];

  return (
    <div className="app-container">
      {/* Reusable Header: Passes total ordered count and modal open toggle as props */}
      <Header 
        orderedCount={orders.length} 
        onOrdersClick={() => setIsOrdersModalOpen(true)}
      />
      
      {/* Reusable Hero segment */}
      <Hero />
      
      {/* Main Menu Section */}
      <section className="main-section" id="menu">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Our Delicious Menu
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Select a category to filter drinks and bakery goodies, then click to view ingredients and details.
          </p>
        </div>

        {/* Filter Navigation list using map */}
        <div className="filters">
          {filterOptions.map((option) => (
            <button
              key={option}
              /* Ternary Operator: Highlight the button if it is the current active filter option */
              className={`tab-button ${filter === option ? "active" : ""}`}
              onClick={() => setFilter(option)}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="portal-layout" style={{ marginTop: "1.5rem" }}>
          {/* List of cards */}
          <div className="explorer-panel">
            <div className="destinations-grid">
              {/* Mapping filtered menu items to MenuItemCards */}
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  /* Ternary Operator: Check if this item is selected */
                  isSelected={selectedItem?.id === item.id}
                  onClick={setSelectedItem}
                />
              ))}
            </div>
          </div>

          {/* Item details card */}
          <ItemDetail
            item={selectedItem}
            isOrdered={selectedItem ? orders.some(o => o.id === selectedItem.id) : false}
            onOrder={handleAddToOrder}
          />
        </div>
      </section>

      {/* About Us section */}
      <section className="about-section" id="about">
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginBottom: "1rem" }}>
          Visit Coffeely Cafe
        </h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
          Open Daily from 7:00 AM to 8:00 PM. Found in downtown Madison Avenue, Suite 101. 
          All our coffee beans are ethically sourced, 100% organic, and locally roasted.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Coffeely Cafe House. All rights reserved. For assignment grading purposes.</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Made with ReactJS • Reusable Components • Props • Ternary • && • Array Map
        </p>
      </footer>

      {/* && operator: Show orders modal overlay if isOrdersModalOpen is true */}
      {isOrdersModalOpen && (
        <div className="modal-overlay" onClick={() => setIsOrdersModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title"><span>📋</span> Order Ticket</h3>
              <button 
                className="close-modal-btn" 
                onClick={() => setIsOrdersModalOpen(false)}
                id="close-modal-btn"
              >
                &times;
              </button>
            </div>

            {/* Ternary Operator: Show list of orders if count > 0, else show empty message */}
            {orders.length > 0 ? (
              <div className="order-list">
                {orders.map((order, index) => {
                  const menuItem = menuItems.find((item) => item.id === order.id);
                  if (!menuItem) return null;
                  
                  return (
                    <div key={index} className="order-item-row" id={`order-item-${order.id}`}>
                      <div className="order-item-info">
                        <span className="order-item-emoji">{menuItem.emoji}</span>
                        <div className="order-item-details">
                          <h4>{menuItem.name}</h4>
                          <span>{menuItem.category.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="order-item-price-time">
                        <span className="order-item-price">{menuItem.price}</span>
                        <span className="order-item-time">{order.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="modal-empty" id="modal-empty-state">
                <div className="modal-empty-icon">☕</div>
                <p>Your order is empty. Browse our menu and click "Add to Order" to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
