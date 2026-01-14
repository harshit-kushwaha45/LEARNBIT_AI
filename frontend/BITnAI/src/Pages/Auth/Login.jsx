import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../Utils/helper";
import Input from "../../components/Input/Input";
import axiosInstance from "../../Utils/axiosinstance";
import { API_PATHS } from "../../Utils/apipaths";
import { UserContext } from "../../Context/UserContext";
const Login = ({ setCurrentPage }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) {
      seterror("please enter correct email .. ");
      return;
    }
    if (!password) {
      seterror("please enter correct password ..");
      return;
    }
    seterror("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("something went wrong");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-bold text-black">Welcome Back to LearnBit</h3>
      <p className="text-m font-semibold text-black">
        {" "}
        Please enter your details here --{" "}
      </p>
      <form onSubmit={HandleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setemail(target.value)}
          label="Email Address"
          placeholder="soman@gmail.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setpassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          LOGIN
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium text-cyan-700 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
