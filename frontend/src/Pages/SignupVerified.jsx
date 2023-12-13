import React from 'react';
import '../index.css';
import GreenTick  from '../assets/Tick.svg'
import Logo from '../assets/logo.svg'

const SignupVerified = () => {

  var json = ''
  var email = json.user

  const getToken = () => {
    const url = window.location.pathname
    const token = url.substring((url.lastIndexOf('/') + 1), )
    return token
  }

  const verifyEmail = async() => {

    const token = getToken()
    const response = await fetch(`https://home-stay-aritra2001.vercel.app/api/users/verify-email/${token}`, {

    method: 'GET',
  })
  json = await response.json()
  console.log(json.user)

  }
  return (
    <div className='w-full h-screen relative items-center justify-center flex' onLoad={verifyEmail}>
        <div className="verified max-sm:w-fit max-sm:h-screen max-sm:ml-[16rem] max-sm:mt-[15rem]">
            <img src={GreenTick} alt="Verified Green Tick" className='-mt-[2rem]' />
            <img src={Logo} alt="Home Stay Logo" className='mt-[3vh]'/>
            <div className="w-[674px] h-12 text-black text-[45px] font-semibold font-['Poppins'] italic mt-[3vh] max-sm:text-[35px] ">
                Your email has been verified 
            </div>
            <div className='text-black text-base font-regular font-["Poppins"] mt-[3rem] max-sm:mt[-3rem] max-sm:text-[20px]'>
            Your email id has been Verified!<br/>
            You can now login with this email id.
            </div>
            <a href="/"><button className="w-[119px] h-[39px] bg-teal-600 rounded-[7px] text-white text-xl font-normal font-['Lexend'] mt-[3rem]">LOGIN</button></a>
        </div>
    </div>
  );
}

export default SignupVerified;
