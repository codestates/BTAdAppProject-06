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
import Web3 from 'web3';
import Pay from "../artifacts/Pay.json";
import { useDB } from '../context';


const web3 = new Web3("https://api.baobab.klaytn.net:8651");
const payContract = new web3.eth.Contract(Pay.abi, Pay.deployedAddress);

const WalletContext = createContext({
  web3: web3,
  payContract: payContract,
  account: ``,
  balance: null,
});

const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(``);
  const [balance, setBalance] = useState(null);
  const { realm } = useDB();

  const loadAccount = useCallback(async () => {
    if (!realm) {
      return;
    }

    console.log('user', realm.objects('User'))

    const { address } = web3.eth.accounts.wallet[0];
    setAccount(address);

    const b = await web3.eth.getBalance(address);
    setBalance(new BigNumber(b).dividedBy(1e18));
  }, [realm]);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  const value = useMemo(
    () => ({
      web3,
      payContract,
      account,
      balance,
    }),
    [account, balance],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;
