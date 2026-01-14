import React,{useState} from 'react'
import { useRef } from 'react';
import {LuUser,LuUpload, LuTrash} from "react-icons/lu";
const ProfilePhotoSelector = ({image,setImage,preview,setpreview}) => {
    const inputRef= useRef(null);
    const [previewUrl,setpreviewUrl]=useState(null);
    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if(file){
            setImage(file);
            const preview = URL.createObjectURL(file);
            setpreviewUrl(preview);
            if(setpreview){
                setpreview(preview)
            }
            
        }
    };
    const handleRemoveImage=()=>{
        setImage(null)
        setpreview(null);
        setpreviewUrl(null);
        if(setpreview){
            setpreview(null)
        }
    };
    const chooseFile = ()=>{
        inputRef.current.click();
    };
  return <div className='flex justify-center mb-6'>
    <input type='file'
    accept='image/*'
    name='image'
    ref={inputRef}
    className='hidden'
    onChange={handleImageChange}/>
    {
        !image?(<div className='w-20 h-20 flex items-center justify-center bg-cyan-50 rounded-full relative cursor-pointer'>
            <LuUser className='text-4xl text-cyan-500'/> 
        <button type='button' className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-cyan-600 to-cyan-50 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={chooseFile}>
        <LuUpload/></button></div>):(
            <div className='relative'>
            <img  src='preview || previewURL' alt='profile photo' 
            className='w-2- h-20 rounded-full object-cover'/>
            <button type='button' className='w-8 h-8 flex items-center justify-center bg-cyan-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer ' onClick={handleRemoveImage}>
                <LuTrash/></button>
            </div>
        )
    }
  </div>;
};

export default ProfilePhotoSelector;