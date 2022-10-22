import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {Routes,Route} from 'react-router-dom'
import {AuthProvider} from '../context/AuthContext'
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer/>
      </AuthProvider>
    </>
  );
}

export default App;
