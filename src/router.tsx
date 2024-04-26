import { Route, Routes } from 'react-router-dom'
import { FormBuilder } from './Pages/FormBuilder'

import { Home } from '@mui/icons-material';

export default function Router() {

 
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {<Route path="/form-builder" element={<FormBuilder />} />}
    </Routes>
  );
}
