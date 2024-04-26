import * as icon from '@mui/icons-material'
import * as nanoid from 'nanoid'
const randomUUID = nanoid.customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 18)

/**
 * @description
 * This file contains all the person types and interfaces used in the application.
 * It also contains the default values for the forms.
 */

/**
 * @description
 * This is the Person Record. It is used to store the person data in the database. 
 */
export interface PersonRecord<T> {
  tenantId: string
  pid: string
  type: 'client' | 'employee'
  data: T
}


//TODO: Move this to a more appropriate place
export interface BaseItemRecord<T> {
  tenantId: string
  id: string
  type: 'timesheet' | 'work-order' | 'ui-config' | string
  data: T
}

/**
 * @description
 * This is the base person interface. It contains all the fields that are common to all the person types.
 */
export type BasePerson = {
  PersonDetails: PersonDetails
  HomeAddress: HomeAddress
  EmergencyContact: EmergencyContact
}


export interface IEmployee {
  basicInformation: BasicEmployeeInformation
  taxDetails?: TaxDetails
  banking?: Banking[]
  status: EmployeeStatus
  fullyOnboarded: boolean
}

export interface IClient {
  basicInformation: BasicClientInformation
  fullyOnboarded: boolean
}


export interface BasicEmployeeInformation extends BasePerson {
  EmploymentInformation: EmploymentInformation
}

export interface BasicClientInformation extends BasePerson {
  //TODO: Add client specific fields
}

// export interface PayrollEvent extends BaseItemRecord {}
// export interface TimeEvent extends BaseItemRecord {}
// export interface UIEvent extends BaseItemRecord {}
// export interface ShiftSchedulingEvent extends ShiftScheduleTableSchema {}
// export interface ShiftScheduleTableSchema extends WorkOrder, BaseItemRecord {}
export interface WorkOrder {
  status?: string
  timeStamp?: number
  location?: string
  startTime?: string
  finishTime?: string
  assignee?: string
  notes?: string
}
// export type PayloadData =
//   // | OnboardingEvent
//   | PayrollEvent
//   | TimeEvent
//   | ShiftSchedulingEvent
//   | UIEvent
// | EmployeesEvent
export type DetailType =
  | 'EmployeeOnboarding'
  | 'Payroll'
  | 'Time'
  | 'UI'
  | 'Employees'
  | 'ShiftScheduling'
export type EmployeesAction = 'getAll' | 'query' | 'update' | 'delete'
export type OnboardingAction = 'create' | 'terminate' | 'suspend' | 'resetPassword'

export interface OnboardingEvent extends BasePerson, PersonRecord<IEmployee> {
  onboardingAction: OnboardingAction
}

// export interface ExtendedPerson extends Omit<OnboardingEvent, 'onboardingAction'> {}
// export interface EmployeesEvent extends PersonRecord {
//   employeesAction: EmployeesAction
//   payload?: IPerson
// }



export interface IContext {
  org: string
  group: UserGroup
  tenantId: string
  firstName: string
  lastName: string
  token_use?: string
  principalId?: string
  integrationLatency?: string
  payrollId: string
}
type UserGroup = 'administrator' | 'organisation-administrator' | 'Employee' | 'Contractor'
export interface OnboardEmployeePayload {
  person: IEmployee
  userPoolId?: string
  context?: IContext
  group: UserGroup
  org: string
}

export type OnboardEmployeeEvent = {
  Payload: OnboardEmployeePayload
  employeeEventType: string
}

export type EmployeeStatus = 'new' | 'invited' | 'active' | 'suspended' | 'terminated'

export type TaxDetails = {
  TaxDeclarations: TaxDeclarations
  TaxIdentity: TaxIdentity
  TfnExemption: TfnExemption
  TaxVariation: TaxVariation
  TaxScaleAndResidencyStatus: TaxScaleAndResidencyStatus
  EmploymentAndWorkConditions: EmploymentBasisAndWorkConditions
}
export type TaxDeclarations = {
  ClaimTaxFreeThreshold: boolean
  HasStudentLoan: boolean
  EligibleForLeaveLoading: boolean
}
export type TaxVariation = {
  UpwardTaxVariation: string
  TaxOffsetAmmount: string
}

export type EmploymentBasisAndWorkConditions = {
  EmploymentBasis: string
  WorkConditions: string
}
export type TaxIdentity = {
  PayrollId: string
  Tfn: string
}

