import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from "moment";
import {AnimatePresence,motion} from "framer-motion";
import { LuCircleAlert,LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import toast from 'react-hot-toast';
import Drawer from "../../components/Loader/Drawer";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './RoleInfoHeader'; 
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/apipaths'
import AIResponsePreview from './AIResponsePreview'
import QuestionCard from '../../components/Cards/QuestionCard';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
const LearnBit = () => {
  const {sessionId}= useParams();
  const [sessionData,setsessionData] = useState(null);
  const [errorMsg,seterrorMsg]= useState("");
  const [openLearnMoreDrawer,setOpenLearnMoreDrawer] = useState(false);
  const [explaination,setExplaination]= useState(null);
  const [isLoading,setIsLoading]= useState(false);
const [isUpdateLoader,setIsUpdateLoader] = useState(false);
const fetchSessionDetailsById = async()=>{
  try{
    const response = await axiosInstance.get(
      API_PATHS.SESSION.GET_ONE(sessionId)
    );
    if(response.data  && response.data.session){
      setsessionData(response.data.session)
    }
  }
catch(error){
  console.log("Error",error);
}
};
const generateConceptExplaination = async (question)=>{
  try{
    seterrorMsg("");
    setExplaination(null);
    setIsLoading(true);
    setOpenLearnMoreDrawer(true);
    const response = await axiosInstance.post(
      API_PATHS.AI.GENERATE_EXPLAINATION,{
        question,
      }
    );
    console.log(response)
    if(response.data){
      setExplaination(response.data);
    }
  }
  catch(error){
    setExplaination(null);
    seterrorMsg("Failed to generate explaination. Please try again");
    console.error("Error", error);

  }
  finally{
    setIsLoading(false);
  }
};

const toggleQuestionPinStatus = async (questionId)=>{
  try{
    const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
    if(response.data && response.data.question){
      fetchSessionDetailsById();
    }
  }
  catch(error){
    console.error("Error",error);
  }
};

const uploadMoreQuestions = async ()=>{
  try{
    setIsUpdateLoader(true);
    const airesponse  = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,
      {
        role:sessionData?.role,
        experience  : sessionData?.experience,
        topicsToFocus:sessionData?.topicsToFocus,
        numberOfQuestions:10
      }
    )
    const generatedQuestions= airesponse.data;
    const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
      sessionId,
      questions:generatedQuestions
    })
    if(response.data){
      toast.success("Added More QnA-")
      fetchSessionDetailsById();
    }
  }
  catch(error){
    if(error){
      if(error.response && error.response.data.message){
        seterrorMsg(error.response.data.message)
      }
      else{
        seterrorMsg("Something went wrong. try again later")
      }
    }
  }
  finally{
    setIsUpdateLoader(false)
  }
};

useEffect(()=>{
  if(sessionId){
    fetchSessionDetailsById();
  }
  return ()=>{};
},[])

  return (
    <DashboardLayout>
      <RoleInfoHeader
      role = {sessionData?.role|| ""}
      topicsToFocus = {sessionData?.topicsToFocus|| ""}
      questions = {sessionData?.questions?.length || "-"}
      experience = {sessionData?.experience || "-"}
      description = {sessionData?.description || ""}
      lastUpdated = {
        sessionData?.updatedAt
        ? moment(sessionData.updatedAt).format("DD MM YYYY") 
        : ""
      } 
    />
    <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
      <h2 className='text-lg font-semibold color-black'>
        Interview Qn As
      </h2>
      <div className='grid grid-cols-12 gap-4 mt-5 mb-3'>
      <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7 " : "md:col-span-8"}`}>
        <AnimatePresence>
          {sessionData?.questions?.map((data,index)=>{
            return (
              <motion.div key={data._id || index}
              initial = {{opacity:0, y:-20}}
              animate = {{opacity:1,y:0}}
              exit={{opacity:0,scale:0.95}}
              transition ={{
                duration:0.4,
                type:"spring",
                stiffness:100,
                delay : index*0.1,
                damping:15,
              }}
              layout layoutId={`question-${data._id || index}`}>
                <>
                <QuestionCard
                  question={data?.question}
                  answer ={data?.answer}
                  onLearnMore={()=>{generateConceptExplaination(data.question)}}
                  isPinned={data?.isPinned}
                  onTogglePin = {()=>{toggleQuestionPinStatus(data?._id)}}
                  />
                </>
                {!isLoading && 
                sessionData?.questions?.length==index+1 && (
                  <div className='flex items-center justify-center mt-5'>
                    <button className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5  mr-2 py-2 rounded text-nowrap cursor-pointer'
                     disabled ={isLoading || isUpdateLoader} onClick={uploadMoreQuestions}>
                      {isUpdateLoader? (<SpinnerLoader/>): (<LuListCollapse className='text-lg'/>)}{" "}Load More
                    </button>
                    </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      </div>
      <div>
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={isLoading ? "Generating explanation..." : explaination?.title || "Explanation"}
        >
         
          {errorMsg && (
            <p className="flex gap-2 text-sm text-cyan-500 font-medium">
              <LuCircleAlert className='mt-1'/>{errorMsg}
            </p>
         )}
         {isLoading && <SkeletonLoader/>}
          {!isLoading && explaination && (
            <AIResponsePreview content={explaination?.explanation} />
          )}
        </Drawer>
      </div>
      </div>
    </DashboardLayout>
  )
}

export default LearnBit;