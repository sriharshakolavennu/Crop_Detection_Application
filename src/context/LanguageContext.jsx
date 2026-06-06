import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({children}){
  const [lang, setLang] = useState(()=> {
    try{ return localStorage.getItem('cropcare_lang') || 'en' }catch(e){ return 'en' }
  })

  useEffect(()=>{
    try{ localStorage.setItem('cropcare_lang', lang) }catch(e){}
  },[lang])

  const t = (key, vars={}) => {
    const parts = key.split('.')
    let cur = translations[lang] || translations.en
    for(const p of parts){ cur = cur && cur[p] }
    if(cur == null) cur = key
    if(typeof cur === 'string'){
      return cur.replace(/\{(\w+)\}/g, (_,name)=> vars[name] || `{${name}}`)
    }
    return cur
  }

  const value = useMemo(()=>({lang,setLang,t}),[lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(){
  return useContext(LanguageContext)
}
