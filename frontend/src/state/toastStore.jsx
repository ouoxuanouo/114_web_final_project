import React, { createContext, useContext, useMemo, useState } from 'react'

const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function push(type, text) {
    const id = crypto.randomUUID()
    const t = { id, type, text }
    setToasts((s) => [...s, t])
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3200)
  }

  const value = useMemo(() => ({
    toast: {
      success: (t) => push('success', t),
      error: (t) => push('error', t),
      info: (t) => push('info', t),
    }
  }), [])

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[92vw] max-w-sm flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id} className={`card px-4 py-3 ${t.type === 'error' ? 'border-rose-200' : 'border-slate-100'}`}>
            <div className="text-sm font-semibold">
              {t.type === 'success' && '✅ '}
              {t.type === 'error' && '⚠️ '}
              {t.type === 'info' && 'ℹ️ '}
              {t.text}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('ToastProvider missing')
  return ctx.toast
}
