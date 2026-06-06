import React, {useState} from 'react'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

export default function OTPModal({mobile,onClose,onVerified}){
  const [code,setCode] = useState('')
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  async function verify(){
    setLoading(true); setError(null)
    try{
      const res = await api.auth.verifyOtp({mobile,code})
      onVerified && onVerified(res)
    }catch(e){ setError(e.error || 'Verification failed') }
    setLoading(false)
  }

  const { t } = useLanguage()

  return (
    <div className="otp-modal card">
      <h4>{t('otp.enterFor',{mobile})}</h4>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder={t('otp.codePlaceholder')} />
      {error && <div className="error">{error}</div>}
      <div className="otp-actions">
        <button className="btn-secondary" onClick={onClose}>{t('otp.cancel')}</button>
        <button className="btn-primary" onClick={verify} disabled={loading}>{loading? t('otp.verifying') : t('otp.verify')}</button>
      </div>
    </div>
  )
}
