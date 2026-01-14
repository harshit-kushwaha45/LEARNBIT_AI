import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosinstance";
import { API_PATHS } from "../Utils/apipaths";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setloading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.log("User not Authorized", error);
        clearUser();
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setloading(false);
  };
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
