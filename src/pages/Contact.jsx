import React, { useState } from "react";

export default function Contact() {
  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "general",
    message: "",
  });

  // Form error state
  const [errors, setErrors] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Full Name validation: Required & at least 3 characters
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters long.";
    }

    // Email validation: Required & valid email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    // Phone Number validation: Required & at least 10 digits
    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number (minimum 10 digits).";
    }

    // Message validation: Required & at least 10 characters
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    return newErrors;
  };

  // Controlled input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if user begins fixing it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Submit handler without page refresh
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate async network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });
      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "general",
        message: "",
      });
    }, 1000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="contact-page py-4">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          Get In Touch
        </span>
        <h1 className="display-5 fw-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
          Contact Coffeely Cafe
        </h1>
        <p className="text-secondary mx-auto mt-2" style={{ maxWidth: "600px" }}>
          Have a question about our menu, want to book a private event, or share customer feedback? Send us a message!
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Left Side: Info Cards */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3">
            <div
              className="card p-4 border-0 shadow-sm rounded-4"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <span className="fs-2">📍</span>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Our Location</h6>
                  <p className="small text-secondary mb-0">101 Madison Avenue, Downtown Plaza</p>
                </div>
              </div>
            </div>

            <div
              className="card p-4 border-0 shadow-sm rounded-4"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <span className="fs-2">📞</span>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Phone & Support</h6>
                  <p className="small text-secondary mb-0">+1 (555) 349-2633</p>
                </div>
              </div>
            </div>

            <div
              className="card p-4 border-0 shadow-sm rounded-4"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <span className="fs-2">⏰</span>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Opening Hours</h6>
                  <p className="small text-secondary mb-0">Mon – Sun: 7:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Controlled Form */}
        <div className="col-12 col-lg-7">
          <div
            className="card p-4 p-md-5 border-0 shadow-sm rounded-4"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            {/* Success message banner and summary */}
            {isSubmitted ? (
              <div className="text-center py-4" id="form-success-state">
                <div className="display-4 mb-3">🎉</div>
                <h3 className="fw-bold text-success mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Thank You, {submittedData?.fullName}!
                </h3>
                <p className="text-secondary mb-4">
                  Your message has been received successfully. Our team will get back to you at{" "}
                  <strong>{submittedData?.email}</strong> shortly.
                </p>

                <div
                  className="p-3 rounded-3 text-start mx-auto mb-4"
                  style={{
                    background: "rgba(92, 64, 51, 0.04)",
                    border: "1px dashed var(--accent-gold)",
                    maxWidth: "450px",
                  }}
                >
                  <h6 className="fw-bold text-dark mb-2">📋 Submitted Details:</h6>
                  <p className="small mb-1">
                    <strong>Full Name:</strong> {submittedData?.fullName}
                  </p>
                  <p className="small mb-1">
                    <strong>Email:</strong> {submittedData?.email}
                  </p>
                  <p className="small mb-1">
                    <strong>Phone:</strong> {submittedData?.phoneNumber}
                  </p>
                  <p className="small mb-1">
                    <strong>Subject:</strong> {submittedData?.subject.toUpperCase()}
                  </p>
                  <p className="small mb-0">
                    <strong>Message:</strong> "{submittedData?.message}"
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-warning text-white rounded-pill px-4 py-2 fw-semibold"
                  onClick={handleResetForm}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-coffee)" }}>
                  Send a Message
                </h4>

                {/* Full Name Field */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label fw-semibold small text-secondary">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="e.g. John Doe"
                    style={{ borderRadius: "10px" }}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                {/* Email and Phone Number in a 2-column row */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold small text-secondary">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="e.g. name@example.com"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="phoneNumber" className="form-label fw-semibold small text-secondary">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                      placeholder="e.g. +1 555 123 4567"
                      style={{ borderRadius: "10px" }}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                  </div>
                </div>

                {/* Subject / Inquiry Type */}
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-semibold small text-secondary">
                    Inquiry Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select"
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="general">☕ General Question / Feedback</option>
                    <option value="reservation">🍽️ Table & Private Event Reservation</option>
                    <option value="catering">🥐 Office & Party Catering</option>
                    <option value="careers">💼 Barista Careers & Jobs</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold small text-secondary">
                    Your Message / Special Requests <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Tell us how we can help you or your feedback..."
                    style={{ borderRadius: "10px" }}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-warning text-white w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                  id="submit-contact-btn"
                  style={{ background: "var(--accent-coffee)", borderColor: "var(--accent-coffee)" }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>✉️</span>
                      <span>Submit Message</span>
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
