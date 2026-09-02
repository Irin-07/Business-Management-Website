import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary mb-3">CONTACT US</span>
        <h1 className="fw-bold">Get In Touch</h1>
        <p className="text-secondary lead mt-2">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="surface-card h-100 p-4">
            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-geo-alt-fill text-primary fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Address</h6>
                <p className="text-secondary mb-0">Chennai, Tamil Nadu, India</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-envelope-fill text-primary fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="text-secondary mb-0">support@bizmanager.com</p>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <i className="bi bi-telephone-fill text-primary fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Phone</h6>
                <p className="text-secondary mb-0">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="surface-card p-4">
            {sent && (
              <div className="alert alert-success" role="alert">
                Thank you! Your message has been sent.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-gradient w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;