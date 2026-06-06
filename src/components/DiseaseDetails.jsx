import React, {useState} from 'react'
import { useLanguage } from '../context/LanguageContext'
import UploadCapture from './UploadCapture'
import DetectionResult from './DetectionResult'

export default function DiseaseDetails(){
  const [result,setResult] = useState(null)
  const { t } = useLanguage()

  return (
    <section className="disease-card">
      <div className="card">
        <h3>{t('detection.title')}</h3>
        <UploadCapture onResult={(r)=>{
          // map sample result fields to DetectionResult expected shape
          setResult({
            image:r.image || null,
            disease: r.disease || r.name || 'Unknown',
            confidence: r.confidence || 0,
            severity: r.severity || (r.confidence>75? 'High': r.confidence>40? 'Moderate':'Low'),
            symptoms: r.symptoms || [],
            treatment: r.treatment || ''
          })
        }} />
      </div>
      {result ? <DetectionResult result={result} /> : (
        <div className="card muted" style={{padding:16}}>{t('detection.noResult')}</div>
      )}
    </section>
  )
}
