import React, {useState} from 'react'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Login(){
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')
  const [remember,setRemember] = useState(false)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const auth = useAuth()

  async function submit(e){
    e.preventDefault()
    setLoading(true); setError(null)
    try{
      const res = await api.auth.login({email: mobile, password})
      auth.login(res)
    }catch(e){ setError(e.error || 'Login failed') }
    setLoading(false)
  }

  return (
    <div className="auth-page container">
      <form className="auth-card card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <label>Mobile or Email
          <input value={mobile} onChange={e=>setMobile(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <div className="auth-actions">
          <label><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember Me</label>
          <Link to="/verify-otp">Login with OTP</Link>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="auth-buttons">
          <button className="btn-primary" type="submit">{loading? 'Logging...' : 'Login'}</button>
          <Link to="/signup" className="btn-secondary">Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
