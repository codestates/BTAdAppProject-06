import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import CreatePayment from "./pages/createPayment";
import MakePayment from "./pages/makePayment";
import PaymentHistory from "./pages/paymentHistory";
import SendKlay from "./pages/sendKlay";
import ImportAccount from "./pages/ImportAccount";

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.homeScreen}>
            <Button title="계정가져오기" onPress={() => navigation.navigate('ImportAccount')}/>
            <Text></Text>
            <Button title="결제생성" onPress={() => navigation.navigate('CreatePayment')}/>
            <Text></Text>
            <Button title="결제하기" onPress={() => navigation.navigate('MakePayment')}/>
            <Text></Text>
            <Button title="결제내역" onPress={() => navigation.navigate('PaymentHistory')}/>
            <Text></Text>
            <Button title="송금하기" onPress={() => navigation.navigate('SendKlay')}/>
        </View>
    )
}
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="ImportAccount" component={ImportAccount}/>
                <Stack.Screen name="CreatePayment" component={CreatePayment}/>
                <Stack.Screen name="MakePayment" component={MakePayment}/>
                <Stack.Screen name="PaymentHistory" component={PaymentHistory}/>
                <Stack.Screen name="SendKlay" component={SendKlay}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
