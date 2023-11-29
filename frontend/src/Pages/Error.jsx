import React from 'react';
import ErrorPage  from '../assets/404.svg'
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate()
  return (
    <div className='w-full h-screen bg-emerald-50 justify-center items-center flex-col flex'>
      <img src={ErrorPage} alt="error pic" className='w-[520px] h-[520px] flex -mt-[10vh] max-sm:mt-[-8rem]' />
      <div className="w-[506px] h-12 text-black text-[40px] font-semibold font-['Poppins'] max-sm:mt-[-1rem] text-[38px] h-fit">Looks like you are lost</div>
      <button className="w-[9rem] h-[3rem] bg-teal-600 rounded-[9px] text-white text-[26px] font-semibold font-['Lexend'] text-white mt-[1rem] " onClick={() => navigate(-1)}>GO BACK</button>
    </div>
  );
}

export default Error;
