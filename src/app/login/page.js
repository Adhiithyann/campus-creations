'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/login/', form)
      localStorage.setItem('token', res.data.token)

      
      const userRes = await api.get('/user/', {
        headers: { Authorization: `Token ${res.data.token}` }
      })
      localStorage.setItem('user', JSON.stringify(userRes.data))

      router.push('/')

      router.push('/')
    } catch (err) {
      console.error('Login failed:', err)
      alert('Login failed')
    }
  }

  return (
    <>
      {/* Centered Container */}
      <div className="button-container">
        <button onClick={() => setIsOpen(true)} className="open-button">
          Login
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <input
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`

      `}</style>
    </>
  )
}
