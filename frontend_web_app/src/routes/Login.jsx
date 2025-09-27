// PUBLIC_INTERFACE
export default function Login() {
  /** Simple login placeholder form for agent/admin */
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 card">
        <h2 className="text-xl font-semibold text-gray-900">Login</h2>
        <p className="text-gray-600 mt-1">Agent and Admin authentication</p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="Enter password" />
          </div>
          <button type="button" className="btn-primary w-full">Sign in</button>
        </form>
      </div>
      <div className="p-6 card">
        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
          <li>Supports Agent and Admin roles.</li>
          <li>OTP and sessions integrate later with the backend.</li>
        </ul>
      </div>
    </div>
  );
}
