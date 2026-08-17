import React, { useState } from "react";
import Hero from "../components/Hero";
import MenuItemCard from "../components/MenuItemCard";
import ItemDetail from "../components/ItemDetail";
import { menuItems } from "../data/menu";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const filterOptions = ["all", "hot", "cold", "pastry"];

  const filteredItems = menuItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div>
      {/* Hero section styled with CSS Modules */}
      <Hero />

      {/* Main Menu Section */}
      <section className="py-4" id="menu">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "0.5rem" }}>
            Our Delicious Menu
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Select a category to filter drinks and bakery goodies, then click to view ingredients and details.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="filters d-flex gap-2 flex-wrap mb-4" style={{ padding: "0.25rem" }}>
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
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
          {/* List of cards */}
          <div className="col-12 col-lg-7">
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

          {/* Item details card connected to Redux */}
          <div className="col-12 col-lg-5">
            <ItemDetail item={selectedItem} />
          </div>
        </div>
      </section>
    </div>
  );
}
