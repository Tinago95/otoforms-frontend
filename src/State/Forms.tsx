import { filter } from 'lodash'
import { createContext, FC, useState, PropsWithChildren } from 'react'
import { PayCalendar, PenaltyRates, SalaryIncrease, Timesheet } from '../Common/payroll'

export type FormsContextType = {
  salaryVariationPopupState: boolean
  createTimesheet: (payload: Timesheet) => void
  timesheets: Timesheet[]
  selectedTimesheetSlot: string
  updateSelectedTimesheetSlot: (date: string) => void
  payCalendarPopupState: boolean
  payCalendarPopup: (state: boolean) => void
  createPayCalendar: (calendar: PayCalendar) => void
  deletePayCalendar: (id: string) => void
  payCalendars: PayCalendar[]
  setSalaryVariationPopup: (state: boolean) => void
  currentPayVariationTab: number
  penaltyRates: PenaltyRates[]
  deletePayVariationTemplate: (id: string) => void
  deleteSalaryIncreaseTemplate: (id: string) => void
  createSalaryIncreaseTemplate: (payload: SalaryIncrease) => void
  salaryIncreaseTemplates: SalaryIncrease[]
  createPenaltiesTemplate: (payload: PenaltyRates) => void
  getPenaltyRates: (id: string) => PenaltyRates
  resetPayVariationTab: (tab: number) => void
}

export const FormsContext = createContext<FormsContextType>({} as FormsContextType)
export const FormsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentPayVariationTab, setCurrentPayVariationTab] = useState<number>(0)
  const [penaltyRates, setPenaltyRates] = useState<PenaltyRates[]>([])
  const [salaryIncreaseTemplates, setSalaryIncreaseTemplates] = useState<SalaryIncrease[]>([])
  const [payCalendars, setPayCalendar] = useState<PayCalendar[]>([])
  const [salaryVariationPopupState, setSalaryVariationPopupState] = useState(false)
  const [payCalendarPopupState, setPayCalendarPopupState] = useState(false)
  const [timesheets, setTimesheet] = useState<Timesheet[]>([])
  const [selectedTimesheetSlot, setSelectedTimesheetSlot] = useState('')

  const createTimesheet = (payload: Timesheet) => {
    console.log('created new Timesheet', payload)
    setTimesheet([...timesheets, payload])
  }

  const updateSelectedTimesheetSlot = (date: string) => {
    setSelectedTimesheetSlot(date)
  }
  const payCalendarPopup = (state: boolean) => {
    setPayCalendarPopupState(state)
  }
  const createPayCalendar = (payload: PayCalendar) => {
    console.log('created new PayCalendar', payload)
    setPayCalendar([...payCalendars, payload])
  }
  const deletePayCalendar = (id: string) => {
    const subList = payCalendars.filter((item, index) => {
      return item.id !== id
    })
    setPayCalendar([...subList])
  }
  const resetPayVariationTab = (tab: number) => {
    setCurrentPayVariationTab(tab)
  }
  const deletePayVariationTemplate = (id: string) => {
    const subList = penaltyRates.filter((item, index) => {
      return item.id !== id
    })
    setPenaltyRates([...subList])
  }
  const setSalaryVariationPopup = (input: boolean) => {
    console.log('Salary Variation Popup', input)
    setSalaryVariationPopupState(input)
  }
  const deleteSalaryIncreaseTemplate = (id: string) => {
    const subList = salaryIncreaseTemplates.filter((item, index) => {
      return item.id !== id
    })
    setSalaryIncreaseTemplates([...subList])
  }

  const getPenaltyRates = (id: string) => {
    return penaltyRates.find((item, index) => item.id === id) as PenaltyRates
  }

  const createPenaltiesTemplate = (payload: PenaltyRates) => {
    console.log('created new template', payload)
    setPenaltyRates([...penaltyRates, payload])
  }

  const createSalaryIncreaseTemplate = (payload: SalaryIncrease) => {
    console.log('created new template', payload)
    setSalaryIncreaseTemplates([...salaryIncreaseTemplates, payload])
  }
  return (
    <FormsContext.Provider
      value={{
        updateSelectedTimesheetSlot,
        selectedTimesheetSlot,
        createTimesheet,
        timesheets,
        payCalendarPopup,
        payCalendarPopupState,
        payCalendars,
        deletePayCalendar,
        createPayCalendar,
        salaryVariationPopupState,
        setSalaryVariationPopup,
        createSalaryIncreaseTemplate,
        deleteSalaryIncreaseTemplate,
        deletePayVariationTemplate,
        salaryIncreaseTemplates,
        penaltyRates,
        createPenaltiesTemplate,
        getPenaltyRates,
        resetPayVariationTab,
        currentPayVariationTab,
      }}
    >
      {children}
    </FormsContext.Provider>
  )
}
