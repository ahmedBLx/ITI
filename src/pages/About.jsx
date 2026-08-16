import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Organic Beans", value: "100%", icon: "🌱" },
    { label: "Happy Customers", value: "25k+", icon: "☕" },
    { label: "Master Baristas", value: "6", icon: "👨‍🍳" },
    { label: "Pastry Varieties", value: "18+", icon: "🥐" },
  ];

  const team = [
    {
      name: "Marcus Vance",
      role: "Head Roaster & Founder",
      bio: "Certified Q-Grader with 12 years of coffee bean roasting experience across Latin America and Ethiopia.",
      emoji: "☕",
    },
    {
      name: "Elena Rostova",
      role: "Pastry Chef",
      bio: "Paris-trained artisan baker crafting flaky croissants and buttery desserts fresh every dawn.",
      emoji: "🥐",
    },
    {
      name: "Sofia Chen",
      role: "Lead Barista",
      bio: "Latte art champion passionate about extracting the smoothest espresso balance in every cup.",
      emoji: "✨",
    },
  ];

  return (
    <div className="about-page py-4">
      {/* Page Header */}
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          Our Heritage & Passion
        </span>
        <h1 className="display-5 fw-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
          The Story of Coffeely Cafe
        </h1>
        <p className="lead text-secondary mx-auto mt-3" style={{ maxWidth: "700px" }}>
          Founded in 2026, Coffeely was born out of a desire to create a sanctuary where ethical coffee sourcing meets warm hospitality and handcrafted pastry delights.
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="row row-cols-2 row-cols-md-4 g-3 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="col">
            <div
              className="card text-center p-3 h-100 border-0 shadow-sm"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
              <h3 className="fw-bold my-1" style={{ color: "var(--accent-coffee)" }}>
                {stat.value}
              </h3>
              <span className="small text-muted fw-semibold">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mission & Story Content */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-12 col-md-6">
          <div
            className="p-4 rounded-4 shadow-sm"
            style={{
              background: "rgba(92, 64, 51, 0.03)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
              Ethically Sourced, Artfully Brewed
            </h3>
            <p className="text-secondary" style={{ lineHeight: "1.7" }}>
              Every batch of coffee beans we serve is 100% single-origin Arabica, directly traded with smallholder farming cooperatives in Colombia, Ethiopia, and Guatemala.
            </p>
            <p className="text-secondary" style={{ lineHeight: "1.7" }}>
              We believe in sustainable roasting practices, compostable packaging, and supporting our local community with wholesome food and uplifting conversations.
            </p>
            <div className="mt-3">
              <Link to="/contact" className="btn btn-warning text-white rounded-pill px-4 py-2 fw-semibold">
                Get In Touch With Us →
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            className="p-4 rounded-4 text-center shadow-sm"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div style={{ fontSize: "4rem" }}>🏡</div>
            <h4 className="fw-bold mt-2" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
              Downtown Sanctuary
            </h4>
            <p className="text-muted small">
              101 Madison Avenue, Downtown Plaza • Open Daily 7 AM - 8 PM
            </p>
            <p className="small text-secondary">
              Whether you need high-speed WiFi for work, a peaceful reading nook, or a cozy corner for catching up with friends, our cafe welcomes you with open arms and fresh aroma.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
            Meet Our Passionate Team
          </h2>
          <p className="text-secondary small">The dedicated artisans behind every sip and bite</p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {team.map((member, idx) => (
            <div key={idx} className="col">
              <div
                className="card h-100 p-4 text-center border-0 shadow-sm rounded-4"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <div className="mb-3" style={{ fontSize: "3rem" }}>
                  {member.emoji}
                </div>
                <h5 className="fw-bold mb-1" style={{ color: "var(--accent-coffee)" }}>
                  {member.name}
                </h5>
                <span className="badge bg-warning text-dark mx-auto mb-3" style={{ fontSize: "0.75rem" }}>
                  {member.role}
                </span>
                <p className="small text-secondary mb-0" style={{ lineHeight: "1.6" }}>
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
