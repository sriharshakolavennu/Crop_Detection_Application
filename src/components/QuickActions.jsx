import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function Action({emoji, label, color}){
  return (
    <button className="quick-action" style={{background: color}} aria-label={label}>
      <div className="action-emoji">{emoji}</div>
      <div className="action-label">{label}</div>
    </button>
  )
}

export default function QuickActions(){
  const { t } = useLanguage()
  return (
    <section className="quick-actions">
      <Action emoji="📷" label={t('detection.title')} color="#E8F5E9" />
      <Action emoji="🎤" label={t('hero.voiceAssistant')} color="#FFF8E1" />
      <Action emoji="🛒" label={t('products.buy')} color="#FFF3E0" />
      <Action emoji="👨‍🌾" label={t('expert.title')} color="#E8F5E9" />
      <Action emoji="📊" label={t('dashboard.diseasesDetected')} color="#F1F8E9" />
      <Action emoji="🌦" label={t('weather.loading')} color="#E3F2FD" />
    </section>
  )
}
