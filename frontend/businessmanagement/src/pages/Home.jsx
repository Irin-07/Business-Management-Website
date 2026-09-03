import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <span className="badge bg-primary mb-3">BUSINESS MANAGEMENT</span>

              <h1 className="display-4 fw-bold">
                Manage Your Business
                <br />
                Smarter & Faster
              </h1>

              <p className="lead text-secondary mt-3">
                A modern business management platform to manage
                customers, records and business activities easily.
              </p>

              <div className="mt-4">
                <Link to="/register" className="btn btn-primary btn-lg me-2">
                 Register/Login
                </Link>
                <Link to="/about" className="btn btn-outline-dark btn-lg">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="surface-card p-4">
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">Why BizManager</h5>
                  <i className="bi bi-bar-chart-fill text-primary fs-3"></i>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span className="text-secondary">
                    Real-time customer data, straight from your database
                  </span>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span className="text-secondary">
                    Secure login with JWT-based authentication
                  </span>
                </div>
                <div className="d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span className="text-secondary">
                    Full CRUD control over every customer record
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Everything You Need</h2>
            <p className="text-secondary">Manage your business from one simple platform.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="surface-card h-100 p-4">
                <i className="bi bi-people-fill text-primary fs-1"></i>
                <h4 className="fw-bold mt-3">Customer Management</h4>
                <p className="text-secondary">
                  Add, view, update and delete customer records easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="surface-card h-100 p-4">
                <i className="bi bi-shield-lock-fill text-primary fs-1"></i>
                <h4 className="fw-bold mt-3">Secure Authentication</h4>
                <p className="text-secondary">
                  Secure login and protected access using JWT authentication.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="surface-card h-100 p-4">
                <i className="bi bi-phone-fill text-primary fs-1"></i>
                <h4 className="fw-bold mt-3">Responsive Design</h4>
                <p className="text-secondary">
                  Works smoothly on desktop, tablet and mobile devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;