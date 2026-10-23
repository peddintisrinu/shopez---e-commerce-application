import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShoppingBag, ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setMessage("Please enter both your email and password.");
      return;
    }

    // Front-end demonstration only. Connect an authentication backend to sign in users.
    setMessage("This is a demo login form. Authentication is not connected yet.");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="logo login-logo" aria-label="ShopEZ home">
          <span className="logo-icon"><ShoppingBag size={24} /></span>
          Shop<span>EZ</span>
        </Link>

        <span className="eyebrow">WELCOME BACK</span>
        <h1>Sign in to ShopEZ</h1>
        <p className="login-intro">Sign in to continue exploring your shopping experience.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <div className="login-input-wrap">
            <Mail size={18} />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="login-password">Password</label>
          <div className="login-input-wrap">
            <LockKeyhole size={18} />
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-button login-submit">Sign In</button>
          {message && <p className="login-message" role="status">{message}</p>}
        </form>

        <button type="button" className="login-back" onClick={() => navigate("/")}>
          <ArrowLeft size={17} /> Back to shopping
        </button>
        <p className="login-demo-note">Demo only — this form does not create accounts or verify credentials yet.</p>
      </section>
    </main>
  );
}
