import React, { useEffect, useState } from 'react';
import { Typography, Alert } from '@mui/material'
import { useRef } from 'react';
import { FieldDef, FieldError, FieldProps, FormEngineUI, PrefillData } from './types';
import { unflattenObject } from '../../libs/common';
import _, { set } from 'lodash'
import { getCategorizedFields, getStyling } from './helper';
import { CustomCheckboxField, CustomSelectField, CustomDateField, CustomTextField, MultiText, MultiLineTextField, ImageField } from './fields';
import { ButtonContainer, CustomButton, Grid, StyledForm } from '../CustomElements';

const FormBuilder = (input: { formDef: FieldDef[], prefillData: PrefillData, formUI: FormEngineUI, errors: FieldError[], isNotArray: boolean, editMode?: boolean, onFieldDelete?: (uuid: string) => void, onFieldEdit?: (uuid: string) => void }) => {
    const [editMode, setEditMode] = useState<boolean>(input.editMode ?? false)
    const { formUI } = input
    const cells = formUI.cells ?? 3
    useEffect(() => {
        setEditMode(input.editMode ?? false)
    }
        , [input.editMode])


    return <>{getCategorizedFields(input.formDef).map((field, index) => {
        for (let key in field) {

            const fields = field[key];
            return <div key={'container'.concat(index.toString())} >
                {<Typography style={{ marginBottom: "1px" }} key={'tpgy'.concat(index.toString())} color={'GrayText'} fontWeight={300} variant='subtitle2' >{key}</Typography>}
                <Grid showCells={editMode} cells={cells} key={'grid'.concat(index.toString())} className={key} style={{ ...getStyling({ category: key, styling: input.formUI.formStyling }) }}>
                    {fields.map((field, fIndex) => {
                        switch (field.fieldType) {
                            case 'text':
                                const fieldProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    icon: field.icon as string,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }

                                return <CustomTextField {...fieldProps} />

                            case 'checkbox':
                                const checkboxProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <CustomCheckboxField {...checkboxProps} />
                            case 'select':
                                const selectProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field?.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    options: field.options,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <CustomSelectField {...selectProps} />
                            case 'date':
                                const dateProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    icon: field.icon as string,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <CustomDateField {...dateProps} />

                            case 'csv-text':
                                const arrayProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    icon: field.icon as string,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <MultiText {...arrayProps} />

                            case 'multi-line-text':
                                const multiTextProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    icon: field.icon as string,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <MultiLineTextField {...multiTextProps} />

                            case 'image':
                                const imageProps: FieldProps = {
                                    onFieldDelete: input.onFieldDelete,
                                    onFieldEdit: input.onFieldEdit,
                                    uuid: field.uuid,
                                    id: field.id,
                                    label: field.label ?? 'no label',
                                    fieldType: field.fieldType,
                                    preFillData: input.prefillData,
                                    style: getStyling({ id: field.id, fieldType: field.fieldType, styling: input.formUI.formStyling }),
                                    errors: input.errors,
                                    icon: field.icon as string,
                                    theme: input.formUI.theme,
                                    editMode: editMode
                                }
                                return <ImageField {...imageProps} />
                            default:
                                return <div></div>
                        }
                    })}
                </Grid>
                <></>
            </div>
        }
    })
    }

    </>
}


export const Form = (input: { formDef: FieldDef[], prefillData: PrefillData, formUI: FormEngineUI, editMode: boolean, onSave?: (input: { [key: string]: any }) => void, onCancel?: () => void, onFieldDelete?: (uuid: string) => void, onFieldEdit?: (uuid: string) => void }) => {
    const [errors, Seterrors] = useState<FieldError[]>([])
    const [checkboxKey, setCheckboxKey] = useState<number>(Math.random())
    const [editMode, setEditMode] = useState<boolean>(input.editMode ?? false)
    const cells = input.formUI.cells ?? 3
    useEffect(() => {
        setEditMode(input.editMode)
    }, [errors, input.editMode]
    )

    const checkMissingFields = (event: React.FormEvent<HTMLFormElement>, formDef: FieldDef[]) => {
        let missingFields: FieldError[] = []
        formDef.forEach((field) => {
            if (field.required) {
                const formData = new FormData(event.currentTarget);
                if (!formData.get(field.id)) {
                    missingFields.push({ id: field.id, error: true, message: `${field.label} is required` })
                }
            }
        })
        Seterrors(missingFields)
        console.log("missingFields", missingFields)
        return missingFields
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        checkMissingFields(event, input.formDef)
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const obj = {} as { [key: string]: FormDataEntryValue | boolean }
        for (let [key, value] of formData.entries()) {

            obj[key] = value
        }
        const unflattenedObject = unflattenObject(obj)
        if (input.onSave) {
            input.onSave(unflattenedObject);
        }
        console.log("flat", obj)
        console.log("unflattened", unflattenedObject)
    };
    const theme = input.formUI.theme
    const formRef = useRef<HTMLFormElement>(null);
    return <StyledForm ref={formRef} onSubmit={handleSubmit}>
        {<FormBuilder editMode={input.editMode} formDef={input.formDef} prefillData={input.prefillData} formUI={input.formUI} errors={errors} isNotArray={true} onFieldDelete={input.onFieldDelete} onFieldEdit={input.onFieldEdit} />}

        {
            errors.map((item, index) =>
                <div key={'alert'.concat(index.toString())} style={{ marginBottom: '10px' }}>
                    <Alert key={item.id.concat(`-${index}`)} severity='error'>
                        {item.message}
                    </Alert>
                </div>
            )
        }
        {!editMode && <Grid cells={cells}>
            <CustomButton key='submit-btn' primaryColor={theme?.buttonPrimaryColor} highlightColor={theme?.buttonPrimaryColor} type='submit'>
                SAVE
            </CustomButton>
            <CustomButton key='cancel-btn' onClick={() => {
                setCheckboxKey(Math.random())
                Seterrors([])
                formRef?.current?.reset()
                if (input.onCancel) input.onCancel()
            }} primaryColor={theme?.buttonSecondaryColor} highlightColor={theme?.buttonPrimaryColor} type='button'>
                CANCEL
            </CustomButton>
        </Grid>}
    </StyledForm>
}

