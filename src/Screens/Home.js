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
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Color from '../Utilities/Color';
import { categories } from '../Data';
import CategoryCell from '../Components/CategoryCell';
import HomeHeader from '../Components/HomeHeader';
import ApiCalls from '../Services/ApiCalls';
import Constants from '../Utilities/Constants';
import PickupView from '../Components/PickupView';
import PickupDialogue from '../Components/PickupDialogue';

const Home = (props) => {
  const [date, setDate] = useState(moment().toDate());
  const [time, setTime] = useState();
  const [mode, setMode] = useState('date');
  const [menu, setMenu] = useState([])
  const [restaurant, setRestaurant] = useState(null)
  const [show, setShow] = useState(false);
  const [dineIn, setDineIn] = useState(true)
  const [showPickUp, setShowPickUp] = useState(true)

  useEffect(() => {
    setShowPickUp(true)
    fetchMenu('welcome/' + Constants.selectedRestaurant.id)
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const renderItem = ({ item }) => {
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
      <HomeHeader onbackpress={() => props.navigation.goBack()} title={restaurant && restaurant.name} subTitle={restaurant && restaurant.address} />
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
      {showPickUp && <PickupView
        callback={(data) => {
          setDineIn(data)
          setShowPickUp(false)
        }}
        onClose={(data) => {
          setShowPickUp(false)
        }} />}
      {!dineIn && <PickupDialogue
        date={date}
        callback={(data) => { setDineIn(data) }}
        callbackdatepicker={() => { showDatepicker() }}
        callbacktimepicker={() => showTimepicker()} />}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          minimumDate={moment().toDate()}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
