import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Error from './Pages/Error';
import ForgotPassword from './Pages/ForgotPassword';
import Resetpassword from './Pages/Resetpassword';
import SignupVerified from './Pages/SignupVerified';
import { useAuthContext } from './hooks/useAuthContext'
import Home from './Pages/Home';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route
        path='/'
        element={!user ?<Login /> : <Navigate to='/dashboard'/>} />
        <Route
        path='/signup'
        element={!user ?<Signup /> : <Navigate to='/dashboard'/>} />
        <Route
        path='/forgotpassword'
        element={<ForgotPassword />} />
        <Route
        path='/resetpassword/:token'
        element={<Resetpassword />} />
        <Route
        path='/signup/:token'
        element={<SignupVerified />} />
        <Route
        path='/dashboard'
        element={ user ? <Home /> : <Navigate to='/'/>} />
        <Route
        path='*'
        element={<Error />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
