import React from "react";
import "./index.css";
import "../../../assets/css/tailwind.css";
import logo from "../../../assets/img/logo.svg";
import rightArrow from "../../../assets/icon/right-arrow.svg";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <Header />

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

        <Link
          to="/login"
          className="border-2 border-blue-300 bg-transparent rounded-full p-4 w-1/2 font-bold text-gray-600 text-center transition-all duration-300 hover:bg-blue-300">
          Login
        </Link>
      </div>

      <div className="p-4 flex items-center cursor-pointer">
        <img
          src={rightArrow}
          alt="restore account from seed phrase"
          className="h-2 w-2 mr-2"
        />
        <p className="font-bold text-gray-700 text-xs">
          Restore account from seed phrase.
      </p>
      </div>

    </div>
  );
};

export default Welcome;
