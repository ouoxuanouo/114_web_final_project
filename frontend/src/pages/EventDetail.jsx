import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEvents } from '../state/eventsStore.jsx'
import { useToast } from '../state/toastStore.jsx'
import { Modal } from '../components/Modal.jsx'
import { EventForm } from '../components/EventForm.jsx'

function statusBadge(status) {
  if (status === 'draft') return 'chip bg-slate-100 text-slate-700'
  if (status === 'closed') return 'chip bg-rose-50 text-rose-700 border-rose-100'
  return 'chip bg-emerald-50 text-emerald-700 border-emerald-100'
}

export default function EventDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const { actions } = useEvents()

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [err, setErr] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const title = useMemo(() => item?.title || '活動詳情', [item])

  useEffect(() => {
    let alive = true
    async function run() {
      setLoading(true)
      setErr(null)
      try {
        const d = await actions.getEvent(id)
        if (alive) setItem(d)
      } catch (e) {
        if (alive) setErr(e.message)
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [id])

  async function onUpdate(payload) {
    try {
      const d = await actions.updateEvent(id, payload)
      setItem(d)
      setEditOpen(false)
      toast.success('更新成功')
    } catch (e) {
      toast.error(e.message)
    }
  }

  async function onDelete() {
    const ok = window.confirm('確定要刪除這筆活動？（此操作無法復原）')
    if (!ok) return
    setDeleting(true)
    try {
      await actions.deleteEvent(id)
      toast.success('刪除成功')
      nav('/events')
    } catch (e) {
      toast.error(e.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="card p-8">讀取中…</div>
  }
  if (err) {
    return (
      <div className="card p-8">
        <div className="text-lg font-extrabold">找不到資料</div>
        <div className="mt-2 text-slate-600">{err}</div>
        <Link to="/events" className="btn-primary btn mt-5">回列表</Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link to="/events" className="btn-ghost btn">← 回列表</Link>
        <div className="flex items-center gap-2">
          <button className="btn-primary btn" onClick={() => setEditOpen(true)}>✎ 編輯</button>
          <button disabled={deleting} className="btn-danger btn" onClick={onDelete}>
            {deleting ? '刪除中…' : '🗑 刪除'}
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="text-2xl font-extrabold tracking-tight">{title}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span>📅 {item.date}</span>
              <span>📍 {item.location}</span>
              <span>👥 名額 {item.quota}</span>
              <span className={statusBadge(item.status)}>{item.status}</span>
            </div>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div>建立：{new Date(item.createdAt).toLocaleString()}</div>
            <div>更新：{new Date(item.updatedAt).toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="label">描述</div>
          <div className="mt-2 whitespace-pre-wrap text-slate-700">
            {item.description?.trim() ? item.description : '（無）'}
          </div>
        </div>
      </div>

      <Modal open={editOpen} title="編輯活動" onClose={() => setEditOpen(false)}>
        <EventForm initialValue={item} onSubmit={onUpdate} submittingText="儲存變更" />
      </Modal>
    </div>
  )
}
