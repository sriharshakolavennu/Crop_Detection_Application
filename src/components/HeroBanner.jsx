import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function HeroBanner(){
  const { t } = useLanguage()
  const { user } = useAuth()
  const name = user?.name || ''
  return (
    <section className="hero-banner">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>{t('hero.welcome', {name})} <span className="wave">👋</span></h1>
          <p>{t('hero.description')}</p>
          <div className="hero-cta">
            <button className="btn-primary">{t('hero.quickScan')}</button>
            <button className="btn-secondary">{t('hero.voiceAssistant')}</button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illu-placeholder">🌱</div>
        </div>
      </div>
    </section>
  )
}
