import React, { useMemo, useState } from 'react'
import { createField } from './form/FieldFactory.jsx'

const statusOptions = [
  { value: 'open', label: '開放中' },
  { value: 'draft', label: '草稿' },
  { value: 'closed', label: '已結束' },
]

function validate(values) {
  const errors = {}
  if (!values.title?.trim()) errors.title = '請輸入活動名稱'
  if (!values.date?.trim()) errors.date = '請輸入日期（例如 2026-01-10）'
  if (!values.location?.trim()) errors.location = '請輸入地點'
  if (values.quota && Number(values.quota) < 1) errors.quota = '名額需 >= 1'
  return errors
}

export function EventForm({ initialValue, onSubmit, submittingText = '儲存' }) {
  const init = useMemo(() => ({
    title: '',
    date: '',
    location: '',
    quota: 30,
    status: 'open',
    description: '',
    ...initialValue,
  }), [initialValue])

  const [values, setValues] = useState(init)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function set(k, v) {
    setValues((s) => ({ ...s, [k]: v }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate(values)
    setErrors(e2)
    if (Object.keys(e2).length) return

    setSubmitting(true)
    try {
      await onSubmit?.({
        ...values,
        quota: Number(values.quota),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="label">活動名稱 *</div>
          {createField('text', { value: values.title, onChange: e => set('title', e.target.value), placeholder: '例如：期末專題 Demo Day' })}
          {errors.title && <div className="mt-1 text-xs font-semibold text-rose-600">{errors.title}</div>}
        </div>
        <div>
          <div className="label">日期 *</div>
          {createField('text', { value: values.date, onChange: e => set('date', e.target.value), placeholder: 'YYYY-MM-DD' })}
          {errors.date && <div className="mt-1 text-xs font-semibold text-rose-600">{errors.date}</div>}
        </div>
        <div>
          <div className="label">地點 *</div>
          {createField('text', { value: values.location, onChange: e => set('location', e.target.value), placeholder: '例如：淡江大學 E201' })}
          {errors.location && <div className="mt-1 text-xs font-semibold text-rose-600">{errors.location}</div>}
        </div>
        <div>
          <div className="label">名額</div>
          {createField('number', { value: values.quota, onChange: e => set('quota', e.target.value), min: 1 })}
          {errors.quota && <div className="mt-1 text-xs font-semibold text-rose-600">{errors.quota}</div>}
        </div>
        <div>
          <div className="label">狀態</div>
          {createField('select', {
            value: values.status,
            onChange: e => set('status', e.target.value),
            options: statusOptions,
          })}
        </div>
      </div>

      <div>
        <div className="label">描述</div>
        {createField('textarea', { value: values.description, onChange: e => set('description', e.target.value), placeholder: '可簡述活動內容、注意事項…' })}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button disabled={submitting} className="btn-primary btn">
          {submitting ? '處理中…' : submittingText}
        </button>
      </div>
    </form>
  )
}
