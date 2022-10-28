import { registerRootComponent } from "expo";

import App from "./App";
import { decode, encode } from "base-64";
//import { Provider as PaperProvider } from "react-native-paper";
if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
window.atob = require("Base64").atob;
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
