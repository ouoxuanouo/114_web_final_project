import React from 'react'
import { Link } from 'react-router-dom'

function statusLabel(status) {
  if (status === 'draft') return { text: '草稿', cls: 'bg-slate-100 text-slate-700' }
  if (status === 'closed') return { text: '已結束', cls: 'bg-rose-50 text-rose-700 border-rose-100' }
  return { text: '開放中', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
}

export function EventCard({ item }) {
  const s = statusLabel(item.status)
  return (
    <Link to={`/events/${item._id}`} className="card block p-5 hover:-translate-y-0.5 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-extrabold tracking-tight">{item.title}</div>
          <div className="mt-1 text-sm text-slate-600">
            <span className="mr-3">📅 {item.date}</span>
            <span>📍 {item.location}</span>
          </div>
        </div>
        <span className={`chip ${s.cls}`}>{s.text}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
        <div>名額：<span className="font-semibold text-slate-900">{item.quota}</span></div>
        <div className="text-right">更新：<span className="font-semibold text-slate-900">{new Date(item.updatedAt).toLocaleDateString()}</span></div>
      </div>

      {item.description?.trim() && (
        <div className="mt-4 line-clamp-2 text-sm text-slate-600">{item.description}</div>
      )}
    </Link>
  )
}
