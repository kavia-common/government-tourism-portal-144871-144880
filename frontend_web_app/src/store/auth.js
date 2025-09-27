import { create } from 'zustand'
import dayjs from 'dayjs'

export const useAuthStore = create((set) => ({
  user: null,
  otpContext: null,
  // PUBLIC_INTERFACE
  login: (payload) => {
    /** Simulated login and token setting. */
    const { role, email } = payload
    const token = btoa(`${email || role}:${Date.now()}`)
    set({ user: { role, email, token, loginAt: dayjs().toISOString() } })
  },
  // PUBLIC_INTERFACE
  logout: () => set({ user: null, otpContext: null }),
  // PUBLIC_INTERFACE
  setOtpContext: (ctx) => set({ otpContext: ctx }),
}))
