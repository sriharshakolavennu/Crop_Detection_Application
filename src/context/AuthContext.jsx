import React, {createContext, useContext, useEffect, useState} from 'react'
import api from '../api'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({children}){
  const [user,setUser] = useState(()=>{
    try{
      const raw = localStorage.getItem('cropcare_user')
      return raw? JSON.parse(raw): null
    }catch(e){return null}
  })
  const [token,setToken] = useState(()=> localStorage.getItem('cropcare_token') || null)
  const navigate = useNavigate()

  useEffect(()=>{
    if(token) localStorage.setItem('cropcare_token', token)
    else localStorage.removeItem('cropcare_token')
  },[token])

  useEffect(()=>{
    if(user) localStorage.setItem('cropcare_user', JSON.stringify(user))
    else localStorage.removeItem('cropcare_user')
  },[user])

  const login = ({user, token})=>{
    setUser(user)
    setToken(token)
    navigate('/dashboard')
  }

  const logout = ()=>{
    setUser(null)
    setToken(null)
    localStorage.removeItem('cropcare_token')
    localStorage.removeItem('cropcare_user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{user,token,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
