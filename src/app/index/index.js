import { useEffect, useState } from 'react'
import api from '../utils/api'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get('/posts/').then(res => setPosts(res.data))
  }, [])

  return (
    <>
      <h1>Campus Creatives</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}
