import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App frame="login"/>} />
        <Route path="/appointments" element={<App frame="appointments"/>} />
        <Route path="/book-appointment" element={<App frame="booking"/>} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
