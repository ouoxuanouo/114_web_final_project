import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { api, unwrap } from '../lib/api.js'

const EventsCtx = createContext(null)

const initial = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  query: { q: '', sort: 'createdAt', order: 'desc' },
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true, error: null }
    case 'loaded':
      return { ...state, loading: false, items: action.payload.items, total: action.payload.total }
    case 'error':
      return { ...state, loading: false, error: action.payload }
    case 'setQuery':
      return { ...state, query: { ...state.query, ...action.payload } }
    default:
      return state
  }
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  async function fetchEvents(customQuery) {
    const q = customQuery || state.query
    dispatch({ type: 'loading' })
    try {
      const data = await unwrap(api.get('/api/events', { params: q }))
      dispatch({ type: 'loaded', payload: data })
    } catch (e) {
      dispatch({ type: 'error', payload: e.message })
    }
  }

  async function createEvent(payload) {
    return await unwrap(api.post('/api/events', payload))
  }

  async function updateEvent(id, payload) {
    return await unwrap(api.put(`/api/events/${id}`, payload))
  }

  async function deleteEvent(id) {
    return await unwrap(api.delete(`/api/events/${id}`))
  }

  async function getEvent(id) {
    return await unwrap(api.get(`/api/events/${id}`))
  }

  useEffect(() => { fetchEvents() }, [state.query.q, state.query.sort, state.query.order])

  const value = useMemo(() => ({
    state,
    dispatch,
    actions: { fetchEvents, createEvent, updateEvent, deleteEvent, getEvent }
  }), [state])

  return <EventsCtx.Provider value={value}>{children}</EventsCtx.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsCtx)
  if (!ctx) throw new Error('EventsProvider missing')
  return ctx
}
