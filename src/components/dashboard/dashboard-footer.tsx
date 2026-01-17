export function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>© 2025 Acumen Haven. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>v1.0.0</span>
          <a
            href="/privacy"
            className="hover:text-gray-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
          <a href="/terms" className="hover:text-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
