import { create } from 'zustand'
import { User } from '../types'

type State = {
  isAuthenticated: boolean
  user: User | null
}

type Actions = {
  // PUBLIC_INTERFACE
  login: (user: User) => void
  // PUBLIC_INTERFACE
  logout: () => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null })
}))
