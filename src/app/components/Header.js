import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header({ darkMode, toggleTheme }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return (
    <header className={styles.header}>
      <Link href="/">Campus Magazine</Link>
      <nav>
        {token ? (
          <>
            <Link href="/newpost">New Post</Link>
            <button onClick={() => { localStorage.removeItem('token'); location.reload(); }}>Logout</button>
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
