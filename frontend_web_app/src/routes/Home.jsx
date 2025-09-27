// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page showing agent and admin login entry points. */
  return (
    <section className="space-y-6">
      <div className="p-6 card">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>
        <p className="text-gray-600 mt-2">
          Access agent and admin tools for tourist registrations, renewals, and incident management.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/login" className="btn-primary">Agent/Admin Login</a>
          <a href="/register" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50">
            Registration
          </a>
        </div>
      </div>

      <div className="p-6 card gradient-ocean">
        <h3 className="text-lg font-semibold text-gray-900">Ocean Professional Theme</h3>
        <p className="text-gray-700">
          Blue primary with amber accents, subtle shadows, rounded corners, and a minimalist design.
        </p>
      </div>
    </section>
  );
}
