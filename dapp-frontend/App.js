import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import Realm from "realm";
import * as SplashScreen from "expo-splash-screen";
import { DBContext } from "./context";
import Home from "./pages/Home";
import Password from "./pages/Password";
import { Text, View } from "react-native";
import Register from "./pages/Register";
import { HomeStackScreen, RegisterStackScreen } from "./Navigation";

import { decode, encode } from "base-64";
import { TableName } from "./utils/userInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScanQR from "./pages/ScanQR";
import Payment from "./pages/Payment";
import Web3 from "web3";
import Pay from "./utils/Pay.json";

/*
const Wrapper = styled.View`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`*/

const UserSchema = {
    name: TableName,
    properties: {
        _id: "int",
        nickName: "string",
        secureKey: "string",
        pwMD5: "string",
        address: "string",
    },
    primaryKey: "_id",
};

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    const [appIsReady, setAppIsReady] = useState();
    const [realm, setRealm] = useState(null);
    const [password, setPassword] = useState();
    const [won, setWon] = useState();
    const [pay, setPay] = useState({});

    let web3 = new Web3("https://api.baobab.klaytn.net:8651");
    //let contract = new web3.eth.Contract(Pay);
    //let web3 = new Web3("https://api.baobab.klaytn.net:8651");
    //console.log(Pay);
    let contract = new web3.eth.Contract(Pay.abi, Pay.deployedAddress);

    const changePassword = (pw) => {
        setPassword(pw);
    };
    const changeWonExchange = (krw) => {
        setWon(krw);
    };
    const changePay = (payDoc) => {
        setPay(payDoc);
    };

    async function prepare() {
        try {
            // 스키마 생성
            const ver = await Realm.schemaVersion("dappDB");
            const connection = await Realm.open({
                path: "dappDB",
                schema: [UserSchema],
                schemaVersion: ver,
            });
            // 테스트 용도 모든 db 테이블 삭제
            //connection.write(() => {
            //    connection.deleteAll();
            //connection.deleteModel("User");
            //});
            console.log(
                "realm empty?",
                connection.empty,
                "schema empty?",
                connection.objects(TableName).isEmpty()
            );
            //console.log("connecttion");
            //console.log(connection.objects("Users"));
            setRealm(connection);
        } catch (e) {
            console.error(e, "err?");
        } finally {
            setAppIsReady(true);
        }
    }

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && realm) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        prepare();
        return null;
    }
    return (
        <DBContext.Provider
            value={{
                realm,
                changePassword,
                password,
                changeWonExchange,
                won,
                changePay,
                pay,
                web3,
                contract,
            }}
        >
            <View
                onLayout={onLayoutRootView}
                style={{ width: "100%", height: "100%" }}
            >
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                presentation: "modal",
                            }}
                        >
                            {realm.objects(TableName).isEmpty() ? (
                                <Stack.Screen
                                    name="Register"
                                    component={RegisterStackScreen}
                                />
                            ) : password ? (
                                <>
                                    <Stack.Screen
                                        name="Main"
                                        component={HomeStackScreen}
                                    />
                                </>
                            ) : (
                                <Stack.Screen
                                    name="Password"
                                    component={Password}
                                />
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </QueryClientProvider>
            </View>
        </DBContext.Provider>
    );
}
