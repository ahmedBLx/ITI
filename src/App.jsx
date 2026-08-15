import React, { useState, useEffect } from "react";
import { menuItems } from "./data/menu";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuItemCard from "./components/MenuItemCard";
import ItemDetail from "./components/ItemDetail";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  // State for active menu category: 'all', 'hot', 'cold', 'pastry'
  const [filter, setFilter] = useState("all");
  
  // State for currently selected menu item (default to Classic Espresso)
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  
  // Custom Hook: Persist ordered items in localStorage
  const [orders, setOrders] = useLocalStorage("coffeely_orders", []);

  // State to control modal display
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // State to simulate initial page loading (Bootstrap spinner)
  const [isLoading, setIsLoading] = useState(true);

  // useEffect Hook 1: Simulate fetching menu data on mount
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(delayTimer);
  }, []);

  // useEffect Hook 2: Dynamic Document Title update based on orders count
  useEffect(() => {
    if (orders.length > 0) {
      document.title = `Coffeely Cafe (${orders.length} ${orders.length === 1 ? "Item" : "Items"})`;
    } else {
      document.title = "Coffeely Cafe House";
    }
  }, [orders]);

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

  // Loading Screen: Bootstrap Spinner rendering
  if (isLoading) {
    return (
      <div 
        className="d-flex flex-column justify-content-center align-items-center" 
        style={{ minHeight: "100vh", background: "var(--bg-deep)", color: "var(--accent-coffee)" }}
      >
        <div className="spinner-border text-warning" role="status" style={{ width: "3.5rem", height: "3.5rem" }}>
          <span className="visually-hidden">Loading Coffeely...</span>
        </div>
        <h3 className="mt-3 text-secondary" style={{ fontFamily: "var(--font-heading)", fontWeight: "600" }}>
          Brewing deliciousness...
        </h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Reusable Header: Passes total ordered count and modal open toggle as props */}
      <Header 
        orderedCount={orders.length} 
        onOrdersClick={() => setIsOrdersModalOpen(true)}
      />
      
      {/* Reusable Hero segment styled using CSS Modules */}
      <Hero />
      
      {/* Main Menu Section using Bootstrap Grid */}
      <section className="py-5" id="menu">
        {/* Inline style for margin block */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "0.5rem" }}>
            Our Delicious Menu
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Select a category to filter drinks and bakery goodies, then click to view ingredients and details.
          </p>
        </div>

        {/* Filter Navigation using Bootstrap classes & inline style */}
        <div className="filters d-flex gap-2 flex-wrap mb-4" style={{ padding: "0.25rem" }}>
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`btn btn-sm px-4 py-2 rounded-pill fw-semibold ${
                filter === option ? "btn-warning text-white shadow-sm" : "btn-outline-secondary"
              }`}
              onClick={() => setFilter(option)}
              style={{ textTransform: "uppercase", fontSize: "0.8rem", transition: "all 0.3s ease" }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Bootstrap Responsive Grid row */}
        <div className="row g-4" style={{ marginTop: "1rem" }}>
          
          {/* List of cards (Columns 12 on mobile, 7 on large desktop) */}
          <div className="col-12 col-lg-7">
            {/* Inner responsive grid for Menu Cards */}
            <div className="row row-cols-1 row-cols-sm-2 g-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="col">
                  <MenuItemCard
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    onClick={setSelectedItem}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Item details card (Columns 12 on mobile, 5 on large desktop) */}
          <div className="col-12 col-lg-5">
            <ItemDetail
              item={selectedItem}
              isOrdered={selectedItem ? orders.some(o => o.id === selectedItem.id) : false}
              onOrder={handleAddToOrder}
            />
          </div>
        </div>
      </section>

      {/* About Us section styled with Bootstrap layout classes */}
      <section 
        className="about-section text-center my-5 p-4 rounded-4" 
        id="about" 
        style={{ background: "rgba(92, 64, 51, 0.04)", border: "1px solid var(--glass-border)" }}
      >
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "1rem" }}>
          Visit Coffeely Cafe
        </h2>
        <p className="mx-auto text-secondary" style={{ maxWidth: "600px" }}>
          Open Daily from 7:00 AM to 8:00 PM. Found in downtown Madison Avenue, Suite 101. 
          All our coffee beans are ethically sourced, 100% organic, and locally roasted.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 mt-5 border-top" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
        <p>© 2026 Coffeely Cafe House. All rights reserved. For assignment grading purposes.</p>
        <p className="mb-0 text-muted" style={{ fontSize: "0.75rem" }}>
          Made with ReactJS • Hooks & Custom Hook • Inline Styling • CSS Stylesheets • CSS Modules • Styled Components • Bootstrap
        </p>
      </footer>

      {/* Orders Ticket Modal Overlay */}
      {isOrdersModalOpen && (
        <div className="modal-overlay d-flex justify-content-center align-items-center" onClick={() => setIsOrdersModalOpen(false)}>
          <div className="modal-content border-0 p-4 shadow-lg rounded-4" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px", width: "90%" }}>
            <div className="modal-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h3 className="modal-title h5 mb-0 text-dark fw-bold"><span className="me-2">📋</span> Order Ticket</h3>
              <button 
                className="btn-close" 
                onClick={() => setIsOrdersModalOpen(false)}
                id="close-modal-btn"
                aria-label="Close"
              ></button>
            </div>

            {/* If orders exist, map and show rows with calculations */}
            {orders.length > 0 ? (
              <div>
                <div className="order-list overflow-auto" style={{ maxHeight: "300px" }}>
                  {orders.map((order, index) => {
                    const menuItem = menuItems.find((item) => item.id === order.id);
                    if (!menuItem) return null;
                    
                    return (
                      <div 
                        key={index} 
                        className="order-item-row d-flex justify-content-between align-items-center p-3 mb-2 rounded-3" 
                        style={{ background: "rgba(92, 64, 51, 0.03)", border: "1px solid rgba(92, 64, 51, 0.05)" }}
                        id={`order-item-${order.id}`}
                      >
                        <div className="order-item-info d-flex align-items-center gap-3">
                          <span className="fs-3">{menuItem.emoji}</span>
                          <div className="order-item-details">
                            <h4 className="h6 mb-0 text-dark fw-bold">{menuItem.name}</h4>
                            <span className="badge bg-secondary text-uppercase" style={{ fontSize: "0.6rem" }}>
                              {menuItem.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="fw-bold text-success">{menuItem.price}</span>
                          <div className="text-muted" style={{ fontSize: "0.7rem" }}>{order.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Order Summary & Calculations */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fw-bold text-secondary">Total Price:</span>
                  <span className="fw-bold text-success fs-5">
                    ${orders.reduce((sum, ord) => {
                      const item = menuItems.find(i => i.id === ord.id);
                      const priceVal = item ? parseFloat(item.price.replace("$", "")) : 0;
                      return sum + priceVal;
                    }, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="modal-empty text-center py-4" id="modal-empty-state">
                <div className="modal-empty-icon fs-1 mb-2">☕</div>
                <p className="text-muted mb-0">Your order is empty. Browse our menu and click "Add to Order" to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
