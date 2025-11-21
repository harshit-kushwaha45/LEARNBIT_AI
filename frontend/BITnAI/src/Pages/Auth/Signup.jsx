import React, { useState , useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import { ValidateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/apipaths';
import uploadImage from '../../Utils/uploadimage';
import { UserContext } from '../../Context/UserContext';
const Signup = ({setCurrentPage}) => {
  const [ProfilePic, setProfilePic]=useState(null);
  const [fullName,setfullname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate= useNavigate()
  const handleSignUp = async (e)=>{e.preventDefault()

   let profileimageURL ="";
   if(!fullName){
    seterror("enter correct full name");
    return;
   }
   if(!ValidateEmail(email)){
    seterror("enter the correct email address");
    return;
   }
   if(!password){
    seterror("enter the correct password");
    return;
   }
   seterror("");
   try{
    if(ProfilePic){
      const imgUploadRes  = await uploadImage(ProfilePic);
      profileimageURL = imgUploadRes.imageUrl || "";
    }
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
      name:fullName,
      email,
      password,
      profileimageURL,
    })
    const {token} = response.data;
    if(token){
      localStorage.setItem("token",token);
      updateUser(response.data);
      navigate("/dashboard")
    }
   }
    catch(error){
      if(error.response && error.response.data.message){
        seterror(error.response.data.message)
      }
      else{seterror("something went wrong")}
    }
  };
  return  <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className="text-lg font-semibold text-black">
        Create an Account
      </h3>
      <p className="text-xs text-slate-800 mt-[5px] mb-6">
        Join LearnBit today! Enter your details
      </p>
      
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={ProfilePic} setImage={setProfilePic}/>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input value={fullName} onChange={({target})=>setfullname(target.value)} label="Full Name"
          placeholder="Samant Kumar" type="text"/>
           <Input value={email} onChange={({target})=>setemail(target.value)} label="Email Address"
          placeholder="Samant@gmail.com" type="text"/>
           <Input value={password} onChange={({target})=>setpassword(target.value)} label="Password"
          placeholder="Min 8 chars" type="password"/>
        </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>SIGN UP</button>
        <p className='text-[13px] text-slate-800 mt-3'>Already have an  account?{" "}
          <button className='font-medium underline text-cyan-950 cursor-pointer' onClick={()=>{setCurrentPage('login')}}>Login</button>
        </p>
      </form>
    </div>
}
export default Signup;