import { createContext, FC, useState, PropsWithChildren, useEffect } from 'react'
import { FieldDef } from '../Components/FormEngine/types'
import { update } from 'lodash'
export type Form = {
    id: string
    name: string
    fields: FieldDef[]
}
export type FormBuilderContextType = {
    toggleDrawer: (bool: boolean) => void
    drawerOpen: boolean
    forms: Form[]
    putForm: (forms: Form) => void
    deleteForm: (formId: string) => void
    selectedFieldId: string
    selectedFormId: string
    setSelectedFieldId: (id: string) => void
    setSelectedFormId: (id: string) => void
}

export const FormBuilderContext = createContext<FormBuilderContextType>({} as FormBuilderContextType)

export const FormBuilderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentFieldId, setCurrentFieldId] = useState<string>('')
    const [currentFormId, setCurrentFormId] = useState<string>('')
    const [forms, setForms] = useState<Form[]>([])
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    useEffect(() => {
        const form = forms.find(f => f.id === currentFormId)
    }
        , [currentFormId])

    useEffect(() => {
    }
        , [forms])




    const putForm = (form: Form) => {
        const existingFormIndex = forms.findIndex(f => f.id === form.id)
        if (existingFormIndex !== -1) {
            const updatedForms = [...forms]
            updatedForms[existingFormIndex] = form
            setForms(updatedForms)
        } else {
            setForms([...forms, form])
        }
    }
    const deleteForm = (formId: string) => {
        const updatedForms = forms.filter(f => f.id !== formId);
        console.log('updatedForms after delete', updatedForms)
        setForms(updatedForms);

    }


    return (
        <FormBuilderContext.Provider
            value={{
                toggleDrawer: (bool: boolean) => setDrawerOpen(bool),
                deleteForm,
                drawerOpen,
                selectedFieldId: currentFieldId,
                selectedFormId: currentFormId,
                setSelectedFieldId: setCurrentFieldId,
                setSelectedFormId: setCurrentFormId,
                putForm,
                forms
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    )
}
