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
import CustomerFavoriteCell from '../Components/CustomerFavoriteCell';
import AddPaymentMethod from '../Components/AddPaymentMethod';
import Constants from '../Utilities/Constants';

const CustomerFavorite = (props) => {
  const [orders, setOrders] = useState([])
  const [addPayment, setAddPayment] = useState(false)

  useEffect(() => {
    fetchOrders('addmore/'+Constants.selectedRestaurant.id)
  }, []);

  renderItem = ({ item }) => {
    return (
      <CustomerFavoriteCell
        item={item}
        navigation={props.navigation} />
    );
  }

  const footerView = () => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate('CartTab')}>
        <Text style={styles.addButtonTxt}>{'Continue'}</Text>
        <Text style={styles.buttonPrice}>{'$2'}</Text>
      </TouchableOpacity>
    )
  }

  const fetchOrders = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.favorites) {
        setOrders(data.favorites)
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
          title={"Add These To Your Order"}
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
    backgroundColor: Color.WHITE
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
export default CustomerFavorite;
