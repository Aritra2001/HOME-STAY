import React from 'react';
import '../index.css';
import GreenTick  from '../assets/Tick.svg'
import Logo from '../assets/logo.svg'

const SignupVerified = () => {

  var json = ''

  const getToken = () => {
    const url = window.location.pathname
    const token = url.substring((url.lastIndexOf('/') + 1), )
    return token
  }

  const verifyEmail = async() => {

    const token = getToken()
    const response = await fetch(`https://home-stay-beryl.vercel.app/api/users/verify-email/${token}`, {

    method: 'GET',
    headers : {
      'Content-Type': 'application/json'
    }
  })
  json = await response.json()

  }
  return (
    <div className='w-full h-screen relative items-center justify-center flex' onLoad={verifyEmail}>
        <div className="verified">
            <img src={GreenTick} alt="Verified Green Tick" className='-mt-[15rem]' />
            <img src={Logo} alt="Home Stay Logo" className='mt-[3vh]'/>
            <div className="w-[674px] h-12 text-black text-[45px] relative font-semibold font-['Poppins'] italic mt-[3vh]">
                Your email has been verified 
            </div>
            <p>{json}</p>
        </div>
    </div>
  );
}

export default SignupVerified;
