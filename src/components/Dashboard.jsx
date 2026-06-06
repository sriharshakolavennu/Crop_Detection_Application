import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function StatCard({icon, label, value, accent}){
  return (
    <div className="stat-card" style={{borderTop: `4px solid ${accent}`}}>
      <div className="stat-left">
        <div className="stat-icon">{icon}</div>
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      </div>
      <div className="stat-right">↗</div>
    </div>
  )
}

export default function Dashboard(){
  const { t } = useLanguage()
  return (
    <section className="dashboard">
      <div className="dashboard-grid">
        <StatCard icon="🌱" label={t('dashboard.totalScans')} value="1,234" accent="#1B5E20" />
        <StatCard icon="🦠" label={t('dashboard.diseasesDetected')} value="42" accent="#4CAF50" />
        <StatCard icon="🛒" label={t('dashboard.recommendedProducts')} value="18" accent="#FFC107" />
        <StatCard icon="👨‍🌾" label={t('dashboard.expertConsultations')} value="76" accent="#1B5E20" />
      </div>
    </section>
  )
}
