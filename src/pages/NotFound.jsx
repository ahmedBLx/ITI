import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="not-found-page d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="card p-5 border-0 shadow-lg rounded-4 text-center"
        style={{
          maxWidth: "550px",
          width: "100%",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <div style={{ fontSize: "4.5rem" }} className="mb-2">
          ☕💨
        </div>
        <h1
          className="display-4 fw-bold mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}
        >
          404
        </h1>
        <h3 className="fw-bold mb-3 text-dark">Page Not Found</h3>
        <p className="text-secondary mb-4" style={{ lineHeight: "1.6" }}>
          Oops! It looks like this coffee brew has evaporated into thin air or the link you followed is cold.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/"
            className="btn btn-warning text-white rounded-pill px-4 py-2 fw-bold shadow-sm"
            style={{ background: "var(--accent-coffee)", borderColor: "var(--accent-coffee)" }}
          >
            ← Return to Home Menu
          </Link>
          <Link
            to="/contact"
            className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-semibold"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
