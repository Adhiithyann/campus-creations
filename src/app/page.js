"use client"

import './globals.css'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'
import api from '@/utils/api'

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDarkMode(isDark)
    document.body.classList.toggle('dark', isDark)

    // 🔽 Fetch posts
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts/')
        setPosts(res.data)
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }

    fetchPosts()
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    document.body.classList.toggle('dark', newMode)
  }

  return (
    <>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="container">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
