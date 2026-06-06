import React, {useEffect, useState} from 'react'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

export default function WeatherCard(){
  const [weather,setWeather] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const { t } = useLanguage()

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    setError(null)

    api.weather.get()
      .then(res=>{
        if(!mounted) return
        setWeather(res.weather || res)
      })
      .catch(err=>{
        if(!mounted) return
        setError(err?.error || t('weather.failed'))
      })
      .finally(()=>{
        if(mounted) setLoading(false)
      })

    return ()=>{
      mounted = false
    }
  },[])

  if(loading) return (
    <div className="card weather-card" aria-busy="true">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div className="loader" />
        <div>{t('weather.loading')}</div>
      </div>
    </div>
  )

  if(error) return (
    <div className="card weather-card">
      <div className="weather-error">{error}</div>
    </div>
  )

  return (
    <div className="card weather-card">
      <div className="weather-top">
        <div className="weather-icon" aria-hidden>
          {weather?.icon || '🌦'}
        </div>

        <div>
          <div className="temp">{weather?.temperature}°C</div>
          <div className="muted">
            Humidity {weather?.humidity}% • Rain {weather?.rainChance}%
          </div>
        </div>
      </div>

      <div className="weather-bottom">
        Wind {weather?.windSpeed} km/h
      </div>
    </div>
  )
}