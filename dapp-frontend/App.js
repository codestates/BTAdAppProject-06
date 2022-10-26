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
import RegisterStackScreen from "./Navigation";

/*
const Wrapper = styled.View`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`*/

const UserInfoSchema = {
    name: "user",
    properties: {
        _id: "int",
        secureKey: "string",
    },
    primaryKey: "_id",
};

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
    const [appIsReady, setAppIsReady] = useState();
    const [realm, setRealm] = useState(null);
    const [password, setPassword] = useState();

    const changePassword = (pw) => {
        setPassword(pw);
    };

    useEffect(() => {
        async function prepare() {
            try {
                const connection = await Realm.open({
                    path: "dappDB",
                    schema: [UserInfoSchema],
                });
                setRealm(realm);
                if (password === "") {
                    navigation;
                }
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            console.log(realm, "realm");
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    return (
        <DBContext.Provider value={{ realm, changePassword, password }}>
            <View
                onLayout={onLayoutRootView}
                style={{ width: "100%", height: "100%" }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            presentation: "modal",
                        }}
                    >
                        {!realm ? (
                            <Stack.Screen
                                name="Register"
                                component={RegisterStackScreen}
                            />
                        ) : password ? (
                            <>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="User" component={Home} />
                            </>
                        ) : (
                            <Stack.Screen
                                name="Password"
                                component={Password}
                            />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </DBContext.Provider>
    );
}
