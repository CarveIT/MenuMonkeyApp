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
  Alert
} from 'react-native';

import Color from '../Utilities/Color';
import PastOrderCell from '../Components/PastOrderCell';
import ApiCalls from '../Services/ApiCalls';
import { pastOrders } from '../Data';

const PastOrders = (props) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders('past-orders')
  }, []);

  renderItem = ({ item }) => {
    return (
      <PastOrderCell item={item} />
    );
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
      <FlatList
        data={orders}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={this.footerView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG_GRAY
  },
  list: {
    backgroundColor: Color.BG_GRAY
  }
});
export default PastOrders;
