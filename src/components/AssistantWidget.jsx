import React, {useState} from 'react'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

export default function AssistantWidget(){
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  async function send(){
    if(!text) return
    setMessages(m=>[...m,{from:'user',text}])
    setLoading(true)
    try{
      const res = await api.chat.send(text)
      setMessages(m=>[...m,{from:'user',text},{from:'bot',text:res.reply}])
    }catch(e){
      setMessages(m=>[...m,{from:'bot',text:t('errors.assistantError')}])
    }finally{setLoading(false);setText('')}
  }

  //const { t } = useLanguage()

  return (
    <div className={`assistant ${open? 'open':''}`} aria-live="polite">
      <button className="assistant-toggle" onClick={()=>setOpen(!open)} aria-label="Ask CropCare AI">
        {t('assistant.title')}
      </button>
      {open && (
        <div className="assistant-panel">
          <div className="assistant-header">{t('assistant.title')}</div>
          <div className="assistant-body">
            <div className="assistant-messages">
              {messages.map((m,i)=> (
                <div key={i} className={`msg ${m.from}`}>{m.text}</div>
              ))}
            </div>
            <input value={text} onChange={e=>setText(e.target.value)} placeholder={t('assistant.placeholder')} aria-label="AI question" />
            <div className="assistant-actions">
              <button className="btn-primary" onClick={send} disabled={loading}>{loading? '...' : t('buttons.send')}</button>
              <button className="btn-voice" aria-hidden>🎤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
