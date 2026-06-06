import React, {useState} from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function VerifyOtp(){
  const [mobile,setMobile] = useState('')
  const [code,setCode] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  async function send(){
    setLoading(true); setError(null)
    try{
      const res = await api.auth.sendOtp({mobile})
      // for dev the API returns otp
      alert('OTP sent: ' + (res.otp || ''))
    }catch(e){ setError(e.error || 'Failed to send OTP') }
    setLoading(false)
  }

  async function verify(){
    setLoading(true); setError(null)
    try{
      const res = await api.auth.verifyOtp({mobile,code})
      // store token locally and redirect
      localStorage.setItem('cropcare_token', res.token)
      localStorage.setItem('cropcare_user', JSON.stringify(res.user))
      navigate('/dashboard')
    }catch(e){ setError(e.error || 'Verification failed') }
    setLoading(false)
  }

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <h2>OTP Verification</h2>
        <label>Mobile Number
          <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="e.g. 919876543210" />
        </label>
        <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
          <input value={code} onChange={e=>setCode(e.target.value)} placeholder="6-digit code" />
          <button className="btn-secondary" onClick={send} disabled={loading}>{loading? '...' : 'Send OTP'}</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{marginTop:12}}>
          <button className="btn-primary" onClick={verify}>Verify OTP</button>
        </div>
      </div>
    </div>
  )
}
