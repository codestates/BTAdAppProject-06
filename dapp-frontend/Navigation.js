import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import ImportWallet from "./pages/ImportWallet";
import NewWallet from "./pages/NewWallet";
import Payment from "./pages/Payment";
import PayQR from "./pages/PayQR";
import Register from "./pages/Register";
import ScanQR from "./pages/ScanQR";
import MakePayment from "./pages/MakePayment";

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
            <HomeStack.Screen name="Pay" component={Payment} />
            <HomeStack.Screen name="MakePayment" component={MakePayment} />
            <HomeStack.Group screenOptions={{ presentation: "modal" }}>
                <HomeStack.Screen name="QRModal" component={PayQR} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}
