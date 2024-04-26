
import { Fab, ThemeProvider, Typography, createTheme } from "@mui/material"
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import * as icons from '@mui/icons-material';
import { useDrop } from "react-dnd";
import { DragableField } from "./Field";
import { FormEngine } from "../../Components/FormEngine";
import { FieldDef, FieldType, FormEngineUI, FormStyling } from "../../Components/FormEngine/types";
import styled from 'styled-components';
import { EditableFolder, FormFolder } from "./formFolder";
import { useRef } from "react";
import TemporaryDrawer from "./drawer";
import { FormBuilderContext, Form, FormBuilderContextType } from "../../State/FormBuilder";
import * as nano from 'nanoid'
import { ToggleView } from "./toggleView";
// import LoadingButton from '@mui/lab/LoadingButton';
import TransitionAlerts from "../../Components/Alert";
import { toCamelCase } from "../../libs/common";
const StyledCard = styled.div`
padding: 10px;
margin-bottom: 10px;
display: flex;
justify-content: flex-start;
align-items: center;
height: 100%;
width: 100%;
border: 1px solid rgba(0, 0, 0, 0.15);
// border: 1px solid #0288d5;
overflow: auto;
border-radius: 4px;
`;
export const styling: FormStyling[] = [
    {
        fieldType: 'text',
        style: {
            width: '240px',
            height: '200px'
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
        highlightColor: '#6564DB',
        font: 'Arial',
        buttonPrimaryColor: '#6564DB',
        buttonSecondaryColor: 'red'
    }

}



const theme = createTheme({
    palette: {
        primary: {
            main: "#6564DB",
        },
        secondary: {
            main: "#E3170A",
        },
        action: {
            active: "#6D6A75",
        },
        info: {
            main: "#6564DB",
        },

    },
});
const formFieldList = [{ label: 'Text Input', icon: icons.Abc, type: 'text' },
{ label: 'Paragraph', icon: icons.Subject, type: 'multi-line-text' },
{ label: 'Select', icon: icons.ArrowDropDownCircle, type: 'select' },
{ label: 'Checkbox', icon: icons.CheckBox, type: 'checkbox' },
{ label: 'Image', icon: icons.Image, type: 'image' }
]

export function DragDrop() {
    const [view, setView] = React.useState<string>('edit');
    const [edit, setEdit] = React.useState<boolean>(true);
    const [isDirty, setIsDirty] = React.useState<boolean>(false);
    const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
    const [selectedForm, setSelectedForm] = React.useState<Form>({ id: '', name: '', fields: [] } as Form)
    const [showWarning, setShowWarning] = React.useState<boolean>(false)
    const listItemRef = useRef(null);
    const { putForm, forms, setSelectedFieldId, setSelectedFormId, selectedFormId, selectedFieldId, deleteForm } = React.useContext(FormBuilderContext) as FormBuilderContextType


    React.useEffect(() => {
        console.log('########START VIEW RENDER USEEFFECT#####')
        if (view === 'edit') setEdit(true)
        else setEdit(false)
        console.log('########END VIEW RENDER USEEFFECT#####')
    }, [view])

    React.useEffect(() => {
        console.log('selectedForm', selectedForm)
        setIsDirty(false);
        if (selectedForm) {
            const form = forms.find(f => f.id === selectedForm.id)
            const lengthCheck = form?.fields.length === selectedForm.fields.length;
            setIsDirty(!lengthCheck);
            if (lengthCheck) console.log('no new changes')
            else console.log('new changes exist in the form')
        }
    }, [selectedForm])

    React.useEffect(() => {
        console.log('######## START FORMS ARRAY CHANGED USEFFECT############')
        console.log('forms', forms)
        if (!forms.length) setSelectedForm({ id: '', name: '', fields: [] })
        else if (!selectedFieldId) setSelectedFormId(forms[forms.length - 1].id)
        console.log('########END FORMS ARRAY CHANGED USEFFECT#####')
    }, [forms])

    React.useEffect(() => {
        console.log('########START SELECT FORM ID ARRAY CHANGED USEFFECT#####')
        const form = forms.find(f => f.id === selectedFormId)
        setSelectedForm(form as Form)
        console.log('########END SELECT FORM ID ARRAY CHANGED USEFFECT#####')
    }
        , [selectedFormId])

    const saveForm = () => {
        console.log('saving form')
        putForm(selectedForm)
        setIsDirty(false);
    }
    const deltForm = () => {
        console.log('deleting form');
        deleteForm(selectedFormId);
        console.log('forms length', forms.length);
        // forms.length > 0 ? setSelectedFormId(forms[forms.length - 1].id) : setSelectedFormId('');
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "field",
        drop: (item: { type: FieldType }) => addFieldToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const addFieldToBoard = (item: any) => {
        let rand = nano.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);
        setShowDrawer(true);
        let field: FieldDef = {
            uuid: rand(),
            id: '',
            category: "uncategorized",
            fieldType: item.type,
            label: "unnamed field",
            required: true,
        };

        // Use the latest state when updating the selectedForm
        setSelectedForm(prevForm => ({
            ...prevForm,
            fields: [...prevForm.fields, field]
        }));

        setSelectedFieldId(field.id);
    };


    const removeLastFieldFromBoard = () => {
        setSelectedForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.slice(0, -1)
        }));
        setShowDrawer(false);
    };


    type UpdateField = {
        fieldName: string
        fieldCategory: string
        fieldRequired: string
        selectableOptions?: string
    }


    const updateField = (input: any) => {
        const { fieldName, fieldCategory, fieldRequired, selectableOptions } = input as UpdateField;
        const updatedFields = selectedForm.fields.map((field) => {
            if (field.id === selectedFieldId) {
                return {
                    ...field,
                    id: toCamelCase(fieldCategory).concat(`.${toCamelCase(fieldName)}`),
                    category: fieldCategory,
                    label: fieldName,
                    required: fieldRequired === 'on' ? true : false,
                    options: selectableOptions?.split(",") ?? []
                };
            }
            return field;
        });

        setSelectedForm(prevForm => ({
            ...prevForm,
            fields: updatedFields
        }));
        setShowDrawer(false);
    };


    const onFieldDelete = (uuid: string) => {
        console.log('deleting field', uuid);
        setSelectedForm(prevForm => ({
            ...prevForm,
            fields: prevForm.fields.filter(field => field.uuid !== uuid)
        }));
    }


    const addForm = (formName: any) => {
        let rand = nano.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6)
        let newForm: Form = {
            id: rand(),
            name: formName,
            fields: []
        }
        putForm(newForm)
        setSelectedFormId(newForm.id)
        setSelectedForm(newForm)
    }
    return <ThemeProvider theme={theme}><div style={{ gap: "10px", flexDirection: 'column', justifyItems: 'center', alignItems: 'center', width: '100%' }}>
        {selectedForm && selectedForm?.fields.length > 0 && <TemporaryDrawer anchor={'right'} open={showDrawer} toggleDrawer={setShowDrawer} type={selectedForm.fields.find((item) => item.id === selectedFieldId)?.fieldType as FieldType} onCancel={removeLastFieldFromBoard} onSave={updateField} />}
        <div style={{ display: 'flex', justifyContent: 'end', width: '100%', paddingRight: '10px' }}>




            <div> <ToggleView callback={(input: string) => (setView(input))} /> </div>

        </div>
        <div style={{ display: 'flex', gap: "10px", flexDirection: 'row', padding: '10px', height: '100%', justifyItems: 'center', alignItems: 'flex-start', minWidth: '83vw' }} >
            <StyledCard style={{
                width: '22%',
                display: "flex", justifyContent: 'flex-start', flexDirection: 'column', gridTemplateColumns: '1fr', gap: '10px', padding: "6px",
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', }}>
                    <Typography fontWeight={900} color={'grey'}>Forms</Typography>
                </div>
                {
                    forms.map((form, index) => (
                        <FormFolder label={form.name} id={form.id} />
                    ))
                }
                <EditableFolder label="" callback={addForm} />
            </StyledCard>
            <StyledCard ref={forms.length ? drop : null} style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'whitesmoke', position: 'relative', gap: '10px', }}>

                <div style={{ marginBottom: '20px', width: '100%', }}>
                    {selectedForm?.fields && <FormEngine editMode={edit} formDef={selectedForm?.fields as FieldDef[]} prefillData={{}} formUI={formUI} onFieldDelete={onFieldDelete} />}
                    <TransitionAlerts {...{ message: 'create/select form before dragging fields', open: showWarning, severity: 'error', callback: setShowWarning }} />
                </div>
                {edit && <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: '10px', right: '10px', gap: '10px' }}>
                    <Fab color='info' onClick={saveForm} variant='circular' disabled={!isDirty} >
                        <icons.Save />
                    </Fab>
                    <Fab color='warning' onClick={deltForm} variant='circular' style={{ marginRight: '10px' }} disabled={!(forms.length > 0)}>
                        <icons.Delete />
                    </Fab>  </div>}
            </StyledCard>
            {edit && <StyledCard style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '21%', }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '6px', }}>
                    <Typography fontWeight={900} color={'grey'}>
                        Drag & Drop Fields
                    </Typography>
                </div>
                {formFieldList.map((item, index) => (
                    <ListItem ref={listItemRef} style={{ display: 'flex', width: '100%', justifyContent: 'center', }} key={item.label} disablePadding>
                        <DragableField muiIcon={item.icon} label={item.label} callback={setShowWarning} type={item.type as FieldType} />
                    </ListItem>
                ))}
            </StyledCard>}
        </div >

    </div >
    </ThemeProvider >



}






