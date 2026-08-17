import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "./redux/slices/cartSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Auto-scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Global cart modal state
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Redux: Read total cart quantity for dynamic document title
  const totalCartQuantity = useSelector(selectTotalQuantity);

  // Initial loading simulation
  const [isLoading, setIsLoading] = useState(true);

  // useEffect Hook 1: Simulated startup delay
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(delayTimer);
  }, []);

  // useEffect Hook 2: Dynamic Document Title using Redux cart count
  useEffect(() => {
    if (totalCartQuantity > 0) {
      document.title = `Coffeely (${totalCartQuantity} ${totalCartQuantity === 1 ? "Item" : "Items"} in Cart)`;
    } else {
      document.title = "Coffeely Cafe House";
    }
  }, [totalCartQuantity]);

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

      {/* Global Header consuming Context (Theme) and Redux (Cart count) */}
      <Header onOpenCart={() => setIsCartModalOpen(true)} />

      {/* Client-Side Routes */}
      <main className="main-content" style={{ minHeight: "65vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Redux-Powered Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </div>
  );
}
