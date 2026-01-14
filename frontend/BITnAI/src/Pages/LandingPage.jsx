import React, { useContext, useState } from "react";
import Hero from "../assets/Hero.png";
import { Features } from "../Utils/data";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import { UserContext } from "../Context/UserContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
const LandingPage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [openAuthModal, setopenAuthModal] = useState(false);
  const [currentpage, setCurrentPage] = useState("login");
  const handleCTA = () => {
    if (!user) {
      setopenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full bg-cyan-100 pb-30">
        <div className=" w-[500px] h-[500px]  bg-cyan-200/20 blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto  px-4 pt-6 pb-[200px] relative  z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="text-4xl text-cyan-600 font-bold">LEARNBIT-AI</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-linear-to-r from-[#8bcdf3] to-[#0265a7] text-sm font-semibold text-black px-4 py-2.5 rounded-full hover:bg-black hover:text-white  border-3 border-white transition-colors cursor-pointer"
                onClick={() => {
                  setopenAuthModal(true);
                }}
              >
                Login/SignUp{" "}
              </button>
            )}
          </header>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="text-4 text-gray-700  mr-0 md:mr-20 mb-6 ">
                Learning BIT with AI...
              </div>
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[15px] text-cyan-800 font-semibold bg-cyan-100 px-2 py-1 rounded-full border border-cyan-500">
                  AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-cyan-800 font-medium mb-6 leading-tight ">
                Chase your dream with
                <span className="text-transparent  bg-clip-text bg-[radial-gradient(circle,_#4446df_0%,_#22ece1_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  <br></br> AI-Powered{" "}
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-700  mr-0 md:mr-20 mb-6 ">
                Get tailored questions for your role and experience, organized
                for focused learning. Strengthen your fundamentals and explore
                advanced concepts with clarity. Build the confidence to tackle
                any interview, from first round to final offer. Start today and
                move one step closer to landing your dream job.
              </p>
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-cyan-500 hover:text-black border-2 border-cyan-800 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full relative z-10">
        <div>
          <section className=" flex items-center justify-center -mt-46">
            <img
              src={Hero}
              alt="hero img"
              className="[80vw] border-2 border-cyan-800 rounded-lg"
            ></img>
          </section>
        </div>
      </div>
      <div className="w-full min-h-full bg-cyan-100/50 mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h1 className="text-2xl font-medium text-center mb-12">
              Features that make LEARNBIT-AI a compulsary tool for you
            </h1>
            <div className="flex flex-col itens-center gap=8">
              <div className="grid grid-cols-1 mb-3 md:grid-cols-3 gap-8 w-full">
                {Features.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-cyan-200  p-3 rounded-xl shadow-xs hover:shadow-xl shadow-cyan-300/70 trasition border border-cyan-400"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-800">{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-3">
                {Features.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-cyan-200  p-3 rounded-xl shadow-xs hover:shadow-xl shadow-cyan-300/70 trasition border border-cyan-400"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-800">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className=" text-[18px] p-5 mt-5 bg-gray-100 text-secondary text-center">
          Build with ❤.....
          <br /> 💯 Made in India
        </div>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setopenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentpage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentpage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
