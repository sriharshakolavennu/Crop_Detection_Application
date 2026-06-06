import React from 'react'

export default function LanguageSwitcher({lang, onChange}){
  return (
    <select aria-label="Language switcher" className="lang-switch" value={lang} onChange={e=>onChange(e.target.value)}>
      <option value="en">English</option>
      <option value="te">తెలుగు</option>
    </select>
  )
}
