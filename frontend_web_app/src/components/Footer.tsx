export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <div>© {new Date().getFullYear()} Ministry of Tourism. All rights reserved.</div>
        <div className="flex gap-4">
          <a className="hover:text-text" href="#">Privacy</a>
          <a className="hover:text-text" href="#">Terms</a>
          <a className="hover:text-text" href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}
