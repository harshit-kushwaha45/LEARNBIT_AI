import React,{useState} from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"
const Input = (
    {value,onChange,
    label,
      placeholder, type,}
) => {
    const [showPassword,setShowPassword]    = useState(false);
    const toggleShowpassword=()=>{
        setShowPassword(!showPassword);
    }
  return (
    <div>
    <label className='text-[14px] text-slate-800'>{label}</label>
    <div className="input-box">
        <input name='password' type={type==="password" ?(showPassword?"text":"password"):type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
        value={value}
        onChange={(e)=>onChange(e)}
        />
        {type==="password" && (
            <>
            {showPassword?(
                <FaRegEye
                size={22}
                className='cursor-pointer text-primary'
                onClick={()=>toggleShowpassword()}
            />):
            (<FaRegEyeSlash
            size={22}
            className='text-slate-500 cursor-pointer'
            onClick={()=>toggleShowpassword( )}
            />
        )}
        </>
        )}
    </div>
    </div>
  )
};

export default Input