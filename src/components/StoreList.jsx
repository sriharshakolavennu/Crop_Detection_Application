import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const stores = [
  {id:1, name:'Agri Store A', distance:'2.1 km', products:5},
  {id:2, name:'Farm Supplies B', distance:'4.6 km', products:12}
]

export default function StoreList(){
  const { t } = useLanguage()
  return (
    <section className="store-list card">
      <h4>{t('stores.title')}</h4>
      <ul>
        {stores.map(s=> (
          <li key={s.id} className="store-item">
            <div>
              <div className="store-name">{s.name}</div>
              <div className="store-sub">{s.products} products • {s.distance}</div>
            </div>
            <div className="store-actions">
              <button className="btn-secondary">{t('stores.call')}</button>
              <button className="btn-primary">{t('stores.navigate')}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
