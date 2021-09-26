/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import Color from '../Utilities/Color';
import AccountCell from '../Components/AccountCell';
import { accountData } from '../Utilities/AccountData';
import AccountHeader from '../Components/AccountHeader';
import ChangePasswordDialogue from '../Components/ChangePasswordDialogue';
import { AccountTitle } from '../Utilities/Enums';
import Constants from '../Utilities/Constants';
import { saveObjectData, saveData } from '../Utilities/Storage';
import Keys from '../Utilities/Keys';
import I18n from 'i18n-js';

const logoutIcon = require('../../assets/login.png')

const Account = (props) => {
  const [changePassord, setChangePassword] = useState(false)

  renderItem = ({ item }) => {
    return (
      <AccountCell item={item} callback={(item) => itemTapped(item)} />
    );
  }

  itemTapped = (item) => {
    switch (item.title) {
      case AccountTitle.MY_ACCOUNT:
        return
      case AccountTitle.MY_FAVORITES:
        props.navigation.navigate('FavouritesTab')
        return
      case AccountTitle.PAST_ORDERS:
        props.navigation.navigate('PastOrdersTab')
        return
      case AccountTitle.BILL_PAYMENT:
        props.navigation.navigate('Payment')
        return
      case AccountTitle.CHANGE_PASSWORD:
        setChangePassword(true)
        return
      case AccountTitle.LOG_IN:
        props.navigation.navigate('Login')
        return
    }
  }

  const footerView = () => {
    return (
      <TouchableOpacity style={styles.logoutView} onPress={() => {
        saveData(Keys.ACCESS_TOKEN, null)
        saveObjectData(Keys.USER, null)
        Constants.user = null
        Constants.token = null
        props.navigation.replace('Landing')
      }}>
        <View style={styles.content}>
          <Image style={styles.menu} source={logoutIcon} resizeMode='contain' />
          <Text style={styles.title}>{I18n.t('Logout')}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <AccountHeader />
      <FlatList
        data={accountData}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.title}
        // ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={footerView}
      />
      {changePassord && <ChangePasswordDialogue callback={(data) => { setChangePassword(data) }} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE
  },
  list: {
    marginTop: 50,
    backgroundColor: Color.WHITE
  },
  logoutView: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    width: 25,
    height: 25,
    marginLeft: 10,
    tintColor: Color.BG_BLUE
  },
  title: {
    marginLeft: 20,
    fontSize: 18,
    color: Color.BG_BLUE
  },
});
export default Account;
