import React, { useState, useEffect } from "react";
import "./index.css";
import "../../../assets/css/tailwind.css";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../assets/img/logo.svg";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, loginUser } from "../../../store/auth";
import { updateLastLogin, userIsLogged } from "../../../store/application";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isError, errorMessage } = useSelector(selectUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password) {
      await dispatch(loginUser({
        password,
      }));

      await dispatch(updateLastLogin(Date.now()));
      await dispatch(userIsLogged(true));

      history.push("/dashboard");

      return;
    }

    return false;
  }

  const handleMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const handleBlur = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (isError) {
      handleMessage(errorMessage);
    }
  }, [
    isError,
  ]);

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

        <form className="w-full p-4 ml-2 mr-2" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col justify-center items-center w-full">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full mt-6"
              onBlur={handleBlur}
            />
          </fieldset>

          <ToastContainer />

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="flex justify-center items-center mb-2 border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300"
            >
              {isFetching ? (
                <Loading />
              ) : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;