import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    favoriteDrink: "espresso",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Phone Number
    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number (minimum 10 digits).";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required for delivery perks.";
    }

    // Terms
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the club terms & conditions.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      setRegisteredUser({ ...formData });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        favoriteDrink: "espresso",
        agreeTerms: false,
      });
    }, 1000);
  };

  return (
    <div className="register-page py-4">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          Exclusive Perks
        </span>
        <h1 className="display-5 fw-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
          Join Coffeely VIP Club
        </h1>
        <p className="text-secondary mx-auto mt-2" style={{ maxWidth: "600px" }}>
          Sign up to unlock free morning bakery items, earn 10% cash back on orders, and receive invitations to private coffee tastings.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7">
          <div
            className="card p-4 p-md-5 border-0 shadow-sm rounded-4"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          >
            {isRegistered ? (
              <div className="text-center py-4" id="register-success-card">
                <div className="display-4 mb-3">⭐</div>
                <h3 className="fw-bold text-success mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Welcome to the Club, {registeredUser?.fullName}!
                </h3>
                <p className="text-secondary mb-4">
                  Your VIP account has been successfully created. We sent a welcome voucher to{" "}
                  <strong>{registeredUser?.email}</strong>.
                </p>

                <div
                  className="p-3 rounded-3 text-start mx-auto mb-4"
                  style={{
                    background: "rgba(92, 64, 51, 0.04)",
                    border: "1px dashed var(--accent-gold)",
                    maxWidth: "450px",
                  }}
                >
                  <h6 className="fw-bold text-dark mb-2">Member Profile:</h6>
                  <p className="small mb-1">
                    <strong>Member Name:</strong> {registeredUser?.fullName}
                  </p>
                  <p className="small mb-1">
                    <strong>Email:</strong> {registeredUser?.email}
                  </p>
                  <p className="small mb-1">
                    <strong>Phone:</strong> {registeredUser?.phoneNumber}
                  </p>
                  <p className="small mb-1">
                    <strong>Address:</strong> {registeredUser?.address}
                  </p>
                  <p className="small mb-0">
                    <strong>Favorite Drink:</strong> {registeredUser?.favoriteDrink.toUpperCase()}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-warning text-white rounded-pill px-4 py-2 fw-semibold"
                  onClick={() => setIsRegistered(false)}
                >
                  Register Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate id="registration-form">
                <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
                  Create Your Account
                </h4>

                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="reg-name" className="form-label fw-semibold small text-secondary">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="reg-name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="Jane Smith"
                    style={{ borderRadius: "10px" }}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                {/* Email & Phone */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="reg-email" className="form-label fw-semibold small text-secondary">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="jane@example.com"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="reg-phone" className="form-label fw-semibold small text-secondary">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="reg-phone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                      placeholder="+1 (555) 000-0000"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="reg-password" className="form-label fw-semibold small text-secondary">
                      Password (min 6 chars) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="reg-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="reg-confirmPassword" className="form-label fw-semibold small text-secondary">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="reg-confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                {/* Delivery Address & Favorite Drink */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-8">
                    <label htmlFor="reg-address" className="form-label fw-semibold small text-secondary">
                      Delivery Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      placeholder="Apt, Street, City"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="col-12 col-md-4">
                    <label htmlFor="reg-drink" className="form-label fw-semibold small text-secondary">
                      Favorite Drink
                    </label>
                    <select
                      id="reg-drink"
                      name="favoriteDrink"
                      value={formData.favoriteDrink}
                      onChange={handleChange}
                      className="form-select"
                      style={{ borderRadius: "10px" }}
                    >
                      <option value="espresso">☕ Espresso</option>
                      <option value="latte">🥛 Vanilla Latte</option>
                      <option value="macchiato">🧋 Iced Macchiato</option>
                      <option value="coldbrew">🧊 Nitro Cold Brew</option>
                    </select>
                  </div>
                </div>

                {/* Agree to terms */}
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={`form-check-input ${errors.agreeTerms ? "is-invalid" : ""}`}
                  />
                  <label htmlFor="agreeTerms" className="form-check-label small text-secondary">
                    I agree to the Coffeely VIP Rewards terms and privacy policy. <span className="text-danger">*</span>
                  </label>
                  {errors.agreeTerms && <div className="invalid-feedback">{errors.agreeTerms}</div>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-warning text-white w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  id="submit-register-btn"
                  style={{ background: "var(--accent-coffee)", borderColor: "var(--accent-coffee)" }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Creating VIP Account...</span>
                    </>
                  ) : (
                    <>
                      <span>⭐</span>
                      <span>Complete VIP Registration</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
