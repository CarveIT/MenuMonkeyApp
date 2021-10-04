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
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

import Color from '../Utilities/Color';
import RestaurantSearchCell from '../Components/RestaurantSearchCell';
import ApiCalls from '../Services/ApiCalls';
import SubCatHeader from '../Components/SubCatHeader';
import ProfileInput from '../Components/ProfileInput';
import I18n from "i18n-js";
import Constants from '../Utilities/Constants';

const SearchRestaurant = (props) => {
  const [restaurants, setRestaurants] = useState([])
  const [searchRestaurants, setSearchRestaurants] = useState([])
  const [searchText, setSearchText] = useState('')
  const searchImg = require('../../assets/search.png')

  useEffect(() => {
    setRestaurants([Constants.selectedRestaurant])
  }, []);

  const renderItem = ({ item }) => {
    console.log("MY ITEM")
    console.log(item)
    return (
      <RestaurantSearchCell
        item={item}
        navigation={props.navigation}
      />
    );
  }

  const RestaurantList = () => {
    return (
      <View>
        {searchRestaurants.map((obj, index) => {
          return (
            <TouchableOpacity key={'rc' + index} style={styles.restaurantCell} onPress={() => onPressRestaurant(obj)}>
              <Text>{obj.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const onPressRestaurant = (restaurant) => {
    setSearchText('')
    setSearchRestaurants([])
    Constants.selectedRestaurant = restaurant
    setRestaurants([restaurant])
  }

  const getRestaurants = (params, endPoint) => {
    // setLoading(true)
    ApiCalls.postApiCall(params, endPoint).then(data => {
      console.log('GET-RESTAURANT')
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.restaurant) {
        setSearchRestaurants(data.restaurant)
      } else {
        Alert.alert('Error', data.message);
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
          title={I18n.t('Search') + " " + I18n.t('Result')}
          navigation={props.navigation}
          backbtnstyle={{ tintColor: Color.BLACK }}
          cartimgstyle={{ tintColor: Color.BLACK }}
          subTitlestyle={styles.title} ></SubCatHeader>
      </View>
      <View style={styles.searchcontainer}>
        <View style={styles.searchview}>
        {/* <View style={{flexShrink:1,backgroundColor:'red',flexDirection:'row'}}> */}
          <ProfileInput
            inputview={styles.inputview}
            value={searchText}
            placeholderTextColor={Color.WHITE}
            input={styles.profileInput}
            placeholder={I18n.t('Enter Address or location')}
            onChangeText={(text) => {
              console.log(text)
              setSearchText(text)
              if (text == '') {
                setRestaurants([Constants.selectedRestaurant])
                return
              }
              var formData = new FormData();
              formData.append('keyword', text)
              getRestaurants(formData, 'get-restaurants')

            }}
          />
          <Image style={styles.searchIcon} source={searchImg} />
        </View>
      </View>
      <RestaurantList />
      <FlatList
        data={restaurants}
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
    color: Color.RED,
    fontWeight: 'bold',
    fontSize: 20
  },
  profileInput: {
    width: '100%',
    color: Color.BLACK,
    backgroundColor: Color.BLUE,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  inputview: {
    width: '60%',
    // height: 50,
    // flexWrap:'wrap',
    marginTop: 0,
    paddingHorizontal: 0,
    marginLeft: 5,
    backgroundColor: Color.BLUE
  },
  restaurantCell: {
    width: '80%',
    height: 60,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.WHITE
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
    tintColor: Color.WHITE
  },
  searchview: {
    flexShrink:1,
    backgroundColor: Color.BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 3,
    marginBottom: 10
  },
  searchcontainer: {
    marginTop: 2,
    width: '100%',
    backgroundColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
export default SearchRestaurant;
