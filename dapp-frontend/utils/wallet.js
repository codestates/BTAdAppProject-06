// Import the crypto getRandomValues shim (**BEFORE** the shims)
//import "react-native-get-random-values";

// Import the the ethers shims (**BEFORE** ethers)
//import "@ethersproject/shims";

// Import the ethers library
//import { BigNumber, ethers } from "ethers";

import CryptoJS from "crypto-js";
//import { encrypt } from "react-native-aes-crypto";

// 사용자의 프라이빗 키를 를 패스워르를 사용하여 aes256 암호화
export const aes256Encrypt = async (privatekey, password) => {
    return CryptoJS.AES.encrypt(privatekey, password).toString();
};

// 패스워드로 저장된 프라이빗 키를 복호화하기 위해서 사용
export const aes256Decrypt = async (encrypted, password) => {
    return CryptoJS.AES.decrypt(encrypted, password).toString(
        CryptoJS.enc.Utf8
    );
};

// 입력 패스워드가 저장한 패스워드와 비교하기 위해서 md5 사용
export const md5Encrypt = async (password) => {
    return CryptoJS.MD5(password).toString();
};

export const ojbToString = (obj) => {
    return JSON.stringify(obj);
};
