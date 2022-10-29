import BigNumber from 'bignumber.js';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import "react-native-get-random-values";
import Web3 from 'web3';
import Pay from "../artifacts/Pay.json";
import { User } from '../entities/User';
import { coinsApi } from '../utils/api';
import { useQuery } from './RealmProvider';


const web3 = new Web3("https://api.baobab.klaytn.net:8651");
const payContract = new web3.eth.Contract(Pay.abi, Pay.deployedAddress);

const WalletContext = createContext({
  web3: web3,
  payContract: payContract,
  account: null,
  balance: null,
  klayToKrw: null,
  loadAccount: (password) => {},
});

const WalletProvider = ({ children }) => {
  // null은 로딩 전 상태를 나타냄
  const [account, setAccount] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [balance, setBalance] = useState(null);
  const [klayToKrw, setKlayToKrw] = useState(null);
  const users = useQuery(User);
  
  const loadExchangeRate = useCallback(async () => {
    const data = await coinsApi.getKlayPriceKrw();
    setKlayToKrw(data['klay-token']['krw']);
  }, []);

  useEffect(() => {
    loadExchangeRate();
  }, [loadExchangeRate]);

  const loadAccount = useCallback((password) => {
    if(!password) {
      return;
    }
    const [user] = users;
    if (!user) {
      return;
    }
    const web3Account = web3.eth.accounts.decrypt(user.secureKey, password);
    const {address} = web3.eth.accounts.wallet.add(web3Account);
    setAccount(address);
    setNickName(user.nickName);
  }, [users]);

  const loadBalance = useCallback(async () => {
    if(!account) {
      return;
    }
    const b = await web3.eth.getBalance(account);
    setBalance(new BigNumber(b).dividedBy(1e18));
  }, [account]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const value = useMemo(
    () => ({
      web3,
      payContract,
      account,
      balance,
      nickName,
      klayToKrw,
      loadAccount,
      loadBalance,
    }),
    [account, balance, loadAccount, loadBalance],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;
