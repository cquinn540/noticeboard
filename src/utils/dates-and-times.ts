import format from 'date-fns/format'
import add from 'date-fns/add'
import parseISO from 'date-fns/parseISO'

export const getCurrentTime = () => new Date(Date.now())

export const formatDate = (date: Date | null): string => {
  if (!date) {
    return '-'
  }
  return format(date, 'MM-dd-yyy')
}

export const getWeekDay = (date: Date | null): string => {
  if (!date) {
    return '-'
  }
  return format(date, 'EEEE')
}

export const formatTime = (date: Date | null): string => {
  if (!date) {
    return '-'
  }
  return format(date, 'p')
}

export const getApiTime = (date: Date): string => format(date, 'HH:mm')

export const addHours = (date: Date, hours: number): Date => add(date, { hours });

export const parseIsoString = (dateString: string) => parseISO(dateString);