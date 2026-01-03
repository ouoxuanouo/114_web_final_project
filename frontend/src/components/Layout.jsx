import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Layout({ children }) {
  const loc = useLocation()
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/events" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-soft">E</div>
            <div>
              <div className="text-base font-extrabold tracking-tight">Eventify</div>
              <div className="text-xs text-slate-500">活動管理 CRUD 系統</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/events"
              className={`btn ${loc.pathname.startsWith('/events') ? 'bg-slate-900 text-white' : 'btn-ghost'}`}
            >
              活動列表
            </Link>
            <a
              className="btn-ghost btn"
              href="http://localhost:3001/health"
              target="_blank"
              rel="noreferrer"
              title="後端健康檢查"
            >
              API
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Eventify — React + Express + MongoDB
        </div>
      </footer>
    </div>
  )
}
