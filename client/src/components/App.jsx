import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {Routes,Route} from 'react-router-dom'
import {AuthProvider} from '../context/AuthContext'
import { PersonalInfoProvider } from '../context/PersonalInfoContext';
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import PersonalPreferences from './pages/PersonalPreferences';
import ProfessionalInfo from './pages/ProfessionalInfo';
import { ProfessionalInfoProvider } from '../context/ProfessionalInfoContext';
function App() {
  return (
    <>
      <AuthProvider>
        <PersonalInfoProvider>
          <ProfessionalInfoProvider>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<PersonalPreferences />} />
              <Route path="professional-info" element={<ProfessionalInfo />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
          </ProfessionalInfoProvider>
        </PersonalInfoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
