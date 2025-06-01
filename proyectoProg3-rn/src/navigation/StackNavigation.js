import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottonTabs";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

function StackNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Register'
                component={Register}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Home'
                component={BottomTabs}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default StackNavigation;