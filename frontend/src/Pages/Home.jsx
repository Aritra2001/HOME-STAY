import React from 'react';
import { useLogout } from '../hooks/useLogout';

const Home = () => {

  const { logout } = useLogout()

  return (
    <div className='w-full h-screen justify-center align-center'>
      <nav>
      <button onClick={logout} className="w-[100px] h-[37px] bg-teal-600 rounded-[7px] text-white text-xl font-semibold font-['Lexend'] mt-[4vh] ml-[80%] overflow-hidden max-sm:w-[80px] max-md:w-full max-sm:ml-[15rem] max-sm:font-normal max-sm:text-[15px]">Logout</button>
      </nav>
      <div className="p-5 font-normal font-['Lexend']">
        Home Page
      </div>
    </div>
  );
}

export default Home;
