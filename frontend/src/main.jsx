import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import { EventsProvider } from './state/eventsStore.jsx'
import { ToastProvider } from './state/toastStore.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <EventsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EventsProvider>
    </ToastProvider>
  </React.StrictMode>,
)
