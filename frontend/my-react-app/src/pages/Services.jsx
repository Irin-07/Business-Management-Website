const services = [
  {
    icon: "bi-people-fill",
    title: "Customer Management",
    desc: "Add, view, update and delete customer records easily with a clean interface.",
  },
  {
    icon: "bi-shield-lock-fill",
    title: "Secure Authentication",
    desc: "Protected access using JWT authentication and encrypted passwords.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Business Analytics",
    desc: "Track active, pending and completed records with real-time stats.",
  },
  {
    icon: "bi-search",
    title: "Smart Search & Filters",
    desc: "Quickly find customers by name, email, phone or status.",
  },
  {
    icon: "bi-phone-fill",
    title: "Responsive Design",
    desc: "Works smoothly across desktop, tablet and mobile devices.",
  },
  {
    icon: "bi-cloud-check-fill",
    title: "Cloud-Based Access",
    desc: "Access your business data anytime, anywhere, securely.",
  },
];

function Services() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary mb-3">OUR SERVICES</span>
        <h1 className="fw-bold">What We Offer</h1>
        <p className="text-secondary lead mt-2">
          Everything you need to manage your business efficiently.
        </p>
      </div>

      <div className="row g-4">
        {services.map((s, i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="surface-card h-100 p-4">
              <i className={`bi ${s.icon} text-primary fs-1`}></i>
              <h4 className="fw-bold mt-3">{s.title}</h4>
              <p className="text-secondary mb-0">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;