import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Auth({ initialTab = "login" }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(initialTab);
  const [animating, setAnimating] = useState(false);
  const [panelAnim, setPanelAnim] = useState("idle");
  const [formVisible, setFormVisible] = useState(true);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", password: "" });

  const switchTab = (t) => {
    if (animating || tab === t) return;
    setAnimating(true);
    setError(""); setSuccess("");
    setFormVisible(false);
    setPanelAnim("flip-out");

    setTimeout(() => {
      setTab(t);
      navigate(t === "login" ? "/login" : "/register", { replace: true });
      setPanelAnim("flip-in");
      setTimeout(() => {
        setFormVisible(true);
        setPanelAnim("idle");
        setAnimating(false);
      }, 280);
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await api.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await api.post("/auth/register", regData);
      setSuccess("Account created successfully! Please login.");
      setLoginData((p) => ({ ...p, email: regData.email }));
      setRegData({ name: "", email: "", password: "" });
      setTimeout(() => switchTab("login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  const isRegister = tab === "register";
  const isLogin = tab === "login";
  const panelLeft = isRegister ? "0" : "58%";
  const panelClip = isRegister
    ? "polygon(0 0, 87% 0, 100% 100%, 0 100%)"
    : "polygon(13% 0, 100% 0, 100% 100%, 0 100%)";

  let panelTransform = "rotateY(0deg)";
  if (panelAnim === "flip-out") panelTransform = "rotateY(90deg)";
  if (panelAnim === "flip-in") panelTransform = "rotateY(0deg)";

  const inputStyle = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1.5px solid rgba(255,255,255,0.2)",
    padding: "6px 0", color: "#FFFFFF", fontSize: 14,
    outline: "none", fontFamily: "inherit", transition: "border-color .2s",
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 76px)", width: "100%", background: "#0F172A",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 20, boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-bottom-color: rgba(255,255,255,0.2) !important; outline: none; box-shadow: none; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 40px #0F172A inset !important;
          -webkit-text-fill-color: #FFFFFF !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

.auth-card {
  width: 100%; max-width: 680px; min-height: 380px; border-radius: 22px;
          border: 2px solid #00BCD4;
          box-shadow: 0 0 0 1px rgba(37,99,235,0.12), 0 0 60px rgba(37,99,235,0.28), 0 24px 80px rgba(0,0,0,0.5);
          display: flex; overflow: visible; position: relative; perspective: 1200px;
        }
.form-side {
  flex: 1; background: #0F172A; display: flex; flex-direction: column;
  justify-content: center; padding: 22px 52px; position: relative; z-index: 1;
  min-width: 0; border-radius: 20px; overflow: hidden; transition: opacity 0.25s ease;
}
.form-side.reg-form { padding: 18px 44px; }

.purple-panel {
  position: absolute; top: 0; bottom: 0; width: 42%;
  background: linear-gradient(155deg, #2563EB, #2563EB 60%, #2563EB 100%);
  display: flex; flex-direction: column; justify-content: center;
  padding: 24px 40px; color: #FFFFFF; z-index: 10; border-radius: 18px;
          transform-style: preserve-3d; transform-origin: center center;
          transition: left 0s, clip-path 0s, transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          backface-visibility: hidden; align-items: center; text-align: center;
        }
        .purple-panel.flip-out { opacity: 0.3; }
        .purple-panel.flip-in { opacity: 1; }

             .purple-btn {
          width: 100%; padding: 10px 0;
          background: linear-gradient(90deg, #2563EB, #2563EB);
          border: none; border-radius: 50px; color: #FFFFFF; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: inherit; display: flex; align-items: center;
          justify-content: center; gap: 8px; box-shadow: 0 4px 22px #2563EB;
          margin-top: 20px; transition: opacity .2s;
        }
        .purple-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .purple-btn:hover:not(:disabled) { opacity: 0.9; }

        .spinner {
          width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #FFFFFF; border-radius: 50%; animation: spin .8s linear infinite; display: inline-block;
        }
        .link-btn { background: none; border: none; color: #00BCD4; font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px; }

        @media (max-width: 640px) {
          .auth-card { flex-direction: column; min-height: unset; overflow: hidden !important; border-radius: 22px !important; }
          .purple-panel {
            position: relative !important; left: auto !important; width: 100% !important;
            clip-path: none !important; border-radius: 0 !important; min-height: 160px;
            padding: 28px 24px !important; transform: none !important; box-shadow: none !important;
          }
          .form-side, .form-side.reg-form { padding: 24px 20px !important; }
        }
      `}</style>

      <div className="auth-card">
        <div
          className={`form-side${isRegister ? " reg-form" : ""}`}
          style={{
            paddingLeft: isRegister ? "44%" : "52px",
            paddingRight: isRegister ? "44px" : "44%",
            opacity: formVisible ? 1 : 0,
          }}
        >
          {isRegister && (
            <div>
              <h2 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, margin: "0 0 14px", textAlign: "center" }}>Sign Up</h2>
              {success && <Alert type="success" msg={success} />}
              {error && <Alert type="error" msg={error} />}
              <form onSubmit={handleRegister}>
                <Field label="Name">
                  <input value={regData.name} onChange={(e) => setRegData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Name" required minLength={2} style={inputStyle} />
                </Field>
                <Field label="Email">
                  <input type="email" value={regData.email} onChange={(e) => setRegData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="@email.com" required style={inputStyle} />
                </Field>
                <Field label="Password">
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} value={regData.password}
                      onChange={(e) => setRegData((p) => ({ ...p, password: e.target.value }))}
                      placeholder="Min 6 chars" required minLength={6} style={{ ...inputStyle, paddingRight: 56 }} />
                    <ShowHide show={showPass} toggle={() => setShowPass((s) => !s)} />
                  </div>
                </Field>
                <button type="submit" className="purple-btn" disabled={loading}>
                  {loading ? <><span className="spinner" />Creating account...</> : "Sign Up"}
                </button>
                <p style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.32)" }}>
                  Already have an account? <button type="button" className="link-btn" onClick={() => switchTab("login")}>Login</button>
                </p>
              </form>
            </div>
          )}

          {isLogin && (
            <div>
              <h2 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, margin: "0 0 16px", textAlign: "center" }}>Login</h2>
              {success && <Alert type="success" msg={success} />}
              {error && <Alert type="error" msg={error} />}
              <form onSubmit={handleLogin}>
                <Field label="Email">
                  <input type="email" value={loginData.email} onChange={(e) => setLoginData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com" required style={inputStyle} />
                </Field>
                <Field label="Password">
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} value={loginData.password}
                      onChange={(e) => setLoginData((p) => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 56 }} />
                    <ShowHide show={showPass} toggle={() => setShowPass((s) => !s)} />
                  </div>
                </Field>
                <button type="submit" className="purple-btn" disabled={loading}>
                  {loading ? <><span className="spinner" />Signing in...</> : "Login"}
                </button>
                <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.32)" }}>
                  Don't have an account? <button type="button" className="link-btn" onClick={() => switchTab("register")}>Sign Up</button>
                </p>
              </form>
            </div>
          )}
        </div>

        <div
          className={`purple-panel${panelAnim === "flip-out" ? " flip-out" : ""}${panelAnim === "flip-in" ? " flip-in" : ""}`}
          style={{ left: panelLeft, clipPath: panelClip, transform: panelTransform }}
        >
<h2 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.1, margin: "0 0 10px", color: "#FFFFFF" }}>WELCOME<br />BACK!</h2>
<p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.6, marginBottom: 10, maxWidth: 250 }}>
            Manage your workspace efficiently
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", fontSize: 12.5, color: "rgba(255,255,255,0.65)", marginBottom: 4, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

function ShowHide({ show, toggle }) {
  return (
    <button type="button" onClick={toggle}
      style={{ position: "absolute", right: 0, bottom: 9, background: "none", border: "none", color: "rgba(255,255,255,0.38)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5, fontSize: 12 }}>
      {show ? "HIDE" : "SHOW"}
    </button>
  );
}

function Alert({ type, msg }) {
  const isSuccess = type === "success";
  return (
    <div style={{
      background: isSuccess ? "rgba(22,163,74,0.1)" : "rgba(100,116,139,0.1)",
      border: `1px solid ${isSuccess ? "rgba(22,163,74,0.3)" : "rgba(100,116,139,0.3)"}`,
      borderRadius: 8, padding: "9px 13px", marginBottom: 14, fontSize: 12.5, color: "#E2E8F0",
    }}>
      {msg}
    </div>
  );
}