import React, { useState, useEffect } from 'react';
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsValid(password == confirmPassword);
  }, [
    password,
    confirmPassword
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid && checkbox.checked) {
      await dispatch(signupUser({
        password,
      }));

      await dispatch(loginUser({
        password,
      }));

      history.push("/confirm-keyphrase");
    }
  }

  return (
    <div>
      <Header authPage />

      <div className="text-center mt-8 p-2 pb-0 flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />

        <form className="w-full p-4 pt-0 ml-2 mr-2" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="flex flex-col justify-center items-center w-full">
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength="8"
              maxLength="16"
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-full w-full mt-2 outline-none focus:border-blue-300"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              name="passwordConfirmed"
              type="password"
              placeholder="Enter password again"
              minLength="8"
              maxLength="16"
              title="Your password must be between 8 and 16 characters"
              className={isValid ? "border border-gray-300 p-4 rounded-full w-full mt-2 outline-none focus:border-blue-300" : "border border-red-500 p-4 rounded-full w-full mt-2 outline-none"}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {isValid ? (
              <small
                className="text-gray-500 text-xs font-bold my-2"
              >
                Your password must be between 8 and 16 characters
              </small>
            ) : (
                <small
                  className="text-red-500 text-xs font-bold my-2"
                >
                  Passwords do not match, please retype
                </small>
              )}

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