import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImportWallet from "./pages/ImportWallet";
import NewWallet from "./pages/NewWallet";
import Register from "./pages/Register";

const RegisterStack = createNativeStackNavigator();

export default function RegisterStackScreen() {
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
