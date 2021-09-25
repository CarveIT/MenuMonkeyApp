import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, CartStack, FavoriteStack, OrdersStack, AccountStack } from './StackNavigations';
import Color from '../Utilities/Color';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../Utilities/Constants';
import I18n from 'i18n-js';

const searchIcon = require('../../assets/home.png')
const cartIcon = require('../../assets/cart.png')
const favoriteIcon = require('../../assets/heart.png')
const orderIcon = require('../../assets/orders.png')
const accountIcon = require('../../assets/account.png')

const Tab = createBottomTabNavigator();

const BottomNavigation = (props) => {
  const cartcount = useSelector(state => state.cartcount)
  const [tab, setTab] = useState('')

  const LoginButton = () => {
    return (
      <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.loginLbl}>{I18n.t('Sign in')}</Text>
      </TouchableOpacity>
    )
  }

  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text style={focused ? styles.activeLabel : styles.label}>{I18n.t('Home')}</Text>
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
              <Text style={focused ? styles.activeLabel : styles.label}>{I18n.t('Cart')}</Text>
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
              (Constants.user == null && tab == 'Favorites') ?
                <LoginButton />
                :
                <Text style={focused ? styles.activeLabel : styles.label}>{I18n.t('Favorites')}</Text>
            )
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={favoriteIcon} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: e => {
            setTab('Favorites')
            console.log('USER')
            console.log(Constants.user)
            if (Constants.user == null) {
              Alert.alert('Error', 'Sign in to view your past restaurants')
              e.preventDefault()
            }
          },
        }}
      />
      <Tab.Screen
        name="PastOrdersTab"
        component={OrdersStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              (Constants.user == null && tab == 'Past Orders') ?
                <LoginButton />
                :
                <Text numberOfLines={1} style={focused ? styles.activeLabel : styles.label}>{I18n.t('Past Orders')}</Text>
            )
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={orderIcon} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: e => {
            setTab('Past Orders')
            if (Constants.user == null) {
              Alert.alert('Error', 'Sign in to cure your past orders')
              e.preventDefault()
            }
          },
        }} />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              (Constants.user == null && tab == 'Account') ?
                <LoginButton />
                :
                <Text style={focused ? styles.activeLabel : styles.label}>{I18n.t('Account')}</Text>
            )
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={focused ? styles.activeiconbg : styles.iconbg}>
                <Image style={focused ? styles.activeImage : styles.image} source={accountIcon} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: e => {
            setTab('Account')
            if (Constants.user == null) {
              Alert.alert('Error', 'Sign in to view your profile')
              e.preventDefault()
            }
          },
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
  cartqty: {
    color: Color.WHITE,
    fontStyle: 'italic',
    fontSize: 12,
    padding:2,
    fontWeight: 'bold'
  },
  loginButton: {
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: Color.GREEN
  },
  loginLbl: {
    color: Color.WHITE
  }
});

export default BottomNavigation;
