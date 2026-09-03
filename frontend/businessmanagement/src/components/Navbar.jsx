import { Link, NavLink, useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar py-3">
      <div className="container">
        <Link className="navbar-brand brand" to="/">
          <i className="bi bi-briefcase-fill me-2"></i>BizManager
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact Us</NavLink></li>

            {token ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/customers">Customers</NavLink></li>
                <li className="nav-item mt-2 mt-lg-0">
                  <button className="btn btn-gradient btn-sm w-100" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item mt-2 mt-lg-0">
                <Link className="btn btn-gradient btn-sm w-100" to="/login">Login / Register</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;