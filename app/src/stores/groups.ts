import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { api } from '../services/api'

export type RawGroup = {
  name: string
}

export type User = {
  email: string
  avatar?: any
  name?: any
}

export type Member = {
  userId: number
  groupId: number
  assignedAt: Date
  role: string
  user: User
}

export type Group = RawGroup & {
  id: number
  members?: Member[]
}

export type State = {
  groups?: Group[]
}

export type Actions = {
  fetch: () => Promise<void>
  fetchById: (id: number) => Promise<Group>
  add: (group: RawGroup) => Promise<void>
}

const initialState: State = {
  groups: undefined,
}

export const useGroupsStore = create<State & Actions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      fetch: async () => {
        const { data } = await api.get('groups')
        return set({
          groups: data,
        })
      },
      fetchById: async (id) => {
        const { data } = await api.get(`groups/${id}`)
        return data
      },
      add: async (group) => {
        await api.post('groups', group)
        get().fetch()
      },
    }),
    {
      name: 'groups-storage',
    }
  )
)
