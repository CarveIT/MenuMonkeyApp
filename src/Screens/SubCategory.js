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
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';

import Color from '../Utilities/Color';
import { favourites } from '../Data';
import SubCategoryCell from '../Components/SubCategoryCell';
import SubCatHeader from '../Components/SubCatHeader';
import ApiCalls from '../Services/ApiCalls';

const SubCategory = (props) => {

  const [dishes, setDishes] = useState([])

  useEffect(() => {
    fetchFood('food/1')
  }, []);

  renderItem = ({ item }) => {
    return (
      <SubCategoryCell item={item} {...props} />
    );
  }

  const fetchFood = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.dishes) {
        setDishes(data.dishes)
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
      <SubCatHeader title={'Search'} {...props} />
      <FlatList
        data={dishes}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        ListFooterComponent={this.footerView}
      />
      <TouchableOpacity style={styles.addCartBtn}>
        <Text style={styles.addCartTxt}>{'Add to Cart $60'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE
  },
  list: {
    backgroundColor: Color.BG_GRAY
  },
  addCartBtn: {
    position: 'absolute',
    bottom: 30,
    width: 300,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.GREEN
  },
  addCartTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.WHITE
  }
});
export default SubCategory;
