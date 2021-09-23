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
      <View style={{ backgroundColor: Color.BG_GRAY }}>
        <SubCatHeader
          title={I18n.t('Search') + " " + I18n.t('Result')}
          navigation={props.navigation}
          backbtnstyle={{ tintColor: Color.WHITE }}
          cartimgstyle={{ tintColor: Color.WHITE }}
          subTitlestyle={styles.title} ></SubCatHeader>
      </View>
      <ProfileInput
        inputview={styles.inputview}
        value={searchText}
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
  restaurantCell: {
    width: '80%',
    height: 60,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.WHITE
  }
});
export default SearchRestaurant;
