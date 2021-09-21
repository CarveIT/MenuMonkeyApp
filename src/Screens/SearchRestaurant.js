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
import RestaurantSearchCell from '../Components/RestaurantSearchCell';
import ApiCalls from '../Services/ApiCalls';
import SubCatHeader from '../Components/SubCatHeader';
import ProfileInput from '../Components/ProfileInput';
import I18n from "i18n-js";

const SearchRestaurant = (props) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites('favorite')
  }, []);

  renderItem = ({ item }) => {
    return (
      <RestaurantSearchCell
        item={item}
        navigation={props.navigation}
      />
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
      <View style={{ backgroundColor: Color.BG_GRAY }}>
        <SubCatHeader
          title={"Search Result"}
          navigation={props.navigation}
          backbtnstyle={{ tintColor: Color.WHITE }}
          cartimgstyle={{ tintColor: Color.WHITE }}
          subTitlestyle={styles.title} ></SubCatHeader>
      </View>
      <ProfileInput
        inputview={styles.inputview}
        input={styles.profileInput}
        placeholder={'Enter Address or location'}
      // onChangeText={(text) => setLocation(text)} 
      />
      <FlatList
        data={favorites}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
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
    marginTop: 10,
    backgroundColor: Color.BG_GRAY
  },
  title: {
    color: Color.WHITE,
    fontWeight: 'bold'
  },
  profileInput: {
    width: '100%',
    borderRadius: 3,
    color: Color.BLACK,
    textAlign: 'center'

  },
  inputview: {
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: Color.WHITE
  },
});
export default SearchRestaurant;
