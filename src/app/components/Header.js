'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header({ darkMode, toggleTheme }) {
  const [token, setToken] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // or return a loading placeholder

  return (
    <header className={styles.header}>
      <Link href="/">Campus Magazine</Link>
      <nav>
        {token ? (
          <>
            <Link href="/newpost">New Post</Link>
            <button onClick={() => {
              localStorage.removeItem('token')
              location.reload()
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <button onClick={toggleTheme}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}
