import React, {useState} from 'react'

export default function VoiceAssistant(){
  const [lang, setLang] = useState('en')
  return (
    <div className="voice-assistant card">
      <div className="voice-top">
        <div>Voice Assistant</div>
        <select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language">
          <option value="en">English</option>
          <option value="te">Telugu</option>
        </select>
      </div>
      <div className="voice-controls">
        <button className="btn-voice">Start Recording</button>
        <button className="btn-secondary">Text-to-Speech</button>
      </div>
    </div>
  )
}
