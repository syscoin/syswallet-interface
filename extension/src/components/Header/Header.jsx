import React from "react";
import leftArrow from "../../assets/icon/left-arrow.svg";
import bg from "../../assets/img/bg.png";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <header className="flex justify-between items-center p-2 h-20 bg-blue-50">
        {props.authPage ? (
          <Link
            to="/"
            className="ml-2 font-bold text-4xl text-blue-400"
          >
            <img
              src={leftArrow}
              alt="back to home"
              className="w-4 h-4"
            />
          </Link>
        ) : (
          <img
            src={logo}
            className="w-16" alt="logo"
          />
        )}
        <select
          className="p-2 rounded-full w-1/2 bg-transparent border border-blue-200 font-bold text-gray-600">
          <option
            value="1"
          >
            Network
          </option>
        </select>

        {props.dashboardPage && (
          <img
            src={bg}
            alt="user"
            className="rounded-full h-11 w-11 border-2 border-pink-500 cursor-pointer"
          />
        )}
      </header>
    </div>
  )
}

export default Header;