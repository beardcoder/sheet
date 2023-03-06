import axios from 'axios'
import { useUserStore } from '../stores/user'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 1000,
})

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  config.headers.Authorization = `Bearer ${token}`
  return config
})
