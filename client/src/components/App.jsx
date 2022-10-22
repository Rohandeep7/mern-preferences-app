import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {Routes,Route,Link} from 'react-router-dom'
function App() {
  return (
    <>
      
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