export type TaxScaleAndResidencyStatus = {
  ResidencyStatus: string
  TaxScaleType: string
  SeniorMaritalStatus: string
}

export type TfnExemption = {
  TfnExemption: boolean
  TfnExemptionType: string
}




type PersonDetails = {
  FirstName: string
  MiddleName: string
  LastName: string
  DateOfBirth: Date | string
  PhoneNumber: string
  EmailAddress: string
}

type HomeAddress = {
  AddressLine1: string
  AddressLine2: string
  State: string
  PostCode: string
  City: string
}

type EmploymentInformation = {
  JobTitle: string
  EmploymentStart: Date | string
  EmploymentEnd: Date | string
  EmployeeId: string
  EmploymentType: string
  IncomeType: string
}

type EmergencyContact = {
  FirstName: string
  LastName: string
  PhoneNumber: string
  EmailAddress: string
}

export type Banking = {
  BankName: string
  AccountNumber: string
  BSB: string
  Distribution: string
  AccountAlias: string
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
export const BasicInformationFormSetup = {
  FirstName: {
    label: 'First Name',
    icon: <icon.AccountCircleOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  MiddleName: {
    label: 'Middle Name',
    icon: <icon.AccountCircleOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  LastName: {
    label: ' Last Name',
    icon: <icon.AccountCircleOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  DateOfBirth: {
    label: 'Date Of Birth',
    icon: <icon.CalendarMonthOutlined color='primary' fontSize='small' />,
    type: 'date',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  PhoneNumber: {
    label: 'Phone Number',
    icon: <icon.PhoneOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  EmailAddress: {
    label: 'Email Address',
    icon: <icon.EmailOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  AddressLine1: {
    label: 'Address Line 1',
    icon: <icon.MapOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  AddressLine2: {
    label: 'Address Line2',
    icon: <icon.MapOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  State: {
    label: 'State',
    icon: <icon.LandscapeOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  PostCode: {
    label: 'Post Code',
    icon: '',
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID(),

  },
  City: {
    label: 'City',
    icon: <icon.LocationCityOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "basic",
    key: randomUUID()
  },
  JobTitle: {
    label: 'Job Title',
    icon: <icon.WorkOutlineOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()

  },
  EmploymentType: {
    label: 'Employment Type',
    icon: '',
    type: 'select',
    options: ['EMPLOYEE', 'CONTRACTOR'],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  IncomeType: {
    label: 'Income Type',
    icon: <icon.MoneyOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: [
      'SALARY AND WAGES',
      'WORKING HOLIDAYMAKER',
      'NON EMPLOYEE',
      'CLOSELY HELD PAYEES',
      'LABOUR HIRE',
    ],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },

  EmploymentStart: {
    label: 'Employment Start',
    icon: <icon.CalendarMonthOutlined color='primary' fontSize='small' />,
    type: 'date',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  EmploymentEnd: {
    label: 'Employment End',
    icon: <icon.CalendarMonthOutlined color='primary' fontSize='small' />,
    type: 'date',
    options: [],
    disabled: true,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  EmployeeId: {
    label: 'EmployeeId',
    icon: <icon.BadgeOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: true,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
}

export const defaultTaxDetails: TaxDetails = {
  TaxIdentity: {
    PayrollId: '',
    Tfn: '',
  },
  TfnExemption: {
    TfnExemption: false,
    TfnExemptionType: '',
  },
  TaxVariation: {
    UpwardTaxVariation: '',
    TaxOffsetAmmount: '',
  },
  TaxDeclarations: {
    ClaimTaxFreeThreshold: false,
    HasStudentLoan: false,
    EligibleForLeaveLoading: false,
  },
  TaxScaleAndResidencyStatus: {
    ResidencyStatus: '',
    TaxScaleType: '',
    SeniorMaritalStatus: '',
  },
  EmploymentAndWorkConditions: {
    EmploymentBasis: '',
    WorkConditions: '',
  },
}

export const TaxDetailsFormSetup = {
  PayrollId: {
    label: 'Payroll Id',
    icon: <icon.BadgeOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  Tfn: {
    label: 'TFN',
    icon: <icon.BadgeOutlined color='primary' fontSize='small' />,
    type: 'text',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },

  UpwardTaxVariation: {
    label: 'Upward Tax Variation',
    icon: <icon.MonetizationOnOutlined color='primary' fontSize='small' />,
    type: 'number',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  TaxOffsetAmmount: {
    label: 'Tax Offset Ammount',
    icon: <icon.MonetizationOnOutlined color='primary' fontSize='small' />,
    type: 'number',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  TfnExemption: {
    label: 'TFN Exemption',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'checkbox',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },

  TfnExemptionType: {
    label: 'TFN Exemption Type',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: ['NOT QUOTED', 'PENDING', 'PENSIONER', 'UNDER 18'],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  ClaimTaxFreeThreshold: {
    label: 'Claim Tax Free Threshold',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'checkbox',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  HasStudentLoan: {
    label: 'Has Student Loan',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'checkbox',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  EligibleForLeaveLoading: {
    label: 'Eligible For Leave Loading',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'checkbox',
    options: [],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  ResidencyStatus: {
    label: 'Residency Status',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: [
      'AUSTRALIAN RESIDENT',
      'FOREIGN RESIDENT',
      'WORKING HOLIDAY MAKER',
      'FOREIGN',
    ], // Foreign Only valid when ResidencyStatus is FOREIGNRESIDENT.
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  TaxScaleType: {
    label: 'Tax Scale Type',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: [
      'REGULAR',
      'ACTORS ARTISTS ENTERTAINERS',
      'HORTICULTURIST OR SHEARER',
      'SENIOR OR PENSIONER',
      'WORKING HOLIDAY MAKER',
    ],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  SeniorMaritalStatus: {
    label: 'Senior Marital Status',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: ['MEMBER OF COUPLE', 'MEMBER OF ILLNESS SEPARATED COUPLE', 'SINGLE'],

    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  EmploymentBasis: {
    label: 'Employment Basis',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: ['FULLTIME', 'CASUAL', 'PART TIME', 'LABOUR HIRE', 'NON EMPLOYEE'],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
  WorkConditions: {
    label: 'Work Conditions',
    icon: <icon.HandshakeOutlined color='primary' fontSize='small' />,
    type: 'select',
    options: ['NONE', 'THREE LESS PERFORMANCES PER WEEK', 'PROMOTIONAL'],
    disabled: false,
    required: false,
    category: "tax-au",
    key: randomUUID()
  },
}

export const defaultBasicEmployeeInformation: BasicEmployeeInformation = {
  PersonDetails: {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DateOfBirth: '',
    PhoneNumber: '',
    EmailAddress: '',
  },
  EmploymentInformation: {
    JobTitle: '',
    EmploymentStart: '',
    EmploymentEnd: '',
    EmployeeId: '',
    EmploymentType: '',
    IncomeType: ''
  },
  HomeAddress: {
    AddressLine1: '',
    AddressLine2: '',
    State: '',
    PostCode: '',
    City: '',
  },
  EmergencyContact: {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    EmailAddress: '',
  },
}

export const examplePerson: IEmployee = {
  basicInformation: {
    PersonDetails: {
      FirstName: 'John',
      MiddleName: 'Doe',
      LastName: 'Michael',
      DateOfBirth: '15/04/1995',
      PhoneNumber: '0405619679',
      EmailAddress: 'JDoe@gmail.com',
    },
    HomeAddress: {
      AddressLine1: '',
      AddressLine2: '',
      State: '',
      PostCode: '',
      City: '',
    },
    EmploymentInformation: {
      JobTitle: 'Engineer',
      EmploymentStart: '',
      EmploymentEnd: '',
      EmployeeId: '6360EFG',
      EmploymentType: '',
      IncomeType: '',
    },
    EmergencyContact: {
      FirstName: '',
      LastName: '',
      PhoneNumber: '',
      EmailAddress: '',
    },
  },
  taxDetails: {
    TaxDeclarations: {
      ClaimTaxFreeThreshold: false,
      HasStudentLoan: false,
      EligibleForLeaveLoading: false,
    },
    TaxIdentity: {
      PayrollId: '',
      Tfn: '',
    },
    TfnExemption: {
      TfnExemption: false,
      TfnExemptionType: '',
    },
    TaxVariation: {
      UpwardTaxVariation: '',
      TaxOffsetAmmount: '',
    },
    TaxScaleAndResidencyStatus: {
      ResidencyStatus: '',
      TaxScaleType: '',
      SeniorMaritalStatus: '',
    },
    EmploymentAndWorkConditions: {
      EmploymentBasis: '',
      WorkConditions: '',
    },
  },
  fullyOnboarded: false,
  status: 'new',
}

export const defaultBanking: Banking = {
  BankName: '',
  AccountNumber: '',
  BSB: '',
  Distribution: '',
  AccountAlias: '',
}
