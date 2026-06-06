import React, {useState} from 'react'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Signup(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const auth = useAuth()

  async function submit(e){
    e.preventDefault()
    if(password !== confirm){ setError('Passwords do not match'); return }
    setLoading(true); setError(null)
    try{
      const res = await api.auth.signup({name,email,mobile,password})
      auth.login(res)
    }catch(e){ setError(e.error || 'Signup failed') }
    setLoading(false)
  }

  return (
    <div className="auth-page container">
      <form className="auth-card card" onSubmit={submit}>
        <h2>Create Account</h2>
        <label>Full Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label>Mobile
          <input value={mobile} onChange={e=>setMobile(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <label>Confirm Password
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </label>
        {error && <div className="error">{error}</div>}
        <div className="auth-buttons">
          <button className="btn-primary" type="submit">{loading? 'Signing...' : 'Sign Up'}</button>
          <Link to="/login" className="btn-secondary">Back to Login</Link>
        </div>
      </form>
    </div>
  )
}
