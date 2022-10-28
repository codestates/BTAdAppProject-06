import React, { useContext } from "react";
import Web3 from "web3";
import Pay from "./utils/Pay.json";

// provider
export const DBContext = React.createContext();
export const useDB = () => {
    return useContext(DBContext);
};

// web3
let web3 = new Web3("https://api.baobab.klaytn.net:8651");
let contract = new web3.eth.Contract(Pay);
export const web3Context = React.createContext({ web3, contract });
