import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, Active: 0, Pending: 0, Completed: 0 });
  const [activity, setActivity] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [profileRes, statsRes, activityRes, customersRes] = await Promise.all([
        api.get("/auth/profile"),
        api.get("/customers/stats"),
        api.get("/customers/recent-activity"),
        api.get("/customers", { params: {} })
      ]);
      setUser(profileRes.data.user);
      setStats(statsRes.data.stats);
      setActivity(activityRes.data.activity);
      setCustomers(customersRes.data.customers.slice(0, 5));
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const statusBadgeClass = (status) => {
    if (status === "Active") return "badge-status badge-active";
    if (status === "Pending") return "badge-status badge-pending";
    return "badge-status badge-completed";
  };

  const timeAgo = (dateStr) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <h2 className="fw-bold mb-1">Dashboard</h2>
      <p className="text-secondary mb-4">Overview of your business activity</p>

      {/* User Profile */}
      <div className="surface-card p-4 mb-4">
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 64, height: 64, fontSize: "1.5rem" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <p className="text-secondary mb-0">
              <i className="bi bi-envelope me-1"></i> {user?.email}
            </p>
            <p className="text-secondary mb-0">
              <i className="bi bi-calendar-check me-1"></i>
              Member since {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card h-100">
            <small className="opacity-75">Total Records</small>
            <h3 className="fw-bold mt-1 mb-0">{stats.total}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Active</small>
            <h3 className="fw-bold mt-1 mb-0 text-success">{stats.Active}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Pending</small>
            <h3 className="fw-bold mt-1 mb-0 text-warning">{stats.Pending}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="surface-card h-100 p-3">
            <small className="text-secondary">Completed</small>
            <h3 className="fw-bold mt-1 mb-0 text-primary">{stats.Completed}</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Activity */}
        <div className="col-lg-6">
          <div className="surface-card p-3 p-md-4 h-100">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-clock-history me-2 text-primary"></i>Recent Activity
            </h5>
            {activity.length === 0 ? (
              <p className="text-secondary mb-0">No recent activity yet.</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {activity.map((a) => (
                  <li key={a._id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <span className="fw-semibold">{a.name}</span>
                      <span className="text-secondary ms-2">
                        {a.type === "created" ? "was added" : "was updated"}
                      </span>
                      <span className={`${statusBadgeClass(a.status)} ms-2`}>{a.status}</span>
                    </div>
                    <small className="text-secondary">{timeAgo(a.timestamp)}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Available Services */}
        <div className="col-lg-6">
          <div className="surface-card p-3 p-md-4 h-100">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-grid-fill me-2 text-primary"></i>Available Services
            </h5>
            <div className="row g-3">
              <div className="col-6">
                <Link to="/customers" className="text-decoration-none">
                  <div className="border rounded-3 p-3 h-100 text-center">
                    <i className="bi bi-people-fill text-primary fs-3"></i>
                    <p className="fw-semibold mt-2 mb-0 text-dark">Customer Management</p>
                  </div>
                </Link>
              </div>
              <div className="col-6">
                <div className="border rounded-3 p-3 h-100 text-center">
                  <i className="bi bi-graph-up-arrow text-primary fs-3"></i>
                  <p className="fw-semibold mt-2 mb-0">Business Reports</p>
                </div>
              </div>
              <div className="col-6">
                <div className="border rounded-3 p-3 h-100 text-center">
                  <i className="bi bi-briefcase-fill text-primary fs-3"></i>
                  <p className="fw-semibold mt-2 mb-0">Business Management</p>
                </div>
              </div>
              <div className="col-6">
                <div className="border rounded-3 p-3 h-100 text-center">
                  <i className="bi bi-gear-fill text-primary fs-3"></i>
                  <p className="fw-semibold mt-2 mb-0">Account Settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Data */}
      <div className="surface-card p-3 p-md-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-database-fill me-2 text-primary"></i>Latest Customer Records
          </h5>
          <Link to="/customers" className="btn btn-soft btn-sm">View All</Link>
        </div>
        {customers.length === 0 ? (
          <p className="text-secondary mb-0">No customer records yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-modern mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id}>
                    <td data-label="Name" className="fw-semibold">{c.name}</td>
                    <td data-label="Email">{c.email}</td>
                    <td data-label="Phone">{c.phone}</td>
                    <td data-label="Status">
                      <span className={statusBadgeClass(c.status)}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;