function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary mb-3">ABOUT US</span>
        <h1 className="fw-bold">Who We Are</h1>
        <p className="text-secondary lead mt-2">
          Helping businesses manage their operations smarter and faster.
        </p>
      </div>

      <div className="row g-4 align-items-center mb-5">
        <div className="col-lg-12">
          <h2 className="fw-bold">Our Story</h2>
          <p className="text-secondary">
            BizManager was built to help small and medium businesses simplify
            customer management, reduce manual work, and grow with confidence.
            We combine simplicity with powerful tools so you can focus on what
            matters most — your business.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="surface-card h-100 p-4 text-center">
            <i className="bi bi-bullseye text-primary fs-1"></i>
            <h4 className="fw-bold mt-3">Our Mission</h4>
            <p className="text-secondary mb-0">
              Empower every business with simple, reliable management tools.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="surface-card h-100 p-4 text-center">
            <i className="bi bi-eye-fill text-primary fs-1"></i>
            <h4 className="fw-bold mt-3">Our Vision</h4>
            <p className="text-secondary mb-0">
              To become the go-to platform for business operations worldwide.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="surface-card h-100 p-4 text-center">
            <i className="bi bi-heart-fill text-primary fs-1"></i>
            <h4 className="fw-bold mt-3">Our Values</h4>
            <p className="text-secondary mb-0">
              Simplicity, transparency, and customer success above all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;