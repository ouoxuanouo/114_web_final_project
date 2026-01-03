import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="card p-10 text-center">
      <div className="text-2xl font-extrabold">404</div>
      <div className="mt-2 text-slate-600">找不到頁面</div>
      <Link to="/events" className="btn-primary btn mt-6">回活動列表</Link>
    </div>
  )
}
