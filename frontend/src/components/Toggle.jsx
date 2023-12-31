import './toggle.css'
import { useNavigate } from 'react-router-dom'

const Toggle = () => {

  const navigate = useNavigate()

  const handelRoutes = () => {

    if(window.location.pathname === '/signup') {
      navigate('/')
    }
    else {
      navigate('/signup')
    }

  }

  const styles = {
    sign_up: {
      background: 'white',
      color: 'black',
    },
    log_in: {
      background: 'white',
      color: 'black'
    }
  }

  const SetLoginBackground = () => {
    if(window.location.pathname === '/') {
      return styles.log_in
    }
  }

  const SetSignupBackground = () => {
    if(window.location.pathname === '/signup') {
      return styles.sign_up
    }
  }

  return (
    <div className='w-[249px] h-[41px] bg-zinc-100 rounded-[11px] justify-center flex items-center mt-5 mx-auto'>
    
      <div className='justify-content items-center'>
      <ul>

        <li>
        <div className='sign_up'style={SetSignupBackground()}><li onClick={handelRoutes} style={{cursor: 'pointer'}}>Signup</li></div>
        <div className='log_in' style={SetLoginBackground()}><li onClick={handelRoutes} style={{cursor: 'pointer'}}>Login</li></div>
        </li>

      </ul>
      </div>

    </div>
  );
}

export default Toggle;
