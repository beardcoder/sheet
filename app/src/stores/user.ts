import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { api } from '../services/api'

export type RawUser = {
  email: string
  password: string
}

export type User = RawUser & {
  id: number
  name?: string
  avatar?: string
}

export type State = {
  user?: User
  isLoggedIn: boolean
  accessToken?: string
  refreshToken?: string
  tokenRefreshTimerId?: NodeJS.Timeout
}

export type Actions = {
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  update: (user: User) => void
  getUser: () => void
  refreshAccessToken: () => void
  startTokenRefreshTimer: () => void
  clearTokenRefreshTimer: () => void
}

const initialState: State = {
  user: undefined,
  isLoggedIn: false,
  accessToken: undefined,
  refreshToken: undefined,
  tokenRefreshTimerId: undefined,
}

export const useUserStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        async login(credentials) {
          const { data } = await api.post('/users/login', credentials)

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        },

        async register(credentials) {
          const { data } = await api.post('/users/register', credentials)

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        },

        async update(credentials) {
          const { data } = await api.post('/users', credentials, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          set({
            user: data,
          })
        },

        logout() {
          set(initialState)
          get().clearTokenRefreshTimer()
        },

        async getUser() {
          const { data } = await api.get('/users/me')
          get().startTokenRefreshTimer()
          set({ user: data })
        },

        async refreshAccessToken() {
          const { refreshToken } = get()
          const { data } = await api.post('/users/refresh-token', {
            refreshToken,
          })

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoggedIn: true,
          })
        },

        startTokenRefreshTimer() {
          const id = setInterval(async () => {
            get().refreshAccessToken()
          }, 2 * 60 * 1000)
          set({ tokenRefreshTimerId: id })
        },

        clearTokenRefreshTimer() {
          if (get().tokenRefreshTimerId) {
            clearInterval(get().tokenRefreshTimerId)
            set({ tokenRefreshTimerId: undefined })
          }
        },
      }),
      {
        name: 'user-storage',
      }
    ),
    {
      name: 'user-storage',
    }
  )
)
