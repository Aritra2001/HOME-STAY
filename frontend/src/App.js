import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Error from './Pages/Error';
import ForgotPassword from './Pages/ForgotPassword';
import Resetpassword from './Pages/Resetpassword';
import SignupVerified from './Pages/SignupVerified';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route
        path='/'
        element={<Login />} />
        <Route
        path='/signup'
        element={<Signup />} />
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
        path='*'
        element={<Error />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
