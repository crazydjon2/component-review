import moment from 'moment-timezone'

// Формат даты
export function formatDate (value: string, format = 'DD.MM.YYYY HH:mm:ss') {
  if (value) {
    return moment(String(value)).format(format)
  }
  return ''
}
