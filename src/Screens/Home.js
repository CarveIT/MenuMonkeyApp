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
  useColorScheme,
  Alert,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Color from '../Utilities/Color';
import { categories } from '../Data';
import CategoryCell from '../Components/CategoryCell';
import HomeHeader from '../Components/HomeHeader';
import ApiCalls from '../Services/ApiCalls';
import Constants from '../Utilities/Constants';

const Home = (props) => {

  const [menu, setMenu] = useState([])
  const [restaurant, setRestaurant] = useState(null)


  useEffect(() => {
    fetchMenu('welcome/'+Constants.selectedRestaurant.id)
  }, []);

  renderItem = ({ item }) => {
    return (
      <CategoryCell item={item} {...props} />
    );
  }

  const fetchMenu = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.menus) {
        setMenu(data.menus)
        setRestaurant(data.restaurant)
        Constants.selectedRestaurant = data.restaurant
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
      <HomeHeader onbackpress={()=>props.navigation.goBack()} title={restaurant && restaurant.name} subTitle={restaurant && restaurant.address} />
      <FlatList
        data={menu}
        style={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // ListHeaderComponent={this.headerView}
        // onEndReached={this.loadMore()}
        // ListFooterComponent={this.footerView}
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
    backgroundColor: Color.BG_BLUE
  }
});

const mapStateToProps = (state) => {
  return {
    'myName': state.name
  }
}

export default connect(mapStateToProps)(Home);
