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
  StatusBar,
  StyleSheet,
  FlatList,
  Alert,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Color from '../Utilities/Color';
import PastOrderCell from '../Components/PastOrderCell';
import ApiCalls from '../Services/ApiCalls';
import { pastOrders } from '../Data';
import SubCatHeader from '../Components/SubCatHeader';
import PaymentCell from '../Components/PaymentCell';
import color from '../Utilities/Color';
import AddPaymentMethod from '../Components/AddPaymentMethod';
import I18n from 'i18n-js';

const Payment = (props) => {
  const [orders, setOrders] = useState([])
  const [addPayment, setAddPayment] = useState(false)

  useEffect(() => {
    fetchCards('bill')
  }, []);

  renderItem = ({ item }) => {
    return (
      <PaymentCell item={item} />
    );
  }

  const footerView = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={() => setAddPayment(true)}>
        <Text style={styles.addButtonTxt}>{I18n.t('Add Payment Method')}</Text>
      </TouchableOpacity>
    )
  }

  const fetchCards = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.card) {
        setOrders(data.card)
      } else {
        Alert.alert('Error', data.error);
      }
    }, error => {
      Alert.alert('Error', error);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: Color.WHITE }}>
        <SubCatHeader
          subTitlestyle={styles.title}
          title={I18n.t("Payments")}
          cartimgstyle={{ tintColor: Color.BLACK }}
          hideCart={true}
          navigation={props.navigation} />
      </View>
      <FlatList
        data={orders}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        // ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={footerView}
      />
      {addPayment &&
        <AddPaymentMethod
          previousScreen={'Payment'}
          callback={(data) => { setAddPayment(data) }}
        />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG_GRAY
  },
  list: {
    // position: 'absolute',
    // top: 40,
    marginTop: 10,
    width: '78%',
    alignSelf: 'center',
    backgroundColor: Color.BG_GRAY
  },
  title: {
    color: Color.BLACK,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: Color.GREEN,
    flex: 1,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  addButtonTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.WHITE
  }
});
export default Payment;
