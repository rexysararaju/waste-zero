import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Login from './pages/Login'

function App() {
  const [session, setSession] = useState(null) 
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { 
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EBF4EC' }}>
    <p style={{ color: '#4A7C59' }}>Loading...</p>
  </div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={session ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={session ? <div>Dashboard — coming soon!</div> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App