function AuthLayout({ tab, children }) {
  const isRegister = tab === "register";
  const panelLeft = isRegister ? "0" : "58%";
  const panelClip = isRegister
    ? "polygon(0 0, 87% 0, 100% 100%, 0 100%)"
    : "polygon(13% 0, 100% 0, 100% 100%, 0 100%)";

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
        select option { background: #0F172A; color: #FFFFFF; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-card {
          width: 100%; max-width: 900px; min-height: 500px; border-radius: 22px;
          border: 2px solid #00BCD4;
          -webkit-box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.12), 0 0 60px rgba(37, 99, 235, 0.28), 0 24px 80px rgba(0,0,0,0.5);
          display: flex; overflow: visible; position: relative;
        }
        .form-side {
          flex: 1; background: #0F172A; display: flex; flex-direction: column;
          justify-content: center; padding: 40px 52px; position: relative; z-index: 1;
          min-width: 0; border-radius: 20px; overflow: hidden;
        }
        .form-side.reg-form { padding: 28px 44px; }

        .purple-panel {
          position: absolute; top: 0; bottom: 0; width: 42%;
          background: linear-gradient(155deg, #00BCD4, #00BCD4 60%, #00BCD4 100%);
          display: flex; flex-direction: column; justify-content: center;
          padding: 48px 40px; color: #FFFFFF; z-index: 10; border-radius: 18px;
          align-items: center; text-align: center;
        }

        .purple-btn {
          width: 100%; padding: 13px 0;
          background: linear-gradient(90deg, #00BCD4, #00BCD4);
          border: none; border-radius: 50px; color: #FFFFFF; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: inherit; display: flex; align-items: center;
          justify-content: center; gap: 8px; box-shadow: 0 4px 22px #00BCD4;
          margin-top: 8px; transition: opacity .2s;
        }
        .purple-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .purple-btn:hover:not(:disabled) { opacity: 0.9; }

        .spinner {
          width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #FFFFFF; border-radius: 50%; animation: spin .8s linear infinite;
          display: inline-block;
        }

        .link-btn { background: none; border: none; color: #00BCD4; font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px; }

        @media (max-width: 640px) {
          .auth-card { flex-direction: column; min-height: unset; overflow: hidden !important; border-radius: 22px !important; }
          .purple-panel { position: relative !important; left: auto !important; width: 100% !important; clip-path: none !important; -webkit-clip-path: none !important; border-radius: 0 !important; min-height: 160px; padding: 28px 24px !important; }
          .form-side, .form-side.reg-form { padding: 24px 20px !important; }
        }
      `}</style>

      <div className="auth-card">
        <div
          className={`form-side${isRegister ? " reg-form" : ""}`}
          style={{
            paddingLeft: isRegister ? "44%" : "52px",
            paddingRight: isRegister ? "44px" : "44%",
          }}
        >
          {children}
        </div>

        <div className="purple-panel" style={{ left: panelLeft, clipPath: panelClip }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px", color: "#FFFFFF" }}>
            WELCOME<br />BACK!
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, marginBottom: 30, maxWidth: 250 }}>
            Manage your workspace efficiently
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;