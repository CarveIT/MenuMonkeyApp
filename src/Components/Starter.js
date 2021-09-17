/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import BottomNavigation from '../Navigations/BottomNavigation';
import Landing from '../Screens/Landing';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import { LandingStack } from '../Navigations/StackNavigations';
import { NavigationContainer } from '@react-navigation/native';
const Starter = () => {
    return (
        // <BottomNavigation/>
        // <Landing/>
        // <Login/>
        // <Register/>
        <NavigationContainer>
            <LandingStack />
        </NavigationContainer>

    );
};
export default Starter;
