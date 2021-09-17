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

const Payment = (props) => {
  const [orders, setOrders] = useState([])
  const [addPayment, setAddPayment] = useState(false)

  useEffect(() => {
    fetchOrders('past-orders')
  }, []);

  renderItem = ({ item }) => {
    return (
      <PaymentCell item={item} />
    );
  }

  const footerView = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={() => setAddPayment(true)}>
        <Text style={styles.addButtonTxt}>{'Add Payment Method'}</Text>
      </TouchableOpacity>
    )
  }

  const fetchOrders = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.past_orders) {
        setOrders(data.past_orders)
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
          title={"Payments"}
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
      {addPayment && <AddPaymentMethod callback={(data) => { setAddPayment(data) }} />}
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
    marginTop:10,
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
