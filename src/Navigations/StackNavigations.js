import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import Favourites from '../Screens/Favourites';
import PastOrders from '../Screens/PastOrders';
import Account from '../Screens/Account';
import SubCategory from '../Screens/SubCategory';
import ItemDetail from '../Screens/ItemDetail';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Landing from '../Screens/Landing';
import CheckOut from '../Screens/CheckOut';
import BottomNavigation from './BottomNavigation';
import Payment from '../Screens/Payment';
import SearchRestaurant from '../Screens/SearchRestaurant';

const Stack = createStackNavigator();

export const LandingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={CheckOut} options={{ headerShown: false }} />
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchRestaurant" component={SearchRestaurant} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="SubCategory" component={SubCategory} options={{ headerShown: false }} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const CartStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const FavoriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorite" component={Favourites} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const OrdersStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Past Orders" component={PastOrders} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}