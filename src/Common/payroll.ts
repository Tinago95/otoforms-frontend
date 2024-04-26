import { IEmployee } from './person'

export type Timesheet = {
  Approval: IApproval
  PayPeriod: PayPeriod
  calendar: Calendar
  Id: string
  Employee: IEmployee
  TimeEntries: TimeEntries
}

type Calendar = 'Monthly' | 'Weekly' | 'Fornightly'
export type TimeEntries = {
  NonBillable: boolean
  EarningsTemplate: string
  JobCode: string
  Notes: string
  date: string
  TimeUnits: number
}

export type IApproval = {
  approvedBy: IEmployee
  approvalDate: string
  approved: boolean
}

export type IPayslip = {
  gross: number
  deductions: IDeducations
}

export type IDeducations = {}

export type PayPeriod = {
  From: string
  To: string
}

export type PenaltyRates = {
  GroupName: string
  id: string
  type: string
  TemplateEnabled: boolean
  ApplyToAllWeekDays: boolean
  PenaltyRateConfig: DayConfig
}

export type SalaryIncrease = {
  GroupName: string
  id: string
  type: string
  TemplateEnabled: boolean
  SalaryWageReviewPeriod: string
  FixedNumberOfPayLevels: boolean
  NumberOfLevels: number
  IncrementAmount: number
}

export type DayConfig = {
  Mon: PenaltyRateConfig
  Tue: PenaltyRateConfig
  Wed: PenaltyRateConfig
  Thu: PenaltyRateConfig
  Fri: PenaltyRateConfig
  Sat: PenaltyRateConfig
  Sun: PenaltyRateConfig
}

export type PenaltyRateConfig = {
  Start: string
  Finish: string
  PenaltyRateMultiple: number
  FixedRateAllDay: boolean
  AllDay: boolean
}

export type PayCalendar = {
  CalendarName: string
  id: string
  PayCycle: PayCycle
  FirstPayRun: string
  FirstCalendarDay: string
  SetDefaultCalendar: boolean
}

export type PayCycle = 'Weekly' | 'Monthly' | 'Fortnightly'
export const PenaltyRateSample: PenaltyRates = {
  GroupName: '',
  id: '',
  TemplateEnabled: false,
  ApplyToAllWeekDays: false,
  PenaltyRateConfig: {
    Mon: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Tue: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Wed: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Thu: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Fri: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Sat: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
    Sun: {
      Start: '',
      Finish: '',
      PenaltyRateMultiple: 0,
      FixedRateAllDay: false,
      AllDay: false,
    },
  },
  type: '',
}
