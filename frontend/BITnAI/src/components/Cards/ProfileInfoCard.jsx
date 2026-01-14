import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return ( user && (
    <div className="flex items-center">
      <img
        src={user.profileImageUrl}
        alt=""
        className="w-11 h-11 bg-bray-500 rounded-full mr-3"
      />
      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || ""}
        </div>
        <button
          className="text-cyan-700 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  ));
};

export default ProfileInfoCard;
