import { FormEngine } from '.';
import { formUI, formDef, preFillData } from './exampleForm';
export function ExampleForm() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <FormEngine
        editMode={false}
        formDef={formDef} formUI={formUI} prefillData={preFillData} />
    </div>
  );
}