import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NuevoPost';

const Tab= createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}  />
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: () => <AntDesign name="bars" size={24} color="black" />}}  />
        <Tab.Screen name="Post" component={NewPost} options={{headerShown: false, tabBarIcon: () => <AntDesign name="bars" size={24} color="black" />}}  />
    </Tab.Navigator>
  )
}
export default BottomTabs;