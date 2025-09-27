export type Nationality = 'Domestic' | 'Foreign'

export function getDynamicFieldsByNationality(nationality: Nationality) {
  // Domestic vs Foreign tourist different fields
  if (nationality === 'Domestic') {
    return [
      { key: 'aadhaar', label: 'Aadhaar Number', type: 'text', required: true },
      { key: 'state', label: 'State of Residence', type: 'text', required: true }
    ]
  }
  return [
    { key: 'passportNumber', label: 'Passport Number', type: 'text', required: true },
    { key: 'visaType', label: 'Visa Type', type: 'text', required: true }
  ]
}

export function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export function validatePhone(phone: string) {
  return /^[0-9]{10,15}$/.test(phone)
}
