import React from 'react';
import ErrorPage  from '../assets/404.svg'
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate()
  return (
    <div className='w-full h-screen bg-white justify-center items-center flex-col flex max-sm:mx-[rem] max-md:mx-auto max-sm:mt-[-8vh]'>
      <img src={ErrorPage} alt="error pic" className='w-[520px] h-[520px] flex -mt-[10vh] max-sm:mt-[-15vh]' />
      <div className="relative w-full h-12 text-black text-[40px] font-semibold font-['Poppins'] max-sm:mt-[-1rem] text-[38px] flexh-fit max-sm:text-[30px] max-sm:mt-[-11vh]">Looks like you are lost</div>
      <button className="w-[9rem] h-[3rem] bg-teal-600 rounded-[9px] text-white text-[26px] font-semibold font-['Lexend'] text-white mt-[1rem] max-sm:w-[7.5rem] h-[2.5rem] text-[20px]" onClick={() => navigate(-1)}>GO BACK</button>
    </div>
  );
}

export default Error;
