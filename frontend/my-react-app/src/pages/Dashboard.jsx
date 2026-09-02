import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const emptyForm = { name: "", email: "", phone: "", address: "", status: "Active" };

function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await api.get("/customers", { params });
      setCustomers(res.data.customers);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingId(customer._id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    });
    setShowModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, form);
      } else {
        await api.post("/customers", form);
      }
      setShowModal(false);
      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const statusBadgeClass = (status) => {
    if (status === "Active") return "badge-status badge-active";
    if (status === "Pending") return "badge-status badge-pending";
    return "badge-status badge-completed";
  };

  const counts = {
    total: customers.length,
    active: customers.filter((c) => c.status === "Active").length,
    pending: customers.filter((c) => c.status === "Pending").length,
    completed: customers.filter((c) => c.status === "Completed").length,
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-secondary mb-0">Manage all your customers in one place</p>
        </div>
        <button className="btn btn-gradient" onClick={openAddModal}>
          <i className="bi bi-plus-lg me-1"></i> Add Customer
        </button>
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card h-100">
            <small className="opacity-75">Total</small>
            <h3 className="fw-bold mt-1 mb-0">{counts.total}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Active</small>
            <h3 className="fw-bold mt-1 mb-0 text-success">{counts.active}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Pending</small>
            <h3 className="fw-bold mt-1 mb-0 text-warning">{counts.pending}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Completed</small>
            <h3 className="fw-bold mt-1 mb-0 text-primary">{counts.completed}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="surface-card p-3 mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by name, email, phone or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="surface-card p-2 p-md-3">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-5 text-secondary">
            <i className="bi bi-inbox fs-1"></i>
            <p className="mt-2 mb-0">No customers found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-modern mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td data-label="Name" className="fw-semibold">{c.name}</td>
                    <td data-label="Email">{c.email}</td>
                    <td data-label="Phone">{c.phone}</td>
                    <td data-label="Address">{c.address}</td>
                    <td data-label="Status">
                      <span className={statusBadgeClass(c.status)}>{c.status}</span>
                    </td>
                    <td data-label="Actions" className="text-md-end">
                      <button className="btn btn-soft btn-sm me-2" onClick={() => openEditModal(c)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(c._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(15, 15, 25, 0.5)" }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: "18px" }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-bold">{editingId ? "Edit Customer" : "Add Customer"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input name="name" className="form-control" value={form.name} onChange={handleChange} required minLength={2} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input name="address" className="form-control" value={form.address} onChange={handleChange} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label fw-semibold">Status</label>
                    <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-gradient">{editingId ? "Save Changes" : "Add Customer"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;