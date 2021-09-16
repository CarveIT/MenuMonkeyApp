import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, CartStack, FavoriteStack, OrdersStack, AccountStack } from './StackNavigations';
import Color from '../Utilities/Color';
import { useDispatch, useSelector } from 'react-redux';
import { is } from '@babel/types';


const searchIcon = require('../../assets/search.png')
const cartIcon = require('../../assets/cart.png')
const favoriteIcon = require('../../assets/heart.png')
const orderIcon = require('../../assets/orders.png')
const accountIcon = require('../../assets/account.png')

const Tab = createBottomTabNavigator();



const BottomNavigation = (props) => {
  const [islogin, setislogin] = useState(true)
  const cartcount = useSelector(state => state.cartcount)
  return (
    // <NavigationContainer>
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
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={searchIcon} />
              </View>
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
              <View style={focused ? styles.activecartbg : styles.iconcartbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={cartIcon} />
                <Text style={styles.cartqty} >{cartcount}</Text>
              </View>
            )
          }
        }}
      />
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
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={favoriteIcon} />
              </View>
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
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={orderIcon} />
              </View>
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
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={accountIcon} />
              </View>
            )
          }
        }} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    tintColor: Color.WHITE
  },
  activeImage: {
    width: 20,
    height: 20,
    tintColor: Color.WHITE
  },
  label: {
    color: Color.WHITE
  },
  activeLabel: {
    color: Color.GREEN
  },
  activeiconbg: {
    height: 30,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Color.GREEN
  },
  iconbg: {
    height: 30,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Color.RED
  },
  activecartbg: {
    height: 30,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Color.GREEN
  },
  iconcartbg: {
    height: 30,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Color.RED
  },
  cartqty: { color: Color.WHITE, fontStyle: 'italic', fontSize: 12, fontWeight: 'bold' }
});

export default BottomNavigation;
