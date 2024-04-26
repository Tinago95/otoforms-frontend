import { nanoid } from 'nanoid'

export interface IDay {
  date: number
  day?: string
  dayIndex: number
  month: number
  year: number
  fullDate: string
  id: string
}
export type CalendarViewType = {
  previousMonth: number
  previousYear: number
  nextYear: number
  nextMonth: number
  date: number
  year: number
  month: number
}

export class CalendarConstructor {
  private month: number
  private year: number
  public dates: IDay[] = []
  public firstDay: IDay
  constructor(year: number, month: number) {
    this.month = month
    this.year = year
    const date = new Date(this.year, this.month)

    while (date.getMonth() === this.month) {
      const day: IDay = {
        id: nanoid(),
        date: new Date(date).getDate(),
        day: this.getDof(new Date(date).toDateString()),
        dayIndex: new Date(date).getDay(),
        month: new Date(date).getMonth(),
        year: new Date(date).getFullYear(),
        fullDate: new Date(date).toDateString(),
      }
      date.setDate(date.getDate() + 1)
      this.dates.push(day)
    }
    this.firstDay = this.firstDayOfMonth(this.dates)
    this.firstDay = this.firstDayOfMonth(this.dates)
  }

  getDof(date: string) {
    return date.split(' ')[0]
  }

  firstDayOfMonth(days: IDay[]) {
    let day: IDay = {
      id: nanoid(),
      dayIndex: 0,
      day: '',
      date: 0,
      month: 0,
      year: 0,
      fullDate: '',
    }
    days.forEach((element) => {
      if (element.date === 1) {
        day = element
      }
    })

    return day
  }

  lastDayOfMonth(days: IDay[]) {
    let day: IDay = {
      id: nanoid(),
      dayIndex: 0,
      day: '',
      date: 0,
      month: 0,
      year: 0,
      fullDate: '',
    }
    days.forEach((element) => {
      if (element.date === days.length) day = element
    })

    return day
  }

  ConstructCalendar() {
    var leftPadding: IDay[] = []
    var rightPadding: IDay[] = []

    const numDaysFromPrevMonth: number = this.firstDayOfMonth(this.dates).dayIndex
    const numDaysFromNextMonth: number = 42 - (this.lastDayOfMonth(this.dates).date + numDaysFromPrevMonth)
    const prevMonthLastDay: number = new Date(this.firstDay.year, this.firstDay.month - 1, 0).getDate()

    for (let i: number = prevMonthLastDay - numDaysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
      const day: IDay = {
        id: nanoid(),
        date: new Date(this.firstDay.year, this.firstDay.month - 1, i).getDate(),
        day: this.getDof(new Date(this.firstDay.year, this.firstDay.month - 1, i).toDateString()),
        dayIndex: new Date(this.firstDay.year, this.firstDay.month - 1, i).getDay(),
        month: new Date(this.firstDay.year, this.firstDay.month - 1, i).getMonth(),
        year: new Date(this.firstDay.year, this.firstDay.month - 1, i).getFullYear(),
        fullDate: new Date(this.firstDay.year, this.firstDay.month - 1, i).toDateString(),
      }
      leftPadding.push(day)
    }
    for (let i: number = 1; i <= numDaysFromNextMonth; i++) {
      const day: IDay = {
        id: nanoid(),
        date: new Date(this.firstDay.year, this.firstDay.month + 1, i).getDate(),
        day: this.getDof(new Date(this.firstDay.year, this.firstDay.month + 1, i).toDateString()),
        dayIndex: new Date(this.firstDay.year, this.firstDay.month + 1, i).getDay(),
        month: new Date(this.firstDay.year, this.firstDay.month + 1, i).getMonth(),
        year: new Date(this.firstDay.year, this.firstDay.month + 1, i).getFullYear(),
        fullDate: new Date(this.firstDay.year, this.firstDay.month + 1, i).toDateString(),
      }
      rightPadding.push(day)
    }

    const calendar = leftPadding.concat(this.dates).concat(rightPadding)
    const nextMonth = this.firstDay.month + 1
    const previousMonth = this.firstDay.month - 1
    const nextYear = this.firstDay.year + 1
    const previousYear = this.firstDay.year - 1
    const calendarWeeks = this.sliceIntoChunks(calendar, 7)
    return { calendarWeeks, previousMonth, nextMonth, nextYear, previousYear }
  }

  sliceIntoChunks(arr: any[], chunkSize: number) {
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      res.push(chunk)
    }
    return res
  }
}

export function capitalizeFirstLetter(sentence: string): string {
  // Split the sentence into an array of words
  const words = sentence.toLowerCase().split(' ')

  // Capitalize the first letter of each word and join the words back together
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
