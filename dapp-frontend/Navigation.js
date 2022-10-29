import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import ImportWallet from "./pages/ImportWallet";
import NewWallet from "./pages/NewWallet";
import CreatePayment from "./pages/CreatePayment";
import PayQR from "./pages/PayQR";
import Register from "./pages/Register";
import ScanQR from "./pages/ScanQR";
import MakePayment from "./pages/MakePayment";
import Password from "./pages/Password";
import { User } from "./entities/User";
import { useWallet } from "./providers/WalletProvider";
import { useQuery } from "./providers/RealmProvider";
import { useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Send from "./pages/Send";
import SendComplete from "./pages/SendComplete";

const RootStack = createNativeStackNavigator();
export function RootStackScreen() {
    const [user] = useQuery(User);
    const { account } = useWallet();

    const onLayoutRootView = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, []);

    return (
        <View
            onLayout={onLayoutRootView}
            style={{ width: "100%", height: "100%" }}
        >
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: false,
                        presentation: "modal",
                    }}
                >
                    {user ? (
                        <>
                            {account ? (
                                <RootStack.Screen
                                    name="Main"
                                    component={HomeStackScreen}
                                />
                            ) : (
                                <RootStack.Screen
                                    name="Password"
                                    component={Password}
                                />
                            )}
                        </>
                    ) : (
                        <RootStack.Screen
                            name="Register"
                            component={RegisterStackScreen}
                        />
                    )}
                </RootStack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const RegisterStack = createNativeStackNavigator();

export function RegisterStackScreen() {
    return (
        <RegisterStack.Navigator initialRouteName="Home">
            <RegisterStack.Screen name="RegisterHome" component={Register} />
            <RegisterStack.Screen
                name="RegisterImport"
                component={ImportWallet}
            />
            <RegisterStack.Screen name="RegisterNew" component={NewWallet} />
        </RegisterStack.Navigator>
    );
}

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Scan" component={ScanQR} />
            <HomeStack.Screen name="CreatePayment" component={CreatePayment} />
            <HomeStack.Screen name="MakePayment" component={MakePayment} />
            <HomeStack.Screen name="Send" component={Send} />
            <HomeStack.Group screenOptions={{ presentation: "modal" }}>
                <HomeStack.Screen name="QRModal" component={PayQR} />
                <HomeStack.Screen name="SendModal" component={SendComplete} />
                <HomeStack.Screen name="Histroy" component={History} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}
