import React from 'react';
import '../index.css';
import GreenTick  from '../assets/Tick.svg'
import Logo from '../assets/logo.svg'

const SignupVerified = () => {
  return (
    <div className='w-full h-screen relative items-center justify-center flex'>
        <div className="verified">
            <img src={GreenTick} alt="Verified Green Tick" className='-mt-[15rem]' />
            <img src={Logo} alt="Home Stay Logo" className='mt-[3vh]'/>
            <div className="w-[674px] h-12 text-black text-[45px] relative font-semibold font-['Poppins'] italic mt-[3vh]">
                Your email has been verified 
            </div>
        </div>
    </div>
  );
}

export default SignupVerified;
