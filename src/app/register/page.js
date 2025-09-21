'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: form.username,
        email: form.email,
        password: form.password
      })
      console.log('Registration successful:', response.data)

      // Optional: reset form, close modal, or redirect
      setForm({ username: '', email: '', password: '' })
      setIsOpen(false)
      router.push('/login')
    } catch (error) {
      if (error.response) {
        console.error('Registration error:', error.response.data)
        setError(error.response.data)
      } else if (error.request) {
        console.error('No response received:', error.request)
        setError({ error: ['No response from server. Is the backend running?'] })
      } else {
        console.error('Error setting up request:', error.message)
        setError({ error: [error.message] })
      }
    }
  }

  return (
    <>
      {/* Centered Button */}
      <div className="button-container">
        <button onClick={() => setIsOpen(true)} className="open-button">
          Register
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>

              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />

              <button type="submit">Register</button>
            </form>

            {/* Error display */}
            {error && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {Object.entries(error).map(([field, messages]) => (
                  <div key={field}>
                    <strong>{field}:</strong> {messages.join(', ')}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
