import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tab="register">
      <h2 style={{ color: "#FFFFFF", fontSize: 26, fontWeight: 800, margin: "0 0 22px", textAlign: "left" }}>
        Sign Up
      </h2>

      {success && (
        <div style={{
          background: "rgba(22, 163, 74, 0.1)", border: "1px solid rgba(22, 163, 74, 0.3)",
          borderRadius: 8, padding: "9px 13px", marginBottom: 14, fontSize: 12.5, color: "#E2E8F0",
        }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{
          background: "rgba(100, 116, 139, 0.1)", border: "1px solid rgba(100, 116, 139, 0.3)",
          borderRadius: 8, padding: "9px 13px", marginBottom: 14, fontSize: 12.5, color: "#E2E8F0",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 7, fontWeight: 500 }}>
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            minLength={2}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 7, fontWeight: 500 }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="@email.com"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 15, position: "relative" }}>
          <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 7, fontWeight: 500 }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 chars"
              required
              minLength={6}
              style={{ ...inputStyle, paddingRight: 56 }}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              style={{
                position: "absolute", right: 0, bottom: 9, background: "none", border: "none",
                color: "rgba(255,255,255,0.38)", fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", letterSpacing: 0.5, fontSize: 12,
              }}
            >
              {showPass ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        <button type="submit" className="purple-btn" disabled={loading}>
          {loading ? <><span className="spinner" />Creating account...</> : "Sign Up"}
        </button>

        <p style={{ textAlign: "left", marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.32)" }}>
          Already have an account?{" "}
          <a href="/login" className="link-btn" style={{ textDecoration: "none" }}>
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

const inputStyle = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1.5px solid rgba(255,255,255,0.2)",
  padding: "9px 0", color: "#FFFFFF", fontSize: 14,
  outline: "none", fontFamily: "inherit", transition: "border-color .2s",
};

export default Register;