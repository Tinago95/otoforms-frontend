
import Container from './Components/Container'
import { FormBuilderProvider } from './State/FormBuilder'
import Router from './router'

function App() {

  return (
    <FormBuilderProvider>
      <Container children={<Router />} />
    </FormBuilderProvider>
  )
}

export default App
