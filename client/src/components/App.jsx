import Login from './user/Login'
import Register from './user/Register'
import Home from './user/Home';
import NotFound from './user/NotFound';
import {Routes,Route} from 'react-router-dom'
import {AuthProvider} from '../context/auth/AuthContext'
import { PersonalInfoProvider } from '../context/personal_user/PersonalInfoContext';
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import PersonalPreferences from './user/PersonalPreferences';
import Admin from './admin/Admin';
import AdminPersonalSearch from './admin/AdminPersonalSearch';
import AdminProfessionalSearch from './admin/AdminProfessionalSearch';
import ProfessionalInfo from './user/ProfessionalInfo';
import { ProfessionalInfoProvider } from '../context/professional_user/ProfessionalInfoContext';
import { PersonalSearchProvider } from '../context/admin/PersonalSearchContext';

function App() {
  return (
    <>
      <AuthProvider>
        <PersonalSearchProvider>
          <PersonalInfoProvider>
            <ProfessionalInfoProvider>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route index element={<PersonalPreferences />} />
                  <Route
                    path="professional-info"
                    element={<ProfessionalInfo />}
                  />
                </Route>
                <Route path="/admin" element={<Admin />}>
                  <Route index element={<AdminPersonalSearch />} />
                  <Route
                    path="professional-search"
                    element={<AdminProfessionalSearch />}
                  />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/*" element={<NotFound />} />
              </Routes>
              <ToastContainer />
            </ProfessionalInfoProvider>
          </PersonalInfoProvider>
        </PersonalSearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;
