import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <p className="eyebrow">Welcome Back</p>
        <h1>Secure access for your transport team.</h1>
        <p className="muted">
          Protect operations with role-based access, strong session handling, and secure APIs for every module.
        </p>
      </section>

      <section className="auth-form">
        <form className="auth-card stack">
          <div>
            <p className="eyebrow">Login</p>
            <h2>Unlitimate Transpo</h2>
          </div>

          <label className="field">
            <span>Email</span>
            <input type="email" placeholder="admin@company.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" placeholder="Enter your password" />
          </label>
          <label className="field">
            <span>Role</span>
            <select defaultValue="admin">
              <option value="admin">Admin</option>
              <option value="operations">Operations</option>
              <option value="accounts">Accounts</option>
              <option value="dispatch">Dispatch</option>
            </select>
          </label>

          <Link className="primary" href="/dashboard">
            Sign In
          </Link>
        </form>
      </section>
    </main>
  );
}
