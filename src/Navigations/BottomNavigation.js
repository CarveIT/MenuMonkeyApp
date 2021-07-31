import React from 'react';
import {
  StyleSheet,
  Image,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, CartStack, FavoriteStack, OrdersStack, AccountStack } from './StackNavigations';
import Color from '../Utilities/Color';

const searchIcon = require('../../assets/search.png')
const cartIcon = require('../../assets/cart.png')
const favoriteIcon = require('../../assets/heart.png')
const orderIcon = require('../../assets/orders.png')
const accountIcon = require('../../assets/account.png')

const Tab = createBottomTabNavigator();

const BottomNavigation = (props) => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={focused ? styles.activeLabel : styles.label}>{'Home'}</Text>
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image style={focused ? styles.activeImage : styles.image} source={searchIcon} />
              )
            }
          }} />
        <Tab.Screen
          name="CartTab"
          component={CartStack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={focused ? styles.activeLabel : styles.label}>{'Cart'}</Text>
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image style={focused ? styles.activeImage : styles.image} source={cartIcon} />
              )
            }
          }} />
        <Tab.Screen
          name="FavouritesTab"
          component={FavoriteStack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={focused ? styles.activeLabel : styles.label}>{'Favorites'}</Text>
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image style={focused ? styles.activeImage : styles.image} source={favoriteIcon} />
              )
            }
          }} />
        <Tab.Screen
          name="PastOrdersTab"
          component={OrdersStack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text numberOfLines={1} style={focused ? styles.activeLabel : styles.label}>{'Past Orders'}</Text>
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image style={focused ? styles.activeImage : styles.image} source={orderIcon} />
              )
            }
          }} />
        <Tab.Screen
          name="AccountTab"
          component={AccountStack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text style={focused ? styles.activeLabel : styles.label}>{'Account'}</Text>
              )
            },
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image style={focused ? styles.activeImage : styles.image} source={accountIcon} />
              )
            }
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    tintColor: Color.RED
  },
  activeImage: {
    width: 25,
    height: 25,
    tintColor: Color.GREEN
  },
  label: {
    color: Color.WHITE
  },
  activeLabel: {
    color: Color.GREEN
  }
});

export default BottomNavigation;
