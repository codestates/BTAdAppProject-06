import BigNumber from "bignumber.js";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import "react-native-get-random-values";
import Web3 from "web3";
import Pay from "../artifacts/Pay.json";
import { User } from "../entities/User";
import { coinsApi } from "../utils/api";
import { useQuery } from "./RealmProvider";
import * as Notifications from "expo-notifications";

const web3 = new Web3("https://api.baobab.klaytn.net:8651");
const payContract = new web3.eth.Contract(Pay.abi, Pay.deployedAddress);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
        enableLights: true,
    }),
});

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
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [transaction, setTransection] = useState(null);

    const loadExchangeRate = useCallback(async () => {
        const data = await coinsApi.getKlayPriceKrw();
        setKlayToKrw(data["klay-token"]["krw"]);
    }, []);

    const loadTransaction = useCallback(async () => {
        console.log("call");

        if (!account) {
            return null;
        }
        const data = await coinsApi.getAdressTransaction(account);

        console.log(data);
        setTransection(data);
    }, [account]);
    useEffect(() => {
        const data = loadTransaction();
        console.log(data);
        setTransection(data);
    }, [loadTransaction]);

    async function noti(title, body) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title + ` 📬`,
                body: body,
                data: { data: "goes here" },
            },
            trigger: null,
        });
    }

    useEffect(() => {
        loadExchangeRate();
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, [loadExchangeRate]);

    const loadAccount = useCallback(
        (password) => {
            if (!password) {
                return;
            }
            const [user] = users;
            if (!user) {
                return;
            }
            const web3Account = web3.eth.accounts.decrypt(
                user.secureKey,
                password
            );
            const { address } = web3.eth.accounts.wallet.add(web3Account);
            setAccount(address);
            setNickName(user.nickName);
        },
        [users]
    );

    const loadBalance = useCallback(async () => {
        if (!account) {
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
            noti,
            transaction,
            loadTransaction,
        }),
        [account, balance, loadAccount, loadBalance]
    );

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
}
