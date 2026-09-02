import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <span className="badge bg-primary mb-3">
                BUSINESS MANAGEMENT
              </span>

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
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg me-2"
                >
                  Get Started
                </Link>

                <Link
                  to="/about"
                  className="btn btn-outline-dark btn-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="card border-0 shadow-lg rounded-4 p-4">

                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">
                    Business Overview
                  </h5>

                  <i className="bi bi-bar-chart-fill text-primary fs-3"></i>
                </div>

                <div className="row g-3">

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-secondary">
                        Total Records
                      </small>
                      <h3 className="fw-bold mt-2">128</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-secondary">
                        Active
                      </small>
                      <h3 className="fw-bold mt-2">86</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-secondary">
                        Pending
                      </small>
                      <h3 className="fw-bold mt-2">24</h3>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-secondary">
                        Completed
                      </small>
                      <h3 className="fw-bold mt-2">18</h3>
                    </div>
                  </div>

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
            <h2 className="fw-bold">
              Everything You Need
            </h2>

            <p className="text-secondary">
              Manage your business from one simple platform.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 p-4">
                <i className="bi bi-people-fill text-primary fs-1"></i>

                <h4 className="fw-bold mt-3">
                  Customer Management
                </h4>

                <p className="text-secondary">
                  Add, view, update and delete customer records
                  easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 p-4">
                <i className="bi bi-shield-lock-fill text-primary fs-1"></i>

                <h4 className="fw-bold mt-3">
                  Secure Authentication
                </h4>

                <p className="text-secondary">
                  Secure login and protected access using JWT
                  authentication.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 p-4">
                <i className="bi bi-phone-fill text-primary fs-1"></i>

                <h4 className="fw-bold mt-3">
                  Responsive Design
                </h4>

                <p className="text-secondary">
                  Works smoothly on desktop, tablet and mobile
                  devices.
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