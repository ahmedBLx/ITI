import React from "react";

export default function Hero() {
  const handleScroll = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <h1 className="hero-title">Warm Coffee, Sweet Moments</h1>
      <p className="hero-subtitle">
        Welcome to Coffeely. We serve hand-roasted organic espresso, cold brews, 
        and fresh croissants baked daily. Explore our simple menu and build your order!
      </p>
      <button className="hero-btn" onClick={handleScroll} id="hero-cta-btn">
        Browse Menu
      </button>
    </section>
  );
}
