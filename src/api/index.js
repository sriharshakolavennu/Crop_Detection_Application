const API_BASE = 'http://localhost:5000'

async function request(path, opts = {}){
  const res = await fetch(`${API_BASE}/api${path}`, {...opts, headers: {'Content-Type': 'application/json', ...(opts.headers||{})}})
  const data = await res.json().catch(()=>({}))
  if(!res.ok) throw data
  return data
}

export const auth = {
  signup: (payload) => request('/auth/signup', {method:'POST', body: JSON.stringify(payload)}),
  login: (payload) => request('/auth/login', {method:'POST', body: JSON.stringify(payload)}),
  sendOtp: (payload) => request('/auth/otp/send', {method:'POST', body: JSON.stringify(payload)}),
  verifyOtp: (payload) => request('/auth/otp/verify', {method:'POST', body: JSON.stringify(payload)})
}

export const detect = {
  scan: (payload) => request('/detect', {method:'POST', body: JSON.stringify(payload)})
}

export const weather = {
  get: () => request('/weather')
}

export const products = {
  list: (q='') => request(`/products?${q}`)
}

export const stores = {
  nearby: () => request('/stores')
}

export const experts = {
  list: (q='') => request(`/experts?${q}`),
  get: (id) => request(`/experts/${id}`)
}

export const bookings = {
  create: (payload) => request('/bookings', {method:'POST', body: JSON.stringify(payload)}),
  list: (q='') => request(`/bookings?${q}`)
}

export const chat = {
  send: (message) => request('/chat', {method:'POST', body: JSON.stringify({message})})
}

export default {auth, detect, weather, products, stores, experts, bookings, chat}