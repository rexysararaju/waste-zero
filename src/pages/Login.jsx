import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setError('Check your email to confirm your account!')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EBF4EC' }}>
      <div className="bg-white p-8 rounded-2xl w-full max-w-md" style={{ border: '0.5px solid #A8C5A0' }}>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#4A7C59' }}>Waste Zero</h1>
          <p className="text-sm" style={{ color: '#74A57F' }}>Track food. Reduce waste.</p>
        </div>

        {error && (
          <p className="text-sm mb-4 p-3 rounded-lg" style={{ backgroundColor: '#EBF4EC', color: '#4A7C59' }}>
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#4A7C59' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-2 text-sm outline-none"
              style={{ border: '1px solid #A8C5A0', backgroundColor: '#fff' }}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#4A7C59' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-2 text-sm outline-none"
              style={{ border: '1px solid #A8C5A0', backgroundColor: '#fff' }}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm font-medium transition"
            style={{ backgroundColor: '#4A7C59', color: '#fff' }}
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-2 rounded-lg text-sm font-medium transition"
            style={{ backgroundColor: '#fff', color: '#4A7C59', border: '1px solid #4A7C59' }}
          >
            {loading ? 'Loading...' : 'Create Account'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login