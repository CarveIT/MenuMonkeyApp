/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';

import Color from '../Utilities/Color';
import Separator from '../Components/Separator';
import { ItemSize } from '../Utilities/Enums';
const backImg = require('../../assets/back.png');
const checkedImg = require('../../assets/checked.png');
const uncheckedImg = require('../../assets/un-checked.png');

const ItemDetail = (props) => {
  const [size, setSize] = useState(ItemSize.LARGE)
  const [free, setFree] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.goBack()}>
        <Image source={backImg} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroller}>
        <Text style={styles.header}>{props.route.params.detail.name.toUpperCase()}</Text>
        <Separator />
        <View style={styles.row}>
          <Text style={styles.subHeading}>{'Select Size'}</Text>
          <View style={styles.requiredView}>
            <Text style={styles.requiredTxt}>{'Required'}</Text>
          </View>
        </View>
        <Separator />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => { setSize(ItemSize.LARGE) }}>
            <Image style={size == ItemSize.LARGE ? styles.checked : styles.unChecked} source={ size == ItemSize.LARGE ? checkedImg : uncheckedImg} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Large'}</Text>
        </View>
        <Separator />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => { setSize(ItemSize.MEDIUM) }}>
            <Image style={size == ItemSize.MEDIUM ? styles.checked : styles.unChecked} source={size == ItemSize.MEDIUM ? checkedImg : uncheckedImg} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Medium'}</Text>
          <Text style={styles.mediumPrice}>{'$5.00'}</Text>
        </View>
        <Separator />
        <View style={styles.row}>
          <Text style={styles.subHeading}>{'Select Size'}</Text>
          <View style={styles.requiredView}>
            <Text style={styles.requiredTxt}>{'Required'}</Text>
          </View>
        </View>
        <Separator />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => { setFree(!free) }}>
            <Image style={free ? styles.checked : styles.unChecked} source={free ? checkedImg : uncheckedImg} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Free'}</Text>
        </View>
        <Separator />
        <View style={styles.row}>
          <Text style={styles.subHeading}>{'Special Instructions'}</Text>
        </View>
        <Separator />
        <Text style={styles.instMsg}>{'Please note that special requests may result in price adjustments after your order is processed'}</Text>
        <TextInput
          style={styles.input}
          placeholder={'Extra BBg suace ect.'}
        />
        <Separator />
        <TouchableOpacity style={styles.addCartBtn}>
          <Text style={styles.addCartTxt}>{'Add to Cart $60'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    // backgroundColor: Color.WHITE
  },
  backBtn: {
    marginLeft: 10
  },
  scroller: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  subHeading: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: 'bold'
  },
  requiredView: {
    width: 100,
    height: 30,
    borderRadius: 10,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.BLUE
  },
  requiredTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.WHITE
  },
  unChecked: {
    width: 25,
    height: 25,
    tintColor: Color.BLACK
  },
  checked: {
    width: 25,
    height: 25,
    tintColor: Color.BLUE
  },
  sizeTxt: {
    fontSize: 16
  },
  mediumPrice: {
    fontSize: 16,
    marginLeft: 'auto'
  },
  instMsg: {
    marginTop: 5,
    lineHeight: 20
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 16
  },
  addCartBtn: {
    position: 'absolute',
    bottom: 0,
    width: 300,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
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
export default ItemDetail;
