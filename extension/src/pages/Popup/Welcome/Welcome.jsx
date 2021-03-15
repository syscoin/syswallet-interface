import React from "react";
import "./index.css";
import "../../../assets/css/tailwind.css";
import logo from "../../../assets/img/logo.svg";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      {/* TODO: NO need for header this is the landing page only for the first time user logs in */}
      {/* <Header /> */}

      <div className="text-center mt-16 mb-4 p-2 flex flex-col justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
        />
        <h1 className="font-bold text-gray-700 text-4xl">Welcome :)</h1>
        <p className="mt-2 font-light text-gray-400 text-sm">The decentralized web awaits</p>
      </div>

      <div className="flex justify-center items-center px-8 py-4 gap-4 mb-8">
        <Link
          to="/create-account"
          className="border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
          Create account
        </Link>

        {/* TODO: The below link needs to redirect to a new page called Import from seed phrase*/}

        <Link
          to="/login"
          className="border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
          Login
        </Link>
      </div>


    </div>
  );
};

export default Welcome;
