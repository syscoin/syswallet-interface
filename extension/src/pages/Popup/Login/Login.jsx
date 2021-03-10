import React, { useState, useEffect } from "react";
import "./index.css";
import "../../../assets/css/tailwind.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/auth";
import Header from "../../../components/Header/Header";
import logo from "../../../assets/img/logo.svg";

const Login = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password) {
      await dispatch(loginUser({
        password,
      }));

      history.push("/dashboard");
    }

    return false;
  }

  return (
    <div>
      <Header authPage />

      <div className="text-center mt-12 p-2 pb-0 flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />
        <h1 className="font-bold text-gray-700 text-4xl mb-4">Welcome back :)</h1>

        <form className="w-full p-4 ml-2 mr-2" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="flex flex-col justify-center items-center w-full">

            <input
              value={password}
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full mt-6"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="mb-2 border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;