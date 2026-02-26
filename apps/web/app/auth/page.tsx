export default function AuthPage() {
  return (
    <section className="mx-auto max-w-md py-10">
      <div className="card p-6">
        <h1 className="text-xl font-semibold text-slate-900">Authentication</h1>
        <p className="mt-1 text-sm text-muted">JWT + Google OAuth ready flow</p>
        <div className="mt-5 space-y-3">
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Password" type="password" />
          <button className="btn-primary w-full">Continue</button>
          <button className="btn-secondary w-full">Sign in with Google</button>
        </div>
      </div>
    </section>
  );
}
