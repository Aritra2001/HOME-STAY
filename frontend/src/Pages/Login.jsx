import React, { useState } from 'react';
import Login_img from '../assets/login_img.svg'
import Logo from '../assets/logo.svg'
import Toggle from '../components/Toggle';
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  var json = '';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const notify = () => {
    
    if(json.hasOwnProperty('token') === true) {
      toast.success('Login Sucessfull!')
    }
    else {
      toast.error(json.error)
    }
  }

  const handelSubmit = async (e) => {
    
    e.preventDefault()

    const login = {email, password}

    const response = await fetch('https://home-stay-delta.vercel.app/api/users/login', {

      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(login),
      headers : {
        'Content-Type': 'application/json'
      }
    })
    json = await response.json()
    notify()
    if(!response) {
      try {
        setError(json.error)
      } catch(e) {
        throw new Error(e)
      }
    }
    if(response.ok) {
      try {
        setError(null)
        setEmail('')
        setPassword('')
        console.log('Successfull login')
        navigate('/signup')
      } catch(e) {
        throw new Error(e)
      }
    }

    return json
  }


  return (
    <div className='w-full h-full pl-36 pr-[143.21px] pt-[127px] pb-[127.72px] bg-white justify-center items-center inline-flex flex'>
        <div className='w-[556px] h-[825px] bg-gradient-to-b from-emerald-200 to-green-400 rounded-[14px] hidden lg:block md:block xl:block 2xl:block flex shrink'>
            <a href="/"><img src={Login_img} alt="Logo" className='w-[514px] h-[546px] mt-40 ml-auto md:w-auto h-auto inline-flex overflow-x-auto overflow-y-auto'/></a>
            <p className="text-white text-[15px] font-semibold font-['Poppins'] leading-[17.62px] mt-10">Meet the guide for your smooth society experience</p>
        </div>
        <div className='w-[556px] h-[825px] bg-white rounded-[14px] xl:border border-zinc-400 ml-10 justify-center items-center flex-box max-sm:mt-[-10vh] '>
            <a href='/'><img src={Logo} alt="Logo" className='mt-20 mx-auto flex cursor-pointer'/></a>
            <p className="text-black text-[42px] font-normal font-['Lexend'] mt-10 items-center justify-center flex">Welcome👋</p>
            <Toggle />
            <input type="email" placeholder='Enter your Email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} aria-label='your email' className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[8vh] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium text-[13px] font-normal font-['Poppins'] font-bold" required > 
            </input>
            <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px]'></div>
            <IconContext.Provider value={{ className: 'absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px]  max-xl:mx-[17px]', size: 20 }}>
            <FaRegEnvelope color='#A0A0A0'/>
            </IconContext.Provider>
            <input placeholder='Enter your Password' id='password' value={password} autoComplete="current-password" type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} aria-label='your password'className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[5vh] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium  text-[13px] font-normal font-['Poppins'] font-bold" required>
            </input>
            <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px] max-xl:mx-[47px]'></div>
            <IconContext.Provider value={{ className: 'absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px]', size: 20 }}>
            {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#A0A0A0'/> : <FaRegEye onClick={togglePasswordVisibility} color='#A0A0A0'/>}
            </IconContext.Provider>
            <p className="text-gray-500 text-[13px] font-normal font-['Poppins'] mt-[3vh] ml-[19rem]"><a href="/forgotpassword">Forgot Password?</a></p>
            <ToastContainer />
            <button type='submit' id='login_btn' onClick={handelSubmit} className="w-[119px] h-[37px] bg-teal-600 rounded-[7px] text-white text-xl font-semibold font-['Lexend'] mt-[7vh] overflow-hidden max-sm:w-full max-md:w-full">Login</button>
            {error && <div className='error'>{error}</div>}
            <p className="text-gray-500 text-[13px] font-normal font-['Poppins'] mt-[4vh]">Does not have an account? <a className="text-sky-900 text-[13px] font-normal font-['Poppins']" href='/signup'>Signup</a></p>
        </div>
    </div>
  );
}

export default Login;
