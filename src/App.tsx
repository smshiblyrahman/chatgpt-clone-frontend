import React from "react";

const providerIcons = {
  google: "https://ext.same-assets.com/3406794717/3822748384.svg",
  microsoft: "https://ext.same-assets.com/3406794717/233473847.svg",
  apple: "https://ext.same-assets.com/3406794717/2952312236.svg",
  phone: "https://www.svgrepo.com/show/533014/phone.svg", // fallback phone icon
};

function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #eee",
        borderRadius: 8,
        padding: "0.75rem 1rem",
        width: "100%",
        fontSize: 16,
        background: "#fff",
        marginBottom: 12,
        fontWeight: 500,
        cursor: "pointer",
      }}
      type="button"
      tabIndex={0}
    >
      <img
        src={icon}
        alt=""
        style={{ width: 22, height: 22, marginRight: 12, flexShrink: 0 }}
      />
      <span>{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        width: "100vw",
        fontFamily:
          '"Inter", "Open Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Top left logo */}
      <div style={{ padding: 24, fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
        ugpt
      </div>
      {/* Centered login box */}
      <div
        style={{
          maxWidth: 370,
          margin: "40px auto 0 auto",
          padding: "40px 24px 24px 24px",
          borderRadius: 18,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.02)",
          background: "#fff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 28,
            letterSpacing: -1,
          }}
        >
          Welcome to ugpt
        </h1>
        <form autoComplete="on" style={{ marginBottom: 20 }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: 15,
              color: "#222",
              marginBottom: 4,
            }}
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "11px 14px",
              fontSize: 16,
              borderRadius: 7,
              border: "1.5px solid #000",
              outline: "none",
              marginBottom: 18,
              background: "#fff",
              color: "#222",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.85rem 0",
              background: "#000",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              marginBottom: 12,
              transition: "background 0.2s",
            }}
            tabIndex={0}
            disabled
            title="Submit disabled: Demo UI only."
          >
            Continue
          </button>
        </form>
        <div style={{ textAlign: "center", color: "#222", fontSize: 15, marginBottom: 18 }}>
          Don&apos;t have an account?{' '}
          <button
            style={{
              color: "#000",
              textDecoration: "underline",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              cursor: "pointer",
            }}
            tabIndex={0}
          >
            Sign up
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", margin: "22px 0 16px 0" }}>
          <hr style={{ flex: 1, borderTop: "1px solid #eee" }} />
          <span style={{ padding: "0 12px", color: "#888", fontSize: 15 }}>OR</span>
          <hr style={{ flex: 1, borderTop: "1px solid #eee" }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <SocialButton icon={providerIcons.google} label="Continue with Google" />
          <SocialButton icon={providerIcons.microsoft} label="Continue with Microsoft Account" />
          <SocialButton icon={providerIcons.apple} label="Continue with Apple" />
          <SocialButton icon={providerIcons.phone} label="Continue with phone" />
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          width: "100vw",
          textAlign: "center",
          fontSize: 15,
          color: "#169",
        }}
      >
        <a
          href="/terms"
          style={{ color: "#169", margin: "0 8px" }}
          tabIndex={0}
        >
          Terms of Use
        </a>
        |
        <a
          href="/privacy"
          style={{ color: "#169", margin: "0 8px" }}
          tabIndex={0}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
