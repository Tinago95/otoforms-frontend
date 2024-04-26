import { Auth } from '@aws-amplify/auth'
import axios, { AxiosRequestHeaders } from 'axios'

import { IEmployee, OnboardEmployeeEvent } from '../Common/person'
const baseURL =
  'https://be6p46xuvf.execute-api.ap-southeast-2.amazonaws.com/OtosheetsBackendStackdev'
export const post = async (payload: Partial<OnboardEmployeeEvent>) => {
  const headers: Partial<AxiosRequestHeaders> = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  }
  const eventsAPI = axios.create({
    baseURL: baseURL,
    headers: headers,
    responseType: 'json',
  })
  const payloadString = JSON.stringify(payload)
  let message = ''
  try {
    const postEventAPI = await eventsAPI.post('/employees', payloadString)
    console.log('response', postEventAPI.data)
    return { success: true, message: 'success' }
  } catch (error: any) {
    console.log('api error', error.response.data)
    if (JSON.stringify(error.response).includes('Exception:Username Exists')) {
      message = 'The email provided is being used by another user!'
    } else message = error.response
    return { success: false, message }
  }
}
export type EmployeeStateMachineOutput<T> = {
  ExecutedVersion: string
  Payload: T
  SdkHttpMetadata: {
    HttpHeaders: {
      Connection: string
      'Content-Length': string
      'Content-Type': string
      Date: string
      'X-Amz-Executed-Version': string
      'x-amzn-Remapped-Content-Length': string
      'x-amzn-RequestId': string
      'X-Amzn-Trace-Id': string
    }
    HttpStatusCode: number
  }
  SdkResponseMetadata: {
    RequestId: string
  }
  StatusCode: number
}
export type EmployeeTableSfQueryOutput = {
  people: IEmployee[]
  count: number
  lastEvaluatedKey?: {
    tenantId: string
    payrollId: string
  }
}
export const getAllEmployees = async (tenantId: string) => {
  const headers: Partial<AxiosRequestHeaders> = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  }
  const eventsAPI = axios.create({
    baseURL: baseURL,
    headers: headers,
    responseType: 'json',
  })

  const res = await eventsAPI.post('/employees', {
    tenantId: tenantId,
    limit: 5,
    employeeEventType: 'query',
  })
  console.log(res.data)
  const { Payload } = JSON.parse(
    res.data,
  ) as EmployeeStateMachineOutput<EmployeeTableSfQueryOutput>

  return Payload
  // const baseURL =
  //   'https://wasu4s8544.execute-api.ap-southeast-2.amazonaws.com/OtosheetsBackendStackdev'
  // const headers: AxiosRequestHeaders = {
  //   'Content-type': 'application/json',
  //   Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  // }
  // const eventsAPI = axios.create({ baseURL: baseURL, headers: headers })
  // const data = {
  //   employeesAction: 'getAll',
  //   tenantId: tenantId,
  //   payrollId: 'qwoiyroy',
  //   status: 'new',
  // }
  // let payload: EmployeesEvent = {
  //   employeesAction: 'getAll',
  //   tenantId: tenantId,
  //   payrollId: '',
  // }
  // const item: PaixolEvent<EmployeesEvent> = {
  //   domain: 'Employees',
  //   data: payload,
  // }
  // let people: ExtendedPerson[] = [] as ExtendedPerson[]
  // let success: boolean = false
  // const itemString = JSON.stringify(item)
  // let postEventAPI: any
  // try {
  //   postEventAPI = await eventsAPI.post('/employees', itemString, { timeout: 5000 })
  // } catch (error: any) {
  //   console.log('api error', error.response.data)
  //   return []
  // }
  // postEventAPI.data.response.Items.forEach((element: any) => {
  //   let person: ExtendedPerson = {} as ExtendedPerson
  //   person.BasicInformation = element.BasicInformation
  //   people.push(element)
  // })
  // console.log('response', people)
  // return people
}
