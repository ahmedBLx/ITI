import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const handleScroll = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} id="hero">
      <h1 className={styles.heroTitle}>Warm Coffee, Sweet Moments</h1>
      <p className={styles.heroSubtitle}>
        Welcome to Coffeely. We serve hand-roasted organic espresso, cold brews, 
        and fresh croissants baked daily. Explore our simple menu and build your order!
      </p>
      <button className={styles.heroBtn} onClick={handleScroll} id="hero-cta-btn">
        Browse Menu
      </button>
    </section>
  );
}
