/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import Constants from '../Utilities/Constants';

const Cart = (props) => {

  useEffect(() => {
    var formData = new FormData();
    formData.append('restaurant', Constants.selectedRestaurant.id)
    formData.append('dish', '1,2')
    formData.append('quantity', '2,1')
    cartApi('cart')
  }, []);

  renderItem = ({ item }) => {
    return (
      <CartCell
        item={item}
        navigation={props.navigation} />
    );
  }

  const cartApi = (params, endPoint) => {
    setLoading(true)
    ApiCalls.postApiCall(params, endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      setLoading(false)
      if (data.results) {
      } else {
        Alert.alert('Error', data.error);
      }
    }, error => {
      Alert.alert('Error', error);
    })
  }

  // const total = () => {
  //   (cost * (tax/100)) + cost
  //   return
  // }

  const footerView = () => {
    return (
      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <TouchableOpacity style={styles.addMore} onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.addMoreTxt}>{'Add More Items'}</Text>
        </TouchableOpacity>
        <View style={styles.summaryView}>
          <Text style={styles.summaryTxt}>{'Summary'}</Text>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Cost'}</Text>
            <Text style={styles.costVal}>{cartData.reduce((n, { price }) => n + price, 0)}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Tax'}</Text>
            <Text style={styles.costVal}>{'20%'}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{'Total'}</Text>
            <Text style={styles.costVal}>{'$102'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continue} onPress={() => {
          Constants.user == null ? props.navigation.navigate('Login') : props.navigation.navigate('CheckOut')

        }}>
          <Text style={styles.continueTxt}>{'Continue'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <CartHeader
        title={'View Cart'}
        navigation={props.navigation}
      />
      <FlatList
        data={cartData}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        // ListHeaderComponent={this.headerView}
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
    width: 180,
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
    marginVertical: 8
  },
  costTxt: {
    fontSize: 18,
    fontWeight: '700'
  },
  costVal: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 'auto'
  },
  continue: {
    width: 180,
    height: 40,
    marginTop: 10,
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
