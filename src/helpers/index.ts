export const formatDate = (date: Date): string => {
  if (!date) return ''
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const generateId = (): string => {
  return Math.random().toString(36).slice(2, 9)
}
