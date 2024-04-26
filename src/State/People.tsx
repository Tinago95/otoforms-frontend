import { createContext, FC, useState, PropsWithChildren, useEffect } from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import {
  Banking,
  BasicEmployeeInformation,
  examplePerson,
  IEmployee,
  OnboardEmployeeEvent,
  OnboardingEvent,
  TaxDetails,
} from '../Common/person'
// import { getAllEmployees, post } from '../libs/api'

import useSWR from 'swr'
import post from '../Hooks/post'

export type PeopleContextType = {
  people: IEmployee[]
  count: number
  lastEvalKey: any
  updateLastEvalKey: (payload: any) => void
  updatePageChange: () => void
  resetError: () => void
  errorMessage: string
  isLoading: boolean
  error: boolean
  employeesTab: number
  employeeTab: number
  updateEmployeeTab: (ix: number) => void
  updateEmployeesTab: (ix: number) => void
  selectedPersonBasicInfo: BasicEmployeeInformation
  updateTaxDetails: (payload: TaxDetails, employeeId: string) => void
  setselectedPersonBasicInfo: (id: BasicEmployeeInformation) => void
  selectedEmployee: IEmployee
  deleteEmployee: (personId: string) => void
  createEmployee: (payload: BasicEmployeeInformation) => void
  updatePeople: (payload: IEmployee[]) => void
  updateBasicInformation: (payload: BasicEmployeeInformation, employeeId: string) => void
  updateBankAccounts: (payload: Banking[], employeeId: string) => void
  getSelectedPersonBasicInfo: (id: string) => BasicEmployeeInformation
  getSelectedPersonTaxDetails: (id: string) => TaxDetails
  getSelectedBankAccounts: (id: string) => Banking[]
}
export type AllocationType = {
  status: 'allocated' | 'unallocated' | 'unavailable'
  employee: IEmployee
}
export const PeopleContext = createContext<PeopleContextType>({} as PeopleContextType)

