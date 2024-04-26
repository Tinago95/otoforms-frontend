import { FieldDef, FormEngineUI, PrefillData } from './types';
import { Form } from './form';

//TODO: create custom drop down component
//TODO: Add Calback function to handle form submission
//TODO: Implement existing forms
//TODO: Submit Button Customisation, color(controlled via theme), text, etc
export function FormEngine(input: { formDef: FieldDef[], prefillData: PrefillData, formUI: FormEngineUI, editMode: boolean, onSave?: (input: { [key: string]: any }) => void, onCancel?: () => void, onFieldDelete?: (uuid: string) => void, onFieldEdit?: (uuid: string) => void }) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      {<Form editMode={input.editMode} formDef={input.formDef} prefillData={input.prefillData} formUI={input.formUI} onSave={input.onSave} onCancel={input.onCancel} onFieldDelete={input.onFieldDelete} onFieldEdit={input.onFieldEdit} />}
    </div>
  );
}