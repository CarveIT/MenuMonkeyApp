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
  Alert,
  View,
  Image
} from 'react-native';

import Color from '../Utilities/Color';
import { favourites } from '../Data';
import SubCategoryCell from '../Components/SubCategoryCell';
import SubCatHeader from '../Components/SubCatHeader';
import ApiCalls from '../Services/ApiCalls';
import { TextInput } from 'react-native-gesture-handler';
import I18n from 'i18n-js';

const searchImg = require('../../assets/search.png')
const SubCategory = (props) => {

  const [dishes, setDishes] = useState([])
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    fetchFood('food/'+props.route.params.dishID)
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
        setMenu(data.menu)
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
      <SubCatHeader
        title={menu != null && menu.name.charAt(0).toUpperCase() + menu.name.slice(1)} // Capitalising
        {...props}
        navigation={props.navigation} />

      <View style={styles.searchcontainer}>
        <View style={styles.searchView}>
          <TextInput
            style={styles.input}
          
            placeholderTextColor='white'
            placeholder={I18n.t('Search by name')}
          />
          <Image style={styles.searchIcon} source={searchImg} />
        </View>
      </View>
      <FlatList
        data={dishes}
        style={styles.list}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
      // ListHeaderComponent={this.headerView}
      // // onEndReached={this.loadMore()}
      // ListFooterComponent={this.footerView}
      />
      <TouchableOpacity style={styles.addCartBtn} onPress={() => props.navigation.navigate('CartTab')}>
        <Text style={styles.addCartTxt}>{I18n.t('Continue')}</Text>
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
  },
  searchView: {
    flexDirection: 'row',
    flex: 7,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: Color.BG_BLUE
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    tintColor: Color.WHITE
  },
  searchView: {
    flexDirection: 'row',
    flex: 6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 5,
    marginLeft: 50, marginRight: 50,
    backgroundColor: Color.BLUE
  },
  searchcontainer: {
    backgroundColor: Color.BG_GRAY,
    flexDirection: 'row',
    height: 60
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    textAlign:'center',
    fontWeight: '500',
    color: Color.WHITE,
  }
});
export default SubCategory;
