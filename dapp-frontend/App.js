import React, { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { RootStackScreen } from "./Navigation";
import WalletProvider from "./providers/WalletProvider";
import RealmProvider from "./providers/RealmProvider";
import * as Notifications from "expo-notifications";
SplashScreen.preventAutoHideAsync();
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    return (
        <RealmProvider>
            <WalletProvider>
                <RootStackScreen />
            </WalletProvider>
        </RealmProvider>
    );
}
