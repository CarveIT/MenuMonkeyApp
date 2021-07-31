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
  Button
} from 'react-native';

import Color from '../Utilities/Color';
import AccountCell from '../Components/AccountCell';
import { accountData } from '../Utilities/AccountData';
import AccountHeader from '../Components/AccountHeader';
import ChangePasswordDialogue from '../Components/ChangePasswordDialogue';
import { AccountTitle } from '../Utilities/Enums';

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
        return
      case AccountTitle.CHANGE_PASSWORD:
        setChangePassword(true)
        return
      case AccountTitle.LOG_IN:
        return
    }
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
        ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={this.footerView}
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
    backgroundColor: Color.WHITE
  },
});
export default Account;
