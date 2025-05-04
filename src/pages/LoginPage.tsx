import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const providerIcons = {
  google: "https://ext.same-assets.com/3406794717/3822748384.svg",
  microsoft: "https://ext.same-assets.com/3406794717/233473847.svg",
  apple: "https://ext.same-assets.com/3406794717/2952312236.svg",
  phone: "https://www.svgrepo.com/show/533014/phone.svg", // fallback phone icon
};

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
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
        transition: "all 0.2s ease",
      }}
      type="button"
      tabIndex={0}
      onClick={onClick}
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo, we'll just redirect to /chat
      setIsLoading(false);
      navigate("/chat");
    }, 1500);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        width: "100%",
        fontFamily:
          '"Inter", "Open Sans", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Top left logo and tagline */}
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
          ugpt
        </div>
        <div style={{ fontSize: 15, color: "#666", marginTop: 4 }}>
          Your personal AI assistant
        </div>
      </div>

      {/* Centered login box */}
      <div
        style={{
          maxWidth: 370,
          margin: "20px auto 0 auto",
          padding: "40px 24px 24px 24px",
          borderRadius: 18,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.05)",
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
        <form onSubmit={handleLogin} autoComplete="on" style={{ marginBottom: 20 }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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
              transition: "background 0.2s, transform 0.1s",
              position: "relative",
              overflow: "hidden",
            }}
            tabIndex={0}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Continue"}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "30%",
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "skewX(-15deg)",
                  animation: "slide 1s infinite",
                }}
              />
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", color: "#222", fontSize: 15, marginBottom: 18 }}>
          Don't have an account?{' '}
          <button
            onClick={() => {
              setEmail("");
              // In a real app, we would redirect to signup page
              alert("In a full app, this would go to the signup page");
            }}
            style={{
              color: "#000",
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 15,
              padding: 0,
              fontFamily: "inherit"
            }}
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
          <SocialButton
            icon={providerIcons.google}
            label="Continue with Google"
            onClick={handleSocialLogin}
          />
          <SocialButton
            icon={providerIcons.microsoft}
            label="Continue with Microsoft Account"
            onClick={handleSocialLogin}
          />
          <SocialButton
            icon={providerIcons.apple}
            label="Continue with Apple"
            onClick={handleSocialLogin}
          />
          <SocialButton
            icon={providerIcons.phone}
            label="Continue with phone"
            onClick={handleSocialLogin}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          width: "100%",
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

      {/* Animation styles */}
      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(-100%) skewX(-15deg);
            }
            100% {
              transform: translateX(400%) skewX(-15deg);
            }
          }

          input:focus {
            border-color: #333;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
          }

          button:hover {
            opacity: 0.9;
          }

          button:active {
            transform: translateY(1px);
          }
        `}
      </style>
    </div>
  );
}
