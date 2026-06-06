import React, {useEffect, useRef, useState} from 'react'
import io from 'socket.io-client'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

const SOCKET_URL =  import.meta.env.VITE_API_BASE ||
  'https://crop-detection-application.onrender.com'

export default function ExpertChat(){
  const [experts,setExperts] = useState([])
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [onlineCount, setOnlineCount] = useState(0)
  const socketRef = useRef(null)

  useEffect(()=>{
    api.experts.list().then(r=>{
      const list = (r && r.experts) ? r.experts : (Array.isArray(r) ? r : [])
      setExperts(list)
      setOnlineCount(list.filter(e=>e.online).length)
    }).catch(()=>{
      setExperts([])
      setOnlineCount(0)
    })
  },[])

  const { t } = useLanguage()

  useEffect(()=>{
    const socket = io(SOCKET_URL, {transports: ['websocket', 'polling']})
    socketRef.current = socket
    socket.on('connect', ()=>{ console.log('Socket connected')})
    socket.on('expertMessage', (payload)=>{
      setMessages(m=>[...m,payload])
    })
    return ()=> socket.disconnect()
  },[])

  function switchExpert(id){
    const ex = experts.find(e=> e.id === Number(id))
    setSelected(ex)
    setMessages([])
    if(socketRef.current){
      socketRef.current.emit('joinExpertRoom', `expert-${id}`)
    }
  }

  function send(){
    if(!selected) return alert('Select an expert')
    const payload = {room:`expert-${selected.id}`, from:'user', text: input, time: new Date().toISOString()}
    setMessages(m=>[...m,payload])
    socketRef.current.emit('expertMessage', payload)
    setInput('')
  }

  async function book(){
    if(!selected) return alert('Select an expert')
    const dt = prompt('Enter date and time (ISO)')
    if(!dt) return
    const res = await api.bookings.create({userId:1, expertId:selected.id, datetime:dt, notes:''})
    alert('Booked: ' + res.booking.id)
  }

  return (
    <section className="expert-chat card">
      <div className="chat-header">
        <h4>{t('expert.title')}</h4>
        <div className="chat-actions">
          <div className="muted">{t('expert.onlineExperts',{count:onlineCount})}</div>
          <button className="btn-secondary" onClick={book}>{t('expert.book')}</button>
        </div>
      </div>

      <div className="expert-top" style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <select onChange={e=>switchExpert(e.target.value)} value={selected?.id || ''}>
          <option value="">{t('expert.selectExpertPlaceholder')}</option>
          {experts.map(ex=> (
            <option key={ex.id} value={ex.id}>{ex.name} — {ex.speciality} {ex.online? '• Online':''}</option>
          ))}
        </select>
        <select onChange={e=>{
          const spec = e.target.value
          api.experts.list(spec?`speciality=${spec}`:'').then(r=> setExperts(r.experts||r)).catch(()=>{})
        }}>
          <option value="">{t('expert.filterSpecialty')}</option>
          <option>Crop Specialist</option>
          <option>Disease Specialist</option>
          <option>Soil Specialist</option>
          <option>Fertilizer Specialist</option>
          <option>Weather Specialist</option>
        </select>
      </div>

      <div className="chat-body">
        {selected ? (
          <>
            <div className="expert-card" style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
              <img src={selected.avatar} alt={selected.name} style={{width:64,height:64,borderRadius:8,objectFit:'cover'}} />
              <div>
                <div style={{fontWeight:700}}>{selected.name} <span className="muted">{selected.rating} ⭐</span></div>
                <div className="muted">{selected.speciality} • {selected.online? 'Online':'Offline'}</div>
              </div>
              <div style={{marginLeft:'auto',display:'flex',gap:8}}>
                <a className="btn-secondary" href={`tel:+91-9999999999`}>{t('stores.call')}</a>
                <a className="btn-secondary" href={`https://wa.me/91${9999999999}?text=${encodeURIComponent('I need expert help')}`} target="_blank" rel="noreferrer">WhatsApp</a>
                <button className="btn-secondary" onClick={()=> alert('Start video consultation (placeholder)')}>Video</button>
              </div>
            </div>

            <div className="messages" style={{maxHeight:320,overflowY:'auto',marginBottom:8}}>
              {messages.map((m,i)=> (
                <div key={i} style={{padding:8,background:m.from==='user'? '#e8f5e9':'#fff8e1',borderRadius:8,marginBottom:6,alignSelf:m.from==='user'? 'flex-end':'flex-start'}}>
                  <div style={{fontSize:13}}>{m.text}</div>
                  <div className="muted" style={{fontSize:11}}>{new Date(m.time||Date.now()).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="chat-input" style={{display:'flex',gap:8}}>
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder={t('expert.messagePlaceholder')} />
              <button className="btn-primary" onClick={send}>{t('buttons.send')}</button>
            </div>
          </>
        ) : (
          <div className="muted">{t('expert.selectToStart')}</div>
        )}
      </div>
    </section>
  )
}  