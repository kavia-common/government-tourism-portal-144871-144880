import { v4 as uuidv4 } from 'uuid'
import { Incident } from '../types'

// PUBLIC_INTERFACE
export const Api = {
  /** Simulate sending OTP to email/phone */
  sendOTP: async (channel: 'email' | 'phone', to: string): Promise<{ success: boolean, otp: string }> => {
    // This is a simulation: always "succeeds" and returns an OTP (displayed in console for demo)
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString()
    console.info(`[SIM-OTP] Sent ${channel} OTP to ${to}: ${otp}`)
    await new Promise(res => setTimeout(res, 500))
    return { success: true, otp }
  },

  /** Verify OTP locally by comparing to provided expected code */
  verifyOTP: async (input: string, expected: string): Promise<boolean> => {
    await new Promise(res => setTimeout(res, 300))
    return input === expected
  },

  /** Register a tourist and issue a simulated blockchain ID */
  registerTourist: async (payload: any): Promise<{ touristId: string, digitalId: string, txHash: string }> => {
    await new Promise(res => setTimeout(res, 600))
    const touristId = uuidv4()
    const digitalId = 'polygon:' + touristId.slice(0, 8)
    const txHash = '0x' + uuidv4().replace(/-/g, '').slice(0, 32)
    return { touristId, digitalId, txHash }
  },

  /** Renew a tourist registration */
  renewTourist: async (payload: any): Promise<{ renewed: boolean, renewedUntil: string }> => {
    await new Promise(res => setTimeout(res, 500))
    const future = new Date()
    future.setMonth(future.getMonth() + 6)
    return { renewed: true, renewedUntil: future.toISOString().split('T')[0] }
  },

  /** Fetch incidents for the map/dashboard */
  fetchIncidents: async (): Promise<Incident[]> => {
    await new Promise(res => setTimeout(res, 400))
    return [
      { id: 'inc-1', title: 'Geofence Breach', description: 'Unauthorized entry near Delhi Monument', severity: 'high', lat: 28.6139, lng: 77.2090 },
      { id: 'inc-2', title: 'Medical Emergency', description: 'Tourist feeling unwell', severity: 'medium', lat: 19.0760, lng: 72.8777 },
      { id: 'inc-3', title: 'Lost Baggage', description: 'Reported at the station', severity: 'low', lat: 13.0827, lng: 80.2707 },
    ]
  }
}
