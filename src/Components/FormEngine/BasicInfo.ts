import { FieldDef, FormStyling, FormEngineUI, PrefillData } from "./types"
import * as nano from 'nanoid'
export const preFillData: PrefillData = {
    "personDetails.firstName": 'John',
    "personDetails.lastName": 'Doe',
    "ausResident": 'true',
    'maritalStatus': 'Married',
}
let rand = nano.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

const personDetails: FieldDef[] = [
    {
        uuid: rand(),
        id: 'personDetails.firstName',
        label: 'First Name',
        fieldType: 'text',
        category: 'PersonDetails',
        required: true,
        icon: 'AccountCircle'
    },
    {
        uuid: rand(),
        id: 'personDetails.middleName',
        label: 'Middle Name',
        fieldType: 'text',
        category: 'PersonDetails',
        required: false,
        icon: 'AccountCircle'
    },
    {
        uuid: rand(),
        id: 'personDetails.lastName',
        label: 'Last Name',
        fieldType: 'text',
        category: 'PersonDetails',
        required: true,
        icon: 'AccountCircle'
    },
    {
        uuid: rand(),
        id: 'personDetails.email',
        label: 'Email Address',
        fieldType: 'text',
        category: 'PersonDetails',
        required: true,
        icon: 'PhoneOutlined'
    },
    {
        uuid: rand(),
        id: 'personDetails.contactNumber',
        label: 'Contact Number',
        fieldType: 'text',
        category: 'PersonDetails',
        required: true,
        icon: 'MailOutline'
    },
    {
        uuid: rand(),
        id: 'personDetails.dateOfBirth',
        label: 'Date of Birth',
        fieldType: 'date',
        category: 'PersonDetails',
        required: true,
        icon: 'CalendarToday'
    },
    {
        uuid: rand(),
        id: 'personDetails.phoneNumber',
        label: 'Phone Number',
        fieldType: 'tel',
        category: 'PersonDetails',
        required: true,
        icon: 'Phone'
    }
];




const employmentInformationFields: FieldDef[] = [
    {
        uuid: rand(),
        id: 'employmentInformation.jobTitle',
        label: 'Job Title',
        fieldType: 'text',
        category: 'Employment Information',
        required: true,
        icon: 'WorkOutline'
    },
    {
        uuid: rand(),
        id: 'employmentInformation.startDate',
        label: 'Start Date',
        fieldType: 'date',
        category: 'Employment Information',
        required: true,
        icon: 'DateRange'
    },
    {
        uuid: rand(),
        id: 'employmentInformation.endDate',
        label: 'End Date',
        fieldType: 'date',
        category: 'Employment Information',
        required: false,
        icon: 'DateRange'
    },
    {
        uuid: rand(),
        id: 'employmentInformation.employeeId',
        label: 'Employee ID',
        fieldType: 'text',
        category: 'Employment Information',
        required: true,
        icon: 'PersonOutline'
    },
    {
        uuid: rand(),
        id: 'employmentInformation.employmentType',
        label: 'Employment Type',
        fieldType: 'select',
        options: ['Full Time', 'Part Time',],
        category: 'Employment Information',
        required: true,
        icon: 'WorkOutline'
    },
    {
        uuid: rand(),
        id: 'employmentInformation.incomeType',
        label: 'Income Type',
        fieldType: 'select',
        options: ['Labour Hire', 'Closely Held Payees', 'Working Holiday Maker', 'Non-Employee', 'Salary and Wages'],
        category: 'Employment Information',
        required: true,
        icon: 'MonetizationOn'
    }
];


const homeAddressFields: FieldDef[] = [
    {
        uuid: rand(),
        id: 'homeAddress.addressLine1',
        label: 'Address Line 1',
        fieldType: 'text',
        category: 'Home Address',
        required: true,
        icon: 'LocationOn'
    },
    {
        uuid: rand(),
        id: 'homeAddress.addressLine2',
        label: 'Address Line 2',
        fieldType: 'text',
        category: 'Home Address',
        required: false,
        icon: 'LocationOn'
    },
    {
        uuid: rand(),
        id: 'homeAddress.state',
        label: 'State',
        fieldType: 'text',
        category: 'Home Address',
        required: true,
        icon: 'LocationCity'
    },
    {
        uuid: rand(),
        id: 'homeAddress.postCode',
        label: 'Post Code',
        fieldType: 'text',
        category: 'Home Address',
        required: true,
        icon: 'LocationCity'
    },
    {
        uuid: rand(),
        id: 'homeAddress.city',
        label: 'City',
        fieldType: 'text',
        category: 'Home Address',
        required: true,
        icon: 'LocationCity'
    }
];



export const styling: FormStyling[] = [
    {
        fieldType: 'text',
        style: {
            width: '240px',
        }
    },
    {
        fieldType: 'checkbox',
        style: {
            width: '240px',
        }
    },
    {
        fieldType: 'select',
        style: {
            width: '240px',
        }
    }

]

const emergencyContactFields: FieldDef[] = [
    {
        uuid: rand(),
        id: 'emergencyContact.firstName',
        label: 'First Name',
        fieldType: 'text',
        category: 'Emergency Contact',
        required: true,
        icon: 'PersonOutline'
    },
    {
        uuid: rand(),
        id: 'emergencyContact.lastName',
        label: 'Last Name',
        fieldType: 'text',
        category: 'Emergency Contact',
        required: true,
        icon: 'PersonOutline'
    },
    {
        uuid: rand(),
        id: 'emergencyContact.phoneNumber',
        label: 'Phone Number',
        fieldType: 'text',
        category: 'Emergency Contact',
        required: true,
        icon: 'Phone'
    },
    {
        uuid: rand(),
        id: 'emergencyContact.relationship',
        label: 'Relationship ',
        fieldType: 'text',
        category: 'Emergency Contact',
        required: true,
        icon: 'Group'
    }
];

// You can now use the emergencyContactFields array as needed in your code.

export const formDef: FieldDef[] = [...personDetails, ...employmentInformationFields, ...homeAddressFields, ...emergencyContactFields]

export const formUI: FormEngineUI = {
    formStyling: styling,
    theme: {
        primaryColor: '#b9b9b9',
        errorColor: 'red',
        highlightColor: '#0288d1',
        font: 'Arial',
        buttonPrimaryColor: '#0288d1',
        buttonSecondaryColor: 'red'
    }

}

