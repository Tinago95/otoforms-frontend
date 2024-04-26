import { FieldDef, FormStyling, FormEngineUI, PrefillData } from "./types"
import * as nano from 'nanoid'
export const preFillData: PrefillData = {
    "name.firstName": 'John',
    "name.lastName": 'Doe',
    "ausResident": 'true',
    'maritalStatus': 'Married',
}
let rand = nano.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);
const banking: FieldDef[] = [
    {
        uuid: rand(),
        id: `bankingInfo.bankName`,
        label: 'Bank Name',
        fieldType: 'text',
        category: `Bank Account `,
        required: true,
        icon: 'AccountBalance'
    },
    {
        uuid: rand(),
        id: `bankingInfo.accountNumber`,
        label: 'Account Number',
        fieldType: 'text',
        category: `Bank Account `,
        required: true,
        icon: 'AccountBalanceWallet'
    },
    {
        uuid: rand(),
        id: `bankingInfo.bsb`,
        label: 'BSB',
        fieldType: 'text',
        category: `Bank Account `,
        required: true,
        icon: 'AccountBalanceWallet'
    },
    {
        uuid: rand(),
        id: `bankingInfo.distribution`,
        label: 'Distribution',
        fieldType: 'text',
        category: `Bank Account `,
        required: true,
        icon: 'Percent'
    },
    {
        uuid: rand(),
        id: `bankingInfo.accountAlias`,
        label: 'Account Alias',
        fieldType: 'text',
        category: `Bank Account `,
        required: true,
        icon: 'AbcRounded'
    }
]


export const formDef: FieldDef[] = [
    {
        uuid: rand(),
        id: 'name.firstName',
        label: 'First Name',
        fieldType: 'text',
        category: 'Name',
        required: true,
        icon: 'Abc'
    },
    {
        uuid: rand(),
        id: 'banking.bankingdetails',
        children: banking,
        category: 'Banking',
        required: false,
        fieldType: 'array'
    },

    {
        uuid: rand(),
        id: 'name.dateOfBirth',
        label: 'Date of Birth',
        fieldType: 'date',
        category: 'Name',
        required: true,
        icon: 'CalendarMonthOutlined'
    },
    {
        uuid: rand(),
        id: 'name.middleName',
        label: 'Middle Name',
        fieldType: 'text',
        category: 'Name',
        required: true,
        icon: 'PermIdentity'
    },
    {
        uuid: rand(),
        id: 'name.otherName',
        label: 'Other Name',
        fieldType: 'text',
        category: 'Name',
        required: true,
        icon: "Person2"
    },
    {
        uuid: rand(),
        id: 'name.lastName',
        label: 'Last Name',
        fieldType: 'text',
        category: 'Name',
        required: true,
        icon: 'PermIdentity'
    },

    {
        uuid: rand(),
        id: 'maritalStatus',
        label: 'Marital Status',
        fieldType: 'select',
        options: ['Single', 'Married', 'Divorced', 'Widowed'], // first item is always the label
        category: 'Name',
        required: true


    },
    {
        uuid: rand(),
        id: 'jobTitle',
        label: 'Job Title',
        fieldType: 'select',
        options: ['Engineer', 'Tradesman',], // first item is always the label
        category: 'Name',
        required: true
    },

    {
        uuid: rand(),
        id: 'streetAddress',
        label: 'Street Address',
        fieldType: 'text',
        category: 'Address',
        required: true,
        icon: 'PermIdentity'

    },
    {
        uuid: rand(),
        id: 'ausResident',
        label: 'Australian Resident',
        fieldType: 'checkbox',
        category: 'Address',
        required: true

    },
    {
        uuid: rand(),
        id: 'aboriginal',
        label: 'Aboriginal or Torres Strait Islander',
        fieldType: 'checkbox',
        category: 'Address',
        required: true

    }

]

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