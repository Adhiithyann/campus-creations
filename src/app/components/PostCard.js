// components/PostCard.js
'use client'

import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function PostCard({ post, onDelete }) {
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [hasLiked, setHasLiked] = useState(post.user_has_liked || false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && post && post.author) {
        setIsOwner(user.id === post.author.id);
      }
    }
  }, [post]);

  const handleLikeToggle = async () => {
    if (!localStorage.getItem('token')) {
      alert('Login first!');
      return;
    }
    try {
      const res = await api.post('/likes/', { post: post.id });
      // Backend logic toggles like / unlike
      if (hasLiked) {
        setLikesCount(prev => prev - 1);
      } else {
        setLikesCount(prev => prev + 1);
      }
      setHasLiked(!hasLiked);
    } catch (err) {
      console.error('Like toggle error:', err);
      alert('Could not toggle like.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/posts/${post.id}/`);
      onDelete(post.id);
    } catch (err) {
      console.error('Delete error:', err);
      alert('You can only delete your own post.');
    }
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>by {post.author?.username}</p>
      {post.image && (
        <img src={post.image} alt="Post image" style={{ maxWidth: '100%' }} />
      )}
      <p>{post.content}</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={handleLikeToggle}>
          {hasLiked ? '💔 Unlike' : '❤️ Like'}
        </button>
        <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>

        {isOwner && (
          <button onClick={handleDelete} style={{ marginLeft: 'auto' }}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}
