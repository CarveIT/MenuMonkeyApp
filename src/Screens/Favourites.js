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
  Alert,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import Color from '../Utilities/Color';
import { favourites } from '../Data';
import FavouriteCell from '../Components/FavouriteCell';
import HomeHeader from '../Components/HomeHeader';
import ApiCalls from '../Services/ApiCalls';
import SubCatHeader from '../Components/SubCatHeader';

const Favourites = (props) => {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites('favorite')
  }, []);

  renderItem = ({ item }) => {
    return (
      <FavouriteCell item={item} />
    );
  }

  const fetchFavorites = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.favorites) {
        setFavorites(data.favorites)
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
      <View style={{ backgroundColor: Color.BG_ORANGE }}>
        <SubCatHeader
          title={"Favourites"}
          backbtnstyle={{ tintColor: Color.WHITE }}
          cartimgstyle={{ tintColor: Color.WHITE }}
          subTitlestyle={styles.title} ></SubCatHeader>
      </View>
      <FlatList
        data={favorites}
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
    backgroundColor: Color.BG_ORANGE
  },
  list: {
    backgroundColor: Color.BG_ORANGE
  },
  title: { color: Color.WHITE, fontWeight: 'bold' }
});
export default Favourites;
