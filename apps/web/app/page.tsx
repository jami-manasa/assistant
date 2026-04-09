import Link from "next/link";

export default function HomePage() {
  return (
    <main className="auth-shell">
      <section className="auth-hero">
        <p className="eyebrow">Startup-Grade ERP Platform</p>
        <h1>Unlitimate Transpo</h1>
        <p className="muted">
          A production-ready transport management platform architecture for bookings,
          customers, vehicles, drivers, invoicing, payments, maintenance, and finance.
        </p>
        <div className="hero-points">
          <div className="hero-point">Secure role-based access for admin, operations, accounts, and dispatch teams.</div>
          <div className="hero-point">Cloud-ready backend with PostgreSQL, Redis, JWT auth, validation, and audit-friendly entities.</div>
          <div className="hero-point">Modern dashboard foundation for startup teams building transport SaaS seriously.</div>
        </div>
      </section>

      <section className="auth-form">
        <div className="auth-card stack">
          <div>
            <p className="eyebrow">Access Platform</p>
            <h2>Sign in to dashboard</h2>
            <p className="muted">Use the login flow first, then continue to the operations dashboard.</p>
          </div>
          <Link className="primary" href="/login">
            Go to Login
          </Link>
          <Link className="secondary" href="/dashboard">
            View Product Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
