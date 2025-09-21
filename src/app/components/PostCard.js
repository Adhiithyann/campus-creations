'use client'

import styles from '../styles/PostCard.module.css'
import api from '@/utils/api'
import { useState, useEffect } from 'react'

export default function PostCard({ post, onDelete }) {
  const [likes, setLikes] = useState(post.likes_count)
  const [hasLiked, setHasLiked] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return

    // Check if user is the post owner
    setIsOwner(user.id === post.author?.id)

    // Check if the user has liked this post (optional optimization via API)
    // For now, we assume the like count starts fresh on page load
    // You could improve this by including `user_has_liked` in your serializer

    
  }, [post])

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('You must be logged in to like a post.')
      return
    }

    try {
      await api.post('/likes/', { post: post.id }, {
        headers: { Authorization: `Token ${token}` }
      })

      // Toggle local state
      if (hasLiked) {
        setLikes(prev => prev - 1)
      } else {
        setLikes(prev => prev + 1)
      }
      setHasLiked(!hasLiked)

    } catch (err) {
      console.error('Like toggle error:', err)
      alert('Something went wrong while toggling like.')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/posts/${post.id}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      onDelete?.(post.id)
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  return (
    <div className={styles.card}>
      <h3>{post.title}</h3>
      <p>by {post.author?.username}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <p>{post.content}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={handleLikeToggle}>
          {hasLiked ? '💔 Dislike' : '❤️ Like'}
        </button>
        <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>

        {isOwner && (
          <button onClick={handleDelete} style={{ marginLeft: 'auto' }}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  )
}
