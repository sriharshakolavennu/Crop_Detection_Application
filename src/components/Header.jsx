import React, {useState, useEffect, useRef} from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function IconBell(){
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M15 17H9v-5a3 3 0 10-6 0v5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
}

export default function Header(){
  const [listening,setListening] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const [query,setQuery] = useState('')
  const recognitionRef = useRef(null)

  useEffect(()=>{
    if(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)){
      const R = window.SpeechRecognition || window.webkitSpeechRecognition
      const rec = new R()
      rec.lang = lang === 'en' ? 'en-US' : 'te-IN'
      rec.interimResults = false
      rec.onresult = (e)=>{
        const txt = e.results[0][0].transcript
        setQuery(txt)
        setListening(false)
        rec.stop()
      }
      rec.onend = ()=> setListening(false)
      recognitionRef.current = rec
    }
  },[lang])

  function startVoice(){
    const rec = recognitionRef.current
    if(!rec) return alert('Voice not supported in this browser')
    setListening(true)
    rec.start()
  }

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  

  return (
    <header className="premium-header">
      <div className="premium-header-inner container">
        <div className="brand-left">
          <div className="logo-gradient">
            <span className="logo-emoji">🌿</span>
          </div>
          <div className="title-large">CropCare</div>
        </div>

        <div className="search-center">
          <div className="search-input">
            <input aria-label={t('header.searchPlaceholder')} value={query} onChange={e=>setQuery(e.target.value)} placeholder={t('header.searchPlaceholder')} />
            <button className="btn-voice-inside" onClick={startVoice} aria-label="Voice Search">🎤</button>
          </div>
        </div>

        <div className="header-actions">
          <LanguageSwitcher lang={lang} onChange={setLang} />
          <button className="icon-btn" aria-label={t('header.notifications')}><IconBell /></button>
          <div className="profile">
            <Link to="/profile"><img alt="User" src={user?.avatar || 'https://via.placeholder.com/40'} /></Link>
            <div className="profile-name">{user?.name || t('header.profile')}</div>
            {user && (
              <div className="profile-menu">
                <button className="btn-secondary" onClick={()=> navigate('/profile')}>{t('header.profile')}</button>
                <button className="btn-secondary" onClick={logout}>{t('header.logout')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
