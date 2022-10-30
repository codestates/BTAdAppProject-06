import { registerRootComponent } from "expo";

//import { StyleSheet, Text, View, LogBox } from "react-native";
//LogBox.ignoreLogs(["Warning: ..."]);

import App from "./App";
//import { decode, encode } from "base-64";
//import { Provider as PaperProvider } from "react-native-paper";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
