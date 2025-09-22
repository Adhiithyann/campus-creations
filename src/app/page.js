'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- for redirect
import Header from './components/Header';
import PostCard from './components/PostCard';
import api from '@/utils/api';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // 🔒 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  // 🌙 Load theme
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    document.body.classList.toggle('dark', isDark);
  }, []);

  // 📰 Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts/');
        console.log('Fetched posts:', res.data);
        setPosts(res.data.results || []); // if using pagination
      } catch (err) {
        console.error('Error fetching posts:', err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (deletedId) => {
    setPosts(prev => prev.filter(p => p.id !== deletedId));
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', newMode);
  };

  return (
    <>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="container">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
