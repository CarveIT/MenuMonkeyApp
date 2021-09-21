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
import { useIsFocused } from "@react-navigation/native";

import Color from '../Utilities/Color';
import { favourites } from '../Data';
import FavouriteCell from '../Components/FavouriteCell';
import HomeHeader from '../Components/HomeHeader';
import ApiCalls from '../Services/ApiCalls';
import SubCatHeader from '../Components/SubCatHeader';

const Favourites = (props) => {
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites('favorite')
  }, [isFocused]);

  renderItem = ({ item }) => {
    return (
      <FavouriteCell
        item={item}
        onDelete={(data) => {
          let tmp = [...favorites]
          tmp = tmp.filter(obj => obj.id != data)
          setFavorites(tmp)
        }}
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
      <View style={{ backgroundColor: Color.BG_ORANGE }}>
        <SubCatHeader
          title={"Favourites"}
          navigation={props.navigation}
          backbtnstyle={{ tintColor: Color.WHITE }}
          cartimgstyle={{ tintColor: Color.WHITE }}
          subTitlestyle={styles.title} ></SubCatHeader>
      </View>
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
    backgroundColor: Color.BG_ORANGE
  },
  list: {
    backgroundColor: Color.BG_ORANGE
  },
  title: { color: Color.WHITE, fontWeight: 'bold' }
});
export default Favourites;
