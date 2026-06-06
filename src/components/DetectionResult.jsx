import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function SeverityBadge({level}){
  const map = {Low:'green',Moderate:'orange',High:'red'}
  const color = map[level] || 'green'
  return <span className={`severity ${color}`}>{level}</span>
}

export default function DetectionResult({result}){
  if(!result) return null
  const { t } = useLanguage()
  return (
    <div className="detection-result card">
      <div className="top-row">
        <img src={result.image || 'https://via.placeholder.com/240'} alt="crop" />
        <div className="meta">
          <h3>{result.disease}</h3>
          <div className="confidence-bar">
            <div className="bar-bg">
              <div className="bar-fill" style={{width: `${result.confidence}%`}} />
            </div>
            <div className="conf-label">{result.confidence}% {t('detection.confidence')}</div>
          </div>
          <SeverityBadge level={result.severity} />
        </div>
      </div>
      <div className="details">
        <h4>{t('detection.symptoms')}</h4>
        <ul>{(result.symptoms||[]).map(s=> <li key={s}>{s}</li>)}</ul>
        <h4>{t('detection.treatment')}</h4>
        <p>{result.treatment}</p>
      </div>
    </div>
  )
}
