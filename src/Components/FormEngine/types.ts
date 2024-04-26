import React from 'react';
import jsonData from './icons.json';
type Icons = typeof jsonData;
/**
 *  These types define the structure of a form 
 * 
 */
export type FieldDef = {
    uuid: string
    id: string
    label?: string
    required?: boolean
    icon?: keyof Icons
    options?: string[]
    fieldType?: FieldType
    category: string
    className?: string
    children?: FieldDef[]
    autoFill?: "off" | "on"
}

export type PrefillData = {
    [key: string]: string | boolean;
};

export type FieldType = 'array' | 'multi-line-text' | 'csv-text' | 'text' | 'checkbox' | 'switch' | 'radio' | 'select' | 'date' | 'time' | 'datetime-local' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'url' | 'week'
export type FormStyling = {
    categoryStyling?: string[]
    id?: string
    fieldType?: FieldType
    style: React.CSSProperties
}

export type FormEngineUI = {
    formStyling: FormStyling[]
    theme?: FormEngineTheme
    cells?: number

}
type Color = React.CSSProperties['color']
type Font = React.CSSProperties['font']

export type FormEngineTheme = {
    primaryColor?: Color
    buttonPrimaryColor?: Color
    buttonSecondaryColor?: Color
    errorColor?: Color
    highlightColor?: Color
    gridSpan?: number
    font?: Font

}

export type FieldProps = {
    uuid: string
    id: string
    label: string
    required?: boolean
    icon?: string
    fieldType: FieldType
    className?: string
    preFillData?: PrefillData
    style?: React.CSSProperties
    errors?: FieldError[]
    options?: string[]
    theme?: FormEngineTheme
    autoFill?: "off" | "on"
    editMode?: boolean
    onFieldEdit?: (uuid: string) => void
    onFieldDelete?: (uuid: string) => void
}

export type FieldError = {
    id: string
    message?: string
    error: boolean
}