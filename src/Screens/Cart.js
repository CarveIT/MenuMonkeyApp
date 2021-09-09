/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import Color from '../Utilities/Color';
import { cartData } from '../Data';
import CartCell from '../Components/CartCell';
import CartHeader from '../Components/CartHeader';

const Cart = (props) => {

  renderItem = ({ item }) => {
    return (
      <CartCell item={item} />
    );
  }

  const footerView = () => {
    return (
      <View>
        <TouchableOpacity style={styles.addMore}>
          <Text style={styles.addMoreTxt}>{'Add More Items'}</Text>
        </TouchableOpacity>
        <View style={styles.summaryView}>
          <Text style={styles.summaryTxt}>{'Summary'}</Text>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Cost'}</Text>
            <Text style={styles.costVal}>{'$100.00'}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Tax'}</Text>
            <Text style={styles.costVal}>{'$2'}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Total'}</Text>
            <Text style={styles.costVal}>{'$102'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continue}>
          <Text style={styles.continueTxt}>{'Continue'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <CartHeader title={'View Cart'} />
      <FlatList
        data={cartData}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.headerView}
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={footerView}
      />
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
  footer: {
    marginTop: 20
  },
  addMore: {
    width: 250,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.BLUE
  },
  addMoreTxt: {
    fontSize: 17,
    color: Color.WHITE
  },
  summaryView: {
    marginTop: 20,
    marginHorizontal: 10
  },
  summaryTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.RED
  },
  costView: {
    flexDirection: 'row',
    marginVertical: 20
  },
  costTxt:{
    fontSize: 18,
    fontWeight:'700'
  },
  costVal: {
    fontSize: 18,
    fontWeight:'700',
    marginLeft: 'auto'
  },
  continue: {
    width: 300,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.GREEN
  },
  continueTxt: {
    fontSize: 17,
    fontWeight: '700',
    color: Color.WHITE
  },
});
export default Cart;
