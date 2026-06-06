import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { t } = useLanguage()
  const { user } = useAuth()
  return (
    <div className="profile-page container">
      <div className="card profile-card">
        <div className="profile-header">
          <img src={user?.avatar || 'https://via.placeholder.com/120'} alt="Farmer" />
          <div>
            <h2>{user?.name || t('header.profile')}</h2>
            <div className="muted">Member since 2024</div>
          </div>
        </div>
        <div className="profile-body">
          <h4>Farm Details</h4>
          <p>Location: Andhra Pradesh</p>
          <p>Preferred language: { (user?.language) || 'Telugu' }</p>
        </div>
      </div>
    </div>
  )
}
