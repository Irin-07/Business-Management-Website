import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tab="login">
      <h2 style={{ color: "#FFFFFF", fontSize: 26, fontWeight: 800, margin: "0 0 28px", textAlign: "center" }}>
        Login
      </h2>

      {error && (
        <div style={{
          background: "rgba(100, 116, 139, 0.1)",
          border: "1px solid rgba(100, 116, 139, 0.3)",
          borderRadius: 8, padding: "9px 13px", marginBottom: 14,
          fontSize: 12.5, color: "#E2E8F0",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 7, fontWeight: 500 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
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
          {loading ? <><span className="spinner" />Signing in...</> : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.32)" }}>
          Don't have an account?{" "}
          <a href="/register" className="link-btn" style={{ textDecoration: "none" }}>
            Sign Up
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

export default Login;