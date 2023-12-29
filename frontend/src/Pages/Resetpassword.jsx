import React from 'react';
import Forgot from '../assets/forgotpassword.svg'
import { IconContext } from 'react-icons/lib';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


const Resetpassword = () => {

  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getToken = () => {
    const url = window.location.pathname
    const token = url.substring((url.lastIndexOf('/') + 1), )
    return token
  }

  var json = '';

  const notify = () => {
    
    if(json.hasOwnProperty('token') === true) {
      toast.success('Reset Password Mail sent successfully!')
    }
    else {
      toast.error(json.error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showconfirmPassword)
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    const resetpassword = { password, confirmpassword }

    const token = getToken()
    setLoading(true)
    const response = await fetch(`https://home-stay-git-main-aritra2001.vercel.app/api/users/reset-password/${token}`, {

    method: 'POST',
    body: JSON.stringify(resetpassword),
    headers : {
      'Content-Type': 'application/json'
    }
  })
  setLoading(false)
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
        setPassword('')
        setConfirmPassword('')
        toast.success('Password Reset Successfull!')
        setTimeout(() => {
          navigate('/')
        }, 5000);
      } catch(e) {
        throw new Error(e)
      }
    }
  }

  return (
    <div className='w-full h-full bg-white justify-start items-center inline-flex'>
      <div className='w-[650px] h-fit rounded-[14px] ml-[96px] flex shrink-1 hidden sm:block md:block'>
        <img src={Forgot} alt="Forgot password" />
      </div>
      <div className='flex justify-center items-center flex-col m-auto mt-[8rem] max-sm:mx-auto'>
        <div className="h-fit text-black text-[45px] font-semibold font-['Poppins'] flex-box max-sm:text-[40px] m-auto max-md:text-[40px]">Reset Your Password</div>
        <p className="h-fit text-center text-black text-[15px] font-normal font-['Poppins'] flex m-auto mt-[2rem]">Enter your new password for your Home Stay account<br className='max-sm:hidden '/> your registered mail.</p>
        <input placeholder='Enter your Password' id='password' value={password} autoComplete="current-password" type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} onCopy={(e) => e.preventDefault()} aria-label='your password'className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[5vh] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium  text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" required>
        </input>
        <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[-19rem] mt-[-6.8vh] relative max-sm:ml-[-13rem]'></div>
        <IconContext.Provider value={{ className: 'relative ml-[-22.5rem] mt-[-28px] max-sm:ml-[-16rem]', size: 20 }}>
        {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#A0A0A0'/> : <FaRegEye onClick={togglePasswordVisibility} color='#A0A0A0'/>}
        </IconContext.Provider>
        <input placeholder='Confirm your Password' id='password' vlue={confirmpassword} autoComplete="current-password" type={showconfirmPassword ? 'text' : 'password'} onChange={(e)=>setConfirmPassword(e.target.value)} onPaste={(e) => e.preventDefault()} aria-label='confirm password'className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[5vh] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium  text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" required>
        </input>
        <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[-19rem] mt-[-6.8vh] relative max-sm:ml-[-13rem]'></div>
        <IconContext.Provider value={{ className: 'relative ml-[-22.5rem] mt-[-28px] max-sm:ml-[-16rem]', size: 20 }}>
        {!showconfirmPassword ? <FaRegEyeSlash onClick={toggleConfirmPasswordVisibility} color='#A0A0A0'/> : <FaRegEye onClick={toggleConfirmPasswordVisibility} color='#A0A0A0'/>}
        </IconContext.Provider>
        <ToastContainer />
        <button type='submit' id='login_btn' onClick={handelSubmit} className="w-[130px] h-[37px] bg-teal-600 rounded-[7px] text-white text-xl font-semibold font-['Lexend'] mt-[9vh] overflow-hidden max-sm:w-[320px] max-md:w-[420px]" disabled={loading}>{loading ? <Loader /> : <>Submit</>}</button>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
}

export default Resetpassword;