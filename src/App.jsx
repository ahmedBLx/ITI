import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { menuItems } from "./data/menu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import useLocalStorage from "./hooks/useLocalStorage";

// Helper component to auto-scroll window to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // State for active menu category
  const [filter, setFilter] = useState("all");

  // State for selected menu item
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  // Custom Hook: Persistent orders storage
  const [orders, setOrders] = useLocalStorage("coffeely_orders", []);

  // Modal display state
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Initial loading simulation
  const [isLoading, setIsLoading] = useState(true);

  // useEffect Hook 1: Simulate initial load
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(delayTimer);
  }, []);

  // useEffect Hook 2: Dynamic Document Title
  useEffect(() => {
    if (orders.length > 0) {
      document.title = `Coffeely Cafe (${orders.length} ${orders.length === 1 ? "Item" : "Items"})`;
    } else {
      document.title = "Coffeely Cafe House";
    }
  }, [orders]);

  // Handler to add item to orders ticket
  const handleAddToOrder = (id) => {
    if (!orders.some((o) => o.id === id)) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setOrders([...orders, { id, time: timeString }]);
    }
  };

  // Handler to remove item from order ticket
  const handleRemoveFromOrder = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  // Loading Screen
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
      <ScrollToTop />

      {/* Global Navigation Header */}
      <Header
        orderedCount={orders.length}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
      />

      {/* React Router Dynamic View Routes */}
      <main className="main-content" style={{ minHeight: "65vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                menuItems={menuItems}
                filter={filter}
                setFilter={setFilter}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                orders={orders}
                handleAddToOrder={handleAddToOrder}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Orders Ticket Modal */}
      {isOrdersModalOpen && (
        <div
          className="modal-overlay d-flex justify-content-center align-items-center"
          onClick={() => setIsOrdersModalOpen(false)}
        >
          <div
            className="modal-content border-0 p-4 shadow-lg rounded-4"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <div className="modal-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h3 className="modal-title h5 mb-0 text-dark fw-bold">
                <span className="me-2">📋</span> Order Ticket
              </h3>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOrdersModalOpen(false)}
                id="close-modal-btn"
                aria-label="Close"
              ></button>
            </div>

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
                        <div className="d-flex align-items-center gap-3 text-end">
                          <div>
                            <span className="fw-bold text-success">{menuItem.price}</span>
                            <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                              {order.time}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm text-danger p-0"
                            onClick={() => handleRemoveFromOrder(order.id)}
                            title="Remove item"
                            style={{ fontSize: "1.1rem" }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total Calculations */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fw-bold text-secondary">Total Price:</span>
                  <span className="fw-bold text-success fs-5">
                    $
                    {orders
                      .reduce((sum, ord) => {
                        const item = menuItems.find((i) => i.id === ord.id);
                        const priceVal = item ? parseFloat(item.price.replace("$", "")) : 0;
                        return sum + priceVal;
                      }, 0)
                      .toFixed(2)}
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