export const PeopleProvider: FC<PropsWithChildren> = ({ children }) => {
  // const { user, signOut } = useAuthenticator((context) => [context.user])
  const [tenantId, setTenantId] = useState(
    // user.attributes ? user.attributes['custom:tenantId'] : '',
    'dev-tenant'
  )
  const [people, setPeople] = useState<IEmployee[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [employeeTab, setEmployeeTab] = useState<number>(0)
  const [employeesTab, setEmployeesTab] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [lastEvalKey, setLastEvalKey] = useState<any>()
  const [totalEmployees, setTotalEmployees] = useState<number>(0)
  const [pageChange, setPageChange] = useState<boolean>(false)
  // const { data, error } = useSWR('', async (arg: any) => {
  // })
  const [selectedPersonBasicInfo, setselectedPersonBasicInfo] =
    useState<BasicEmployeeInformation>({} as BasicEmployeeInformation)

  const resetError = () => {
    setErrorMessage('')
    setError(false)
  }
  const updateEmployeesTab = (ix: number) => {
    setEmployeesTab(ix)
  }
  const updateEmployeeTab = (ix: number) => {
    setEmployeeTab(ix)
  }
  const fetchAllEmployees = async () => {
    setIsLoading(true)
    setIsLoading(true)
    try {
      const { people, error, lastEvaluatedKey, count } = await post(
        'http://localhost:8081',
        { tenantId: tenantId, limit: 10 },
      )
      console.log(people)
      setPeople(people)
      setLastEvalKey({ ...lastEvaluatedKey })
      setTotalEmployees(count)
      setIsLoading(false)
      resetError()
    } catch (error) {
      setIsLoading(false)

      setError(true)
      setErrorMessage('#table Failed to Load')
    }
  }
  useEffect(() => {
    // fetchAllEmployees() TODO: fetch all from db
    console.log('isLoading', isLoading)
    // get the data from the api
    // console.log(error)
    // console.log('data=>', data)
    // convert the data to json
    // set state with the result
    console.log('rendered')
  }, [])
  const [selectedPersonTaxDetails, setselectedPersonTaxdetails] = useState<TaxDetails>(
    {} as TaxDetails,
  )
  const [selectedEmployee] = useState<IEmployee>({} as IEmployee)
  const updatePageChange = () => {
    setPageChange((pageChange) => !pageChange)
  }
  const createEmployee = async (payload: BasicEmployeeInformation) => {
    let person: IEmployee = {} as IEmployee
    person.basicInformation = payload
    person.status = 'new'
    person.fullyOnboarded = false

    let onboardingEvent = {
      person: {
        ...person,
        payrollId: person.basicInformation.EmploymentInformation.EmployeeId,
        tenantId,
      },

      payrollId: person.basicInformation.EmploymentInformation.EmployeeId,
      org: 'someorg',
      group: 'basic',
      employeeEventType: 'onboard',
    } as Partial<OnboardEmployeeEvent>

    console.log(onboardingEvent)
    setIsLoading(true)
    setError(false)
    setErrorMessage('')
    console.log('is loading')
    console.log('payloaad', payload)
    let success: boolean = false
    let message: string = ''
    try {
      // const res = await post(onboardingEvent)
      // success = res.success
      // message = res.message
      success = true //TODO: sort this out later
    } catch (error) {
      success = false
      message = JSON.stringify(error)
    }
    if (success) {
      updateEmployeesTab(0)
      setPeople([...people, person])
      resetError()

      console.log(message)
    } else {
      setError(true)
      setErrorMessage(message.concat('#form'))
      console.log(message)
    }
    console.log('items->', people)
    console.log('stopped loading')
    setIsLoading(false)
  }

  const updateLastEvalKey = (payload: any) => {
    setLastEvalKey({ ...payload })
  }
  const deleteEmployee = async (personId: string) => {
    let person: IEmployee = {} as IEmployee
    let onboardingEvent: OnboardingEvent = {} as OnboardingEvent
    person.basicInformation.EmploymentInformation.EmployeeId = personId
    const subList = people.filter((person) => {
      return person.basicInformation?.EmploymentInformation.EmployeeId !== personId
    })
    setPeople([...subList])
  }
  const updateBasicInformation = (
    payload: BasicEmployeeInformation,
    employeeId: string,
  ) => {
    var ix = people.findIndex(
      (item) => item.basicInformation?.EmploymentInformation.EmployeeId === employeeId,
    )
    let newArray = [...people]
    newArray[ix] = { ...newArray[ix], basicInformation: payload }
    setPeople(newArray)
  }

  const updateTaxDetails = (payload: TaxDetails, employeeId: string) => {
    var ix = people.findIndex(
      (item) => item.basicInformation?.EmploymentInformation.EmployeeId === employeeId,
    )
    let newArray = [...people]
    newArray[ix] = { ...newArray[ix], taxDetails: payload }
    setPeople(newArray)
  }
  const updateBankAccounts = (payload: Banking[], employeeId: string) => {
    var ix = people.findIndex(
      (item) => item.basicInformation?.EmploymentInformation.EmployeeId === employeeId,
    )
    let newArray = [...people]
    newArray[ix] = { ...newArray[ix], banking: payload }
    setPeople(newArray)
  }
  const getSelectedPersonBasicInfo = (id: string) => {
    const subList = people.filter((person) => {
      return person.basicInformation?.EmploymentInformation.EmployeeId === id
    })
    const basicInfo = subList[0].basicInformation
    setselectedPersonBasicInfo(subList[0].basicInformation as BasicEmployeeInformation)
    return basicInfo as BasicEmployeeInformation
  }

  const getSelectedPersonTaxDetails = (id: string) => {
    const subList = people.filter((person) => {
      return person.basicInformation?.EmploymentInformation.EmployeeId === id
    })
    const taxDetails = subList[0].taxDetails
    setselectedPersonTaxdetails(taxDetails as TaxDetails)

    return taxDetails as TaxDetails
  }

  const getSelectedBankAccounts = (id: string) => {
    const subList = people.filter((person) => {
      return person.basicInformation?.EmploymentInformation.EmployeeId === id
    })
    const bankAccounts = subList[0].banking

    return bankAccounts as Banking[]
  }
  const updatePeople = (payload: IEmployee[]) => {
    console.log('payload', payload)
    setPeople([...people, ...payload])
    console.log('new people', people)
  }

  return (
    <PeopleContext.Provider
      value={{
        updatePageChange,
        updateLastEvalKey,
        count: totalEmployees,
        lastEvalKey,
        employeeTab,
        employeesTab,
        updateEmployeesTab,
        updateEmployeeTab,
        resetError,
        errorMessage,
        error,
        isLoading,
        updateBankAccounts,
        getSelectedBankAccounts,
        getSelectedPersonTaxDetails,
        updateTaxDetails,
        updateBasicInformation,
        getSelectedPersonBasicInfo,
        selectedPersonBasicInfo,
        setselectedPersonBasicInfo,
        selectedEmployee,
        updatePeople,
        deleteEmployee,
        createEmployee,
        people,
      }}
    >
      {children}
    </PeopleContext.Provider>
  )
}
