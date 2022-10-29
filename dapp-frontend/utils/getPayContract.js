import Pay from "../artifacts/Pay.json";

export default function getPayContract(web3) {
    return new web3.eth.Contract(Pay.abi, Pay.deployedAddress);
}