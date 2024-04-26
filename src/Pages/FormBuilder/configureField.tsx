import { Box } from "@mui/material"
import { FieldDef, FieldType, FormEngineUI, FormStyling } from "../../Components/FormEngine/types"
import { FormEngine } from "../../Components/FormEngine"
import * as nano from 'nanoid'
type ConfigureField = {
    type: FieldType
    onCancel: () => void
    onSave: (input: { [key: string]: any }) => void
}
export const ConfigureField = (props: ConfigureField) => {
    const { type, onCancel } = props
    switch (type) {
        case "text":
            return <ConfigureTextField onCancel={props.onCancel} onSave={props.onSave} />
        case "select":
            return <ConfigureSelect onCancel={props.onCancel} onSave={props.onSave} />
        case "checkbox":
            return <ConfigureCheckBox onCancel={props.onCancel} onSave={props.onSave} />
        case "multi-line-text":
            return <ConfigureTextField onCancel={props.onCancel} onSave={props.onSave} multiLine={true} />

        case "image":
            return <ConfigureImageField onCancel={props.onCancel} onSave={props.onSave} />
        default:
            return <></>

    }

}
let rand = nano.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);
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
const customUI: FormEngineUI = {
    formStyling: styling,
    cells: 2,
    theme: {
        primaryColor: '#b9b9b9',
        errorColor: 'red',
        highlightColor: '#6564DB',
        font: 'Arial',
        buttonPrimaryColor: '#6564DB',
        buttonSecondaryColor: 'red'
    }

}

const ConfigureTextField = (input: { onCancel: () => void, onSave: (input: { [key: string]: any }) => void, multiLine?: boolean }) => {

    const form: FieldDef[] = [{
        uuid: rand(),
        id: "fieldName",
        category: "configure text field",
        fieldType: 'text',
        label: 'Field Name',
        required: true
    },

    {
        uuid: rand(),
        id: "fieldCategory",
        category: "configure text field",
        label: 'category',
        fieldType: 'text',
        required: true,
    },
    {
        uuid: rand(),
        id: "fieldRequired",
        category: "configure text field",
        label: 'Is Mandatory ?',
        fieldType: 'checkbox',
        required: true,
    },

    ]
    return <FormEngine onCancel={input.onCancel} onSave={input.onSave} formDef={form} prefillData={{}}
        editMode={false} formUI={customUI} />


}

const ConfigureImageField = (input: { onCancel: () => void, onSave: (input: { [key: string]: any }) => void, multiLine?: boolean }) => {

    const form: FieldDef[] = [{
        uuid: rand(),
        id: "fieldName",
        category: "configure text field",
        fieldType: 'text',
        label: 'Field Name',
        required: true
    },

    {
        uuid: rand(),
        id: "fieldCategory",
        category: "configure text field",
        label: 'category',
        fieldType: 'text',
        required: true,
    },
    {
        uuid: rand(),
        id: "fieldRequired",
        category: "configure text field",
        label: 'Is Mandatory ?',
        fieldType: 'checkbox',
        required: true,
    },

    ]
    return <FormEngine onCancel={input.onCancel} onSave={input.onSave} formDef={form} prefillData={{}}
        editMode={false} formUI={customUI} />


}

const ConfigureSelect = (input: { onCancel: () => void, onSave: (input: { [key: string]: any }) => void }) => {
    const form: FieldDef[] = [{
        uuid: rand(),
        id: "fieldName",
        category: "configure select field",
        fieldType: 'text',
        label: 'Field Name',
        required: true
    },

    {
        uuid: rand(),
        id: "fieldCategory",
        category: "configure select field",
        label: 'category',
        fieldType: 'text',
        required: true,
    },
    {
        uuid: rand(),
        id: "fieldRequired",
        category: "configure select field",
        label: 'Is Mandatory ?',
        fieldType: 'checkbox',
        required: true,
    },
    {
        uuid: rand(),
        id: 'selectableOptions',
        label: 'Add Selectable Fields',
        fieldType: 'csv-text',
        category: "configure select field",
        required: true,
        icon: 'AccountCircle'
    },

    ]
    return <><FormEngine onCancel={input.onCancel} onSave={input.onSave} formDef={form} prefillData={{}}
        editMode={false} formUI={customUI} />
    </>
}



const ConfigureCheckBox = (input: { onCancel: () => void, onSave: (input: { [key: string]: any }) => void }) => {
    const form: FieldDef[] = [{
        uuid: rand(),
        id: "fieldName",
        category: "configure text field",
        fieldType: 'text',
        label: 'Field Name',
        required: true
    },

    {
        uuid: rand(),
        id: "fieldCategory",
        category: "configure text field",
        label: 'category',
        fieldType: 'text',
        required: true,
    },
    {
        uuid: rand(),
        id: "fieldRequired",
        category: "configure text field",
        label: 'Is Mandatory ?',
        fieldType: 'checkbox',
        required: true,
    },

    ]
    return <FormEngine onCancel={input.onCancel} onSave={input.onSave} formDef={form} prefillData={{}}
        editMode={false} formUI={customUI} />


}