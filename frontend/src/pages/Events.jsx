import React, { useMemo, useState } from 'react'
import { useEvents } from '../state/eventsStore.jsx'
import { useToast } from '../state/toastStore.jsx'
import { Modal } from '../components/Modal.jsx'
import { EventForm } from '../components/EventForm.jsx'
import { EventCard } from '../components/EventCard.jsx'

export default function Events() {
  const { state, dispatch, actions } = useEvents()
  const toast = useToast()
  const [open, setOpen] = useState(false)

  const header = useMemo(() => ({
    title: '活動列表',
    subtitle: '管理活動資料（Create / Read / Update / Delete）',
  }), [])

  async function onCreate(payload) {
    try {
      await actions.createEvent(payload)
      toast.success('新增成功')
      setOpen(false)
      await actions.fetchEvents()
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="space-y-5">
      <div className="card p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="text-2xl font-extrabold tracking-tight">{header.title}</div>
            <div className="mt-1 text-sm text-slate-600">{header.subtitle}</div>
          </div>
          <button className="btn-primary btn" onClick={() => setOpen(true)}>＋ 新增活動</button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div>
            <div className="label">搜尋</div>
            <input
              className="input"
              placeholder="輸入關鍵字（活動名稱 / 地點）"
              value={state.query.q}
              onChange={(e) => dispatch({ type: 'setQuery', payload: { q: e.target.value } })}
            />
          </div>
          <div>
            <div className="label">排序</div>
            <select
              className="input"
              value={state.query.sort}
              onChange={(e) => dispatch({ type: 'setQuery', payload: { sort: e.target.value } })}
            >
              <option value="createdAt">建立時間</option>
              <option value="date">活動日期</option>
            </select>
          </div>
          <div>
            <div className="label">順序</div>
            <select
              className="input"
              value={state.query.order}
              onChange={(e) => dispatch({ type: 'setQuery', payload: { order: e.target.value } })}
            >
              <option value="desc">新 → 舊</option>
              <option value="asc">舊 → 新</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          共 <span className="font-extrabold text-slate-900">{state.total}</span> 筆
          {state.loading && <span className="ml-2">（讀取中…）</span>}
          {state.error && <span className="ml-2 text-rose-600">（{state.error}）</span>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {state.items.map((it) => <EventCard key={it._id} item={it} />)}
        {!state.loading && state.items.length === 0 && (
          <div className="card p-8 text-center text-slate-600 md:col-span-2">
            目前沒有資料。按右上角「新增活動」建立第一筆吧！
          </div>
        )}
      </div>

      <Modal open={open} title="新增活動" onClose={() => setOpen(false)}>
        <EventForm onSubmit={onCreate} submittingText="建立活動" />
      </Modal>
    </div>
  )
}
