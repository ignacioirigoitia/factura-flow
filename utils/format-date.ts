

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  return new Intl.DateTimeFormat('es-AR', options).format(date)
}