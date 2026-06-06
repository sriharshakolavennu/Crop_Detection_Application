import React, {useRef, useState} from 'react'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

export default function UploadCapture({onResult}){
  const fileRef = useRef()
  const [preview,setPreview] = useState(null)
  const [loading,setLoading] = useState(false)

  async function onFile(e){
    const f = e.target.files[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setLoading(true)
    // send minimal data to detect API (mock)
    try{
      const res = await api.detect.scan({filename: f.name})
      onResult && onResult(res.result)
    }catch(e){ console.error(e) }
    setLoading(false)
  }

  const { t } = useLanguage()

  return (
    <div className="upload-capture">
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{display:'none'}} />
      <button className="btn-primary" onClick={()=>fileRef.current.click()}>{t('detection.uploadButton')}</button>
      {preview && <img src={preview} alt="preview" style={{marginTop:12,maxWidth:'100%',borderRadius:8}} />}
      {loading && <div className="loader small" />}
    </div>
  )
}
