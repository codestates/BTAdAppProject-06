import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { RootStackScreen } from "./Navigation";
import WalletProvider from "./providers/WalletProvider";
import RealmProvider from "./providers/RealmProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {

    return (
        <RealmProvider>
            <WalletProvider>
                <RootStackScreen />
            </WalletProvider>
        </RealmProvider>
    );
}
