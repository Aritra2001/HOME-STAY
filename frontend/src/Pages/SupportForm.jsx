import React, { useState } from 'react';
import SupportImg from '../assets/Support.svg'
import { IconContext } from 'react-icons/lib';
import { FaRegUser,  } from 'react-icons/fa'
import phoneIcon from '../assets/phone.svg'
import priorityImg from '../assets/priority.svg'
import categoryImg from '../assets/category.svg'
import Description from '../assets/description.svg'
import Loader from '../components/Loader';
import { ToastContainer, toast } from "react-toastify";

var json = ''

const SupportForm = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState(null)
    const [priority, setPriority] = useState(null)
    const [category, setCategory] = useState(null)
    const [description, setDesc] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const notify = () => {
        if(json.hasOwnProperty('message') === true) {
          toast.success('Form Submitted Successfully!')
        }
        else {
            toast.error(json.error)
        }
    }

    const handelSubmit = async (e) => {
        e.preventDefault()

        const support = { name, phone, priority, category, description }
        setLoading(true)

        const response = await fetch('https://home-stay-git-main-aritra2001.vercel.app/api/support', {
    
          method: 'POST',
          body: JSON.stringify(support),
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
            setName('')
            setPhone('')
            setPriority('')
            setCategory('')
            setDesc('')
            console.log('Support form submit Success!')
          } catch(e) {
            throw new Error(e)
          }
        }
    
        return json
    }

  return (
    <div className='w-full h-full pl-36 pr-[143.21px] pt-[127px] pb-[127.72px] bg-white justify-center items-center inline-flex flex'>
    <div className='w-[556px] h-[825px] bg-gradient-to-b from-emerald-200 to-green-400 rounded-[14px] border border-green-400 hidden lg:block md:block xl:block 2xl:block flex shrink items-center justify-center'>
    <p className=" w-[393px] text-white text-[27px] font-semibold indent-center flex font-['Poppins'] leading-[30px] mt-[10vh] mx-auto mt-[15vh]">Meet the guide for your smooth society experience</p>
    <a href="/"><img src={SupportImg} alt="Logo" className='w-[514px] h-[546px] mt-[25vh] ml-auto md:w-auto h-auto inline-flex overflow-x-auto overflow-y-auto'/></a>
    </div>
    <div className='w-[556px] h-[825px] bg-white rounded-[14px] xl:border border-green-400 ml-10 justify-center items-center flex-box max-sm:mt-[-20vh] max-sm:mx-auto'>
    <div className="text-black text-[40px] font-semibold font-['Poppins'] leading-[47px] mt-[8vh] items-center justify-center flex">Support</div>

    <input type="text" placeholder='Enter your Name' id='name' value={name} onChange={(e)=>setName(e.target.value)} aria-label='your name' className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[10vh] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium  text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" required > 
    </input>
    <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px]'></div>
    <IconContext.Provider value={{className:'absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px]', size: 20, }}>
    <FaRegUser color='#A0A0A0'/>
    </IconContext.Provider>

    <input type="number" placeholder='Enter your Phone No' id='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} aria-label='your phone no' className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[17.25px] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium  text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" required > 
    </input>
    <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px]'></div>
    <img src={phoneIcon} alt="Phone Icon" className=' w-[20px] h-[20px] absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px]' />

    <select name="priority" aria-label='your priority level' className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[17.25px] indent-[4.5rem] text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" value={priority} onChange={(e)=>setPriority(e.target.value)} required style={{ color: priority ? "black" : "#9ca3af" }}>
    <option value="null">Select your Priority Level</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
    </select>
    <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px]'></div>
    <img src={priorityImg} alt="priority Icon" className='w-[20px] h-[20px] absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px]' />

    <select name="category" aria-label='your category' className="w-[423px] h-[62.75px] rounded-[10px] border border-stone-300 relative shrink mt-[17.25px] indent-[4.5rem] text-[13px] font-normal font-['Poppins'] max-sm:w-[320px]" value={category} onChange={(e)=>setCategory(e.target.value)} required style={{ color: category ? "black" : "#9ca3af" }}>
    <option value="null">Select your Category</option>
    <option value="account acccess">Account Access</option>
    <option value="setup">Setup</option>
    <option value="payments">Payments</option>
    <option value="technical glitch">Technical Glitch</option>
    </select>
    <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-6.8vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px]'></div>
    <img src={categoryImg} alt="category Icon Icon" className='w-[24px] h-[24px] absolute ml-[5.2rem] mt-[-40px] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px]' />

    <textarea placeholder='Detailed Description' id='desc' value={description} onChange={(e)=>setDesc(e.target.value)} aria-label='Dscription' className="w-[423px] h-[165px] rounded-[10px] border border-stone-300 relative shrink mt-[17.25px] indent-[4.5rem] placeholder-text-slate-500 placeholder:font-medium pt-[3.5vh] text-[13px] font-normal font-['Poppins'] font-bold max-sm:w-[320px]" required > 
    </textarea>
    <div className='w-[1px] h-[35.858px] border border-neutral-200 ml-[7.5rem] mt-[-21.5vh] absolute max-sm:mx-[47px] max-md:mx-[47px] max-lg:mx-[47px] max-sm:mt-[-20vh]'></div>
    <img src={Description} alt="category Icon Icon" className='w-[20px] h-[20px] absolute ml-[5.2rem] mt-[-21vh] max-sm:mx-[17px] max-md:mx-[17px] max-lg:mx-[17px] max-xl:mx-[17px] max-xl:mx-[47px] max-sm:mt-[-19.2vh]' />
    <ToastContainer />
    <button type='submit' id='login_btn' onClick={handelSubmit} className="w-[130px] h-[37px] bg-teal-600 rounded-[7px] text-white text-xl font-semibold font-['Lexend'] mt-[7vh] overflow-hidden max-sm:w-full max-md:w-full" disabled={loading}>{loading ? <Loader /> : <>Submit</>}</button>
    {error && <div className='error'>{error}</div>}
    </div>
    </div>
  );
}

export default SupportForm;
