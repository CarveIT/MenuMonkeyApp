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
import PastOrderDetailCell from '../Components/PastOrderDetailCell';
import I18n from 'i18n-js';

const PastOrderDetail = (props) => {
  const [orderDetail, setOrderDetail] = useState([])
  const [addPayment, setAddPayment] = useState(false)

  useEffect(() => {
    fetchOrders('past-order-detail/'+props.route.params.pastOrderID)
  }, []);

  renderItem = ({ item }) => {
    return (
      <PastOrderDetailCell item={item} />
    );
  }

  const fetchOrders = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.past_order_detail) {
        setOrderDetail(data.past_order_detail)
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
          title={I18n.t("Past Order Detail")}
          cartimgstyle={{ tintColor: Color.BLACK }}
          navigation={props.navigation} />
      </View>
      <FlatList
        data={orderDetail}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
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
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: Color.WHITE
  },
  title: {
    fontSize: 20,
    color: Color.BLACK,
    fontWeight: 'bold'
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Color.GREEN,
    flex: 1,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  addButtonTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.WHITE
  },
  buttonPrice: {
    position: 'absolute',
    right: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.WHITE
  }
});
export default PastOrderDetail;
