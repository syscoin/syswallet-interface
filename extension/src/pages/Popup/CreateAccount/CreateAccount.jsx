import React, { useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import "./index.css";
import "../../../assets/css/tailwind.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../../../store/auth";
import Header from "../../../components/Header/Header";

const CreateAccount = () => {
  const checkbox = document.querySelector("#agree");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && checkbox.checked) {
      await dispatch(signupUser({
        password,
      }));

      await dispatch(loginUser({
        password,
      }));

      history.push("/confirm-keyphrase");
    }

    return false;
  }

  return (
    <div>
      <Header authPage />

      <div className="text-center mt-16 p-2 pb-0 flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />

        <form className="w-full p-4 ml-2 mr-2" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="flex flex-col justify-center items-center w-full">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full mt-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Something like this */}
            {/* <input 
            name="passwordConfirmed"
            type="password"
            placeholder="Enter password again"
            validate={{ match: { value: 'password' } }}
            errorMessage="Password invalid, try it again!"
            className="border border-gray-300 p-4 rounded-full w-full mt-6"
            required
            /> */}

          </fieldset>

          <div className="mt-4 mr-32">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              required
            />

            <label
              htmlFor="agree"
              className="mb-4 font-bold text-gray-800 text-xs ml-2 cursor-pointer">
              I agree with the terms.
              </label>
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="mb-4 border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;