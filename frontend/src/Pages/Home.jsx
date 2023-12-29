import React from 'react';
import { useLogout } from '../hooks/useLogout';

const Home = () => {

  const { logout } = useLogout()

  const handelNotification = () => {
    Notification.requestPermission()
    .then((perm) => {
      alert(perm)
    })
  }

  return (
    <div className='w-full h-screen justify-center align-center'>
      <nav className='-mt-3 bg-gray-200 pb-4'>
      <button onClick={logout} className="w-[100px] h-[37px] bg-teal-600 rounded-[7px] text-white text-xl font-semibold font-['Lexend'] mt-[4vh] ml-[80%] overflow-hidden max-sm:w-[60px] max-sm:h-[29px] max-md:w-full max-sm:ml-[17rem] max-sm:font-normal max-sm:text-[12px]">Logout</button>
      </nav>
      <div className="p-5 font-normal font-['Lexend']">
        Home Page
      </div>
    </div>
  );
}

export default Home;
