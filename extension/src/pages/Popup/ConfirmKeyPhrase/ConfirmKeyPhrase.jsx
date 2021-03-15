import React, { useState } from 'react';
import "./index.css";
import "../../../assets/css/tailwind.css";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header/Header";
import phrase from "../../../data/phrase";
import { useDispatch } from 'react-redux';

const ConfirmKeyPhrase = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // TODO get keyprashe from wallet state mnemonic 
  const RenderPhrase = () => {
    return phrase.map((word, index) => {
      return (
        <div
          className="p-2 rounded bg-gray-100 border border-gray-200 w-1/4"
          key={index}
        >
          <p className="text-gray-500 font-bold">{index}</p>
          <p className="text-gray-600">{word}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <Header />

      <h1 className="text-2xl text-center mt-4 font-bold text-gray-700">Backup your wallet</h1>
      <p className="text-center mt-2 text-gray-500 font-light px-8">The seed phrase is the only way to restore your wallet. Write it down, verify it and then store it securely.</p>

      <div className="flex flex-wrap gap-4 justify-center items-center p-4 mt-2">
        <RenderPhrase />

        <button
          onClick={() => history.push("/dashboard")}
          className="w-full p-2 mt-4 mx-8 rounded-full text-center border border-blue-400 cursor-pointer transition-all duration-300 hover:bg-blue-400 text-gray-800 font-bold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmKeyPhrase;