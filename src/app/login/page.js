'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setForm({ username: '', password: '' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post('/login/', form);
      localStorage.setItem('token', res.data.token);

      const userRes = await api.get('/user/', {
        headers: { Authorization: `Token ${res.data.token}` },
      });
      localStorage.setItem('user', JSON.stringify(userRes.data));

      setForm({ username: '', password: '' });
      router.push('/');
      router.refresh();
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <input
            name="username"
            autoComplete="new-username"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don’t have an account?{' '}
          <Link href="/register">Register here</Link>
        </p>
      </div>

      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem;
          background: #f7f7f7;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h2 {
          margin-bottom: 1rem;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background-color: #0070f3;
          color: white;
          padding: 10px;
          font-weight: bold;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #005bb5;
        }
        .register-link {
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .register-link a {
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
