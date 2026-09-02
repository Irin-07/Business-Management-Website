import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api";

function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">BizManage</Link>
          <div className="d-flex gap-2 align-items-center">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/services">Services</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
            {token ? (
              <>
                <Link className="btn btn-primary btn-sm" to="/dashboard">Dashboard</Link>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

function PublicPage({ title, text }) {
  return (
    <div className="container py-5">
      <div className="hero-card p-5">
        <h1 className="display-5 fw-bold">{title}</h1>
        <p className="lead text-secondary">{text}</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-7">
              <span className="badge text-bg-primary mb-3">BUSINESS MANAGEMENT</span>
              <h1 className="display-3 fw-bold">Manage your customers and business data smarter.</h1>
              <p className="lead text-secondary my-4">
                A modern full-stack platform with secure authentication, customer management and real-time API integration.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg me-2">Get Started</Link>
              <Link to="/about" className="btn btn-outline-dark btn-lg">Learn More</Link>
            </div>
            <div className="col-lg-5 mt-4">
              <div className="dashboard-preview shadow-sm">
                <div className="d-flex justify-content-between mb-4">
                  <strong>Business Overview</strong><i className="bi bi-bar-chart-fill text-primary fs-4"></i>
                </div>
                <div className="row g-3">
                  {["Total Records", "Active", "Pending", "Completed"].map((x, i) =>
                    <div className="col-6" key={x}><div className="stat-mini"><small>{x}</small><h3>{[128, 86, 24, 18][i]}</h3></div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-5">
        <div className="row g-4">
          {[
            ["bi-shield-check", "Secure Authentication", "JWT-based protected APIs and hashed passwords."],
            ["bi-people", "Customer Management", "Complete customer CRUD with search and filtering."],
            ["bi-phone", "Responsive Design", "Professional UI for desktop, tablet and mobile."]
          ].map(([icon, title, text]) => (
            <div className="col-md-4" key={title}>
              <div className="feature-card h-100">
                <i className={`bi ${icon} fs-1 text-primary`}></i>
                <h4 className="mt-3">{title}</h4><p className="text-secondary">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Auth({ mode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      return setError("Please fill all required fields.");
    }
    setLoading(true);
    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const { data } = await api.post(endpoint, form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card shadow">
        <h2 className="fw-bold">{mode === "register" ? "Create account" : "Welcome back"}</h2>
        <p className="text-secondary">{mode === "register" ? "Start managing your business today." : "Sign in to continue."}</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          {mode === "register" && <input className="form-control mb-3" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />}
          <input className="form-control mb-3" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <input className="form-control mb-3" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
          <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Please wait..." : mode === "register" ? "Register" : "Login"}</button>
        </form>
        <div className="text-center mt-3">
          {mode === "register" ? <>Already have an account? <Link to="/login">Login</Link></> : <>New user? <Link to="/register">Create account</Link></>}
        </div>
      </div>
    </div>
  );
}

function Protected({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState({ search: "", status: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", status: "Active" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function load() {
    const { data } = await api.get("/customers", { params: filter });
    setCustomers(data.customers);
  }

  useEffect(() => {
  load().catch(() => {});
}, [filter.search, filter.status]);

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function save(e) {
    e.preventDefault();
    setMessage("");
    try {
      if (editingId) await api.put(`/customers/${editingId}`, form);
      else await api.post("/customers", form);
      setForm({ name:"", email:"", phone:"", address:"", status:"Active" });
      setEditingId(null);
      setMessage(editingId ? "Customer updated successfully." : "Customer added successfully.");
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to save customer");
    }
  }

  async function remove(id) {
    if (!confirm("Delete this customer?")) return;
    try { await api.delete(`/customers/${id}`); await load(); setMessage("Customer deleted."); }
    catch (err) { setMessage(err.response?.data?.message || "Delete failed"); }
  }

  function edit(c) {
    setEditingId(c._id);
    setForm({ name:c.name, email:c.email, phone:c.phone, address:c.address, status:c.status });
    window.scrollTo({ top: 250, behavior: "smooth" });
  }

  const active = customers.filter(c => c.status === "Active").length;
  const pending = customers.filter(c => c.status === "Pending").length;
  const completed = customers.filter(c => c.status === "Completed").length;

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div><h2 className="fw-bold mb-1">Dashboard</h2><p className="text-secondary mb-0">Welcome, {user.name || "User"}.</p></div>
      </div>

      <div className="row g-3 mb-4">
        {[
          ["Total Records", customers.length, "bi-people"],
          ["Active Records", active, "bi-check-circle"],
          ["Pending Records", pending, "bi-hourglass-split"],
          ["Completed Records", completed, "bi-trophy"]
        ].map(([title, value, icon]) => (
          <div className="col-sm-6 col-xl-3" key={title}>
            <div className="stat-card"><i className={`bi ${icon} fs-2 text-primary`}></i><small>{title}</small><h2>{value}</h2></div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold">{editingId ? "Edit Customer" : "Add Customer"}</h5>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={save} className="row g-3">
            {[
              ["name","Customer Name","text"],
              ["email","Email","email"],
              ["phone","Phone Number","text"],
              ["address","Address","text"]
            ].map(([name, placeholder, type]) => (
              <div className="col-md-6" key={name}>
                <label className="form-label">{placeholder}</label>
                <input required name={name} type={type} className="form-control" value={form[name]} onChange={change} />
              </div>
            ))}
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select name="status" className="form-select" value={form.status} onChange={change}>
                <option>Active</option><option>Pending</option><option>Completed</option>
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-primary me-2">{editingId ? "Update Customer" : "Add Customer"}</button>
              {editingId && <button type="button" className="btn btn-outline-secondary" onClick={() => {setEditingId(null); setForm({name:"",email:"",phone:"",address:"",status:"Active"})}}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Customer Management</h5>
<div className="d-flex gap-2">
  <select
    className="form-select"
    value={filter.status}
    onChange={e => setFilter({ ...filter, status: e.target.value })}
  >
    <option value="">All Status</option>
    <option value="Active">Active</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>

  <input
    className="form-control"
    placeholder="Search..."
    value={filter.search}
    onChange={e => setFilter({ ...filter, search: e.target.value })}
  />
</div>
          </div>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c._id}>
                    <td className="fw-semibold">{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.address}</td>
                    <td><span className={`badge ${c.status==="Active"?"text-bg-success":c.status==="Pending"?"text-bg-warning":"text-bg-primary"}`}>{c.status}</span></td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => edit(c)}><i className="bi bi-pencil"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => remove(c._id)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
                {!customers.length && <tr><td colSpan="6" className="text-center text-secondary py-4">No customers found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PublicPage title="About Us" text="BizManage demonstrates a production-style full-stack architecture with React, Express and MongoDB Atlas." />} />
        <Route path="/services" element={<PublicPage title="Our Services" text="Customer management, business reporting, secure authentication and data management." />} />
        <Route path="/contact" element={<PublicPage title="Contact Us" text="Use this page as the foundation for your business contact form and support information." />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
