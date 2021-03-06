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
  , Alert
} from 'react-native';

import Color from '../Utilities/Color';
import { cartData } from '../Data';
import CartCell from '../Components/CartCell';
import CartHeader from '../Components/CartHeader';
import Constants from '../Utilities/Constants';
import ApiCalls from '../Services/ApiCalls';
import I18n from 'i18n-js';

const Cart = (props) => {
  const [loading, setLoading] = useState(false)
  const [cartData, setcartData] = useState([])
  const [maindata, setmaindata] = useState({})
  const [cartInfo, setCartInfo] = useState(null)
  // let cartInfo = null

  useEffect(() => {
    prepareData()
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CartCell
        item={item}
        navigation={props.navigation} />
    );
  }

  const prepareData = () => {
    if (Constants.cart == null) {
      return
    }
    let restaurantID = Constants.selectedRestaurant.id
    let currentRestaurantItems = Constants.cart.filter(obj => obj.restaurant == restaurantID)
    let dish = []
    let quantity = []
    for (let i = 0; i < currentRestaurantItems.length; i++) {
      if (dish.includes(currentRestaurantItems[i].dishID)) {

      } else {
        dish.push(currentRestaurantItems[i].dishID)
        // let sum = currentRestaurantItems.reduce((n, { dishID, quantity }) => n + quantity, 0)
        let sum = 0
        currentRestaurantItems.map((obj, index) => {
          if (obj.dishID == currentRestaurantItems[i].dishID) {
            sum = sum + obj.quantity
          }
        })
        quantity.push(sum)
      }
    }
    // dish = dish.join(',')
    console.log({ dish, quantity })

    var formData = new FormData();
    formData.append('restaurant', Constants.selectedRestaurant.id)
    formData.append('dish', dish.join(','))
    formData.append('quantity', quantity.join(','))
    cartApi(formData, 'cart')
  }

  const cartApi = (params, endPoint) => {
    console.log({ endPoint })
    setLoading(true)
    ApiCalls.postApiCall(params, endPoint).then(data => {

      console.log({ data })

      setLoading(false)
      if (data.results) {
        setmaindata(data)
        setcartData(data.results)
        setCartInfo(data)
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
    console.log({ maindata })
    return (

      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <TouchableOpacity style={styles.addMore} onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.addMoreTxt}>{I18n.t('Add More Items')}</Text>
        </TouchableOpacity>
        <View style={styles.summaryView}>
          <Text style={styles.summaryTxt}>{I18n.t('Summary')}</Text>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{I18n.t('Cost')}</Text>

            <Text style={styles.costVal}>{maindata.subtotal}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{I18n.t('Tax')}</Text>
            <Text style={styles.costVal}>{maindata.tax}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costTxt}>{I18n.t('Total')}</Text>
            <Text style={styles.costVal}>{'$' + maindata.total}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continue} onPress={() => {
          Constants.user == null ? props.navigation.navigate('Login', { cartDetails: cartInfo, previousScreen: 'Cart' }) : props.navigation.navigate('CheckOut', { cartDetails: cartInfo })
        }}>
          <Text style={styles.continueTxt}>{I18n.t('Continue')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <CartHeader
        title={I18n.t('View Cart')}
        navigation={props.navigation}
      />
      <FlatList
        data={cartData}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.dish.id}
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
    // width: 210,
    height: 40,
    padding:10,
    borderRadius: 20,
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
