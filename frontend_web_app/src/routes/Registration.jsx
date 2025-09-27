// PUBLIC_INTERFACE
export default function Registration() {
  /** Tourist registration placeholder form with Ocean Professional styling */
  return (
    <div className="p-6 card">
      <h2 className="text-xl font-semibold text-gray-900">Tourist Registration</h2>
      <p className="text-gray-600 mt-1">Register tourists and simulate blockchain ID issuance.</p>

      <form className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Full Name</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Passport Number</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="X1234567" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Nationality</label>
          <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="Country" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary" placeholder="jane@example.com" />
        </div>
        <div className="md:col-span-2">
          <button type="button" className="btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}
