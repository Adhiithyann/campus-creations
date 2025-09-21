'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'
import styles from './NewPost.module.css'

export default function NewPost() {
  const [form, setForm] = useState({ title: '', content: '', image: null })
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
console.log('Token being sent:', token);

    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('content', form.content)
    if (form.image) formData.append('image', form.image)

  const token = localStorage.getItem('token') 

await api.post('/posts/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${token}`   
  }
})


console.log('Token:', token)
localStorage.getItem('token')


    

    setShowModal(false)
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <button className={styles.centerButton} onClick={() => setShowModal(true)}>
        Create New Post
      </button>

      {showModal && (
        <>
          <div className={styles.overlay} onClick={() => setShowModal(false)}></div>
          <div className={styles.modal}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2>Create Post</h2>
             
              <input
                type="text"
                className={styles.textInput}
                placeholder="Title"
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                className={styles.textInput}
                placeholder="Content"
                onChange={e => setForm({ ...form, content: e.target.value })}
              />

              <input
                type="file"
                className={styles.fileInput}
                onChange={e => setForm({ ...form, image: e.target.files[0] })}
              />

              <div className={styles.actions}>
                <button type="submit" className={styles.submitButton}>Post</button>
                <button type="button" className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
              </div>

            </form>
          </div>
        </>
      )}
    </div>
  )
}
