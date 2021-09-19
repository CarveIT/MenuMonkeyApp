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
const backImg = require('../../assets/left-arrow.png');
const checkedImgradio = require('../../assets/checkedradio.png');
const uncheckedImgradio = require('../../assets/uncheckradio.png');
const checkedImg = require('../../assets/checked.png');
const uncheckedImg = require('../../assets/un-checked.png');

const ItemDetail = (props) => {
  const [size, setSize] = useState(ItemSize.LARGE)
  const [free, setFree] = useState(false)
  const [count, setCount] = useState(1)

  const upinputvalue = () => {
    setCount(count + 1)
  }
  const downinputvalue = () => {
    setCount(count == 1 ? 1 : count - 1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.goBack()}>
        <Image style={styles.backimg} source={backImg} />
         <Text style={styles.header}>{props.route.params.detail.name}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroller}>
        {/* <Text style={styles.header}>{props.route.params.detail.name.toUpperCase()}</Text> */}
        {/* <Separator /> */}
        <View style={styles.row}>
          <Text style={styles.subHeading}>{'Select Size'}</Text>
          <View style={styles.requiredView}>
            <Text style={styles.requiredTxt}>{'Required'}</Text>
          </View>
        </View>
        <Separator />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => { setSize(ItemSize.LARGE) }}>
            <Image style={size == ItemSize.LARGE ? styles.checked : styles.unChecked} source={size == ItemSize.LARGE ? checkedImgradio : uncheckedImgradio} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Large'}</Text>
        </View>
        <Separator />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => { setSize(ItemSize.MEDIUM) }}>
            <Image style={size == ItemSize.MEDIUM ? styles.checked : styles.unChecked} source={size == ItemSize.MEDIUM ? checkedImgradio : uncheckedImgradio} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Medium'}</Text>
         
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
        <View style={styles.row}>
          <Text style={styles.subHeading}>{'Quantity'}</Text>
        </View>
        <View style={{ width: "100%", flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity style={styles.upvaluecontainer} onPress={downinputvalue}>
            <Text style={{ height: 20, width: 15, textAlign: 'center' }}>-</Text>
          </TouchableOpacity>

          <Text style={styles.txtcount}>{count}</Text>
          <TouchableOpacity style={styles.downvaluecontainer} onPress={upinputvalue}>
            <Text style={{ height: 20, width: 18, textAlign: 'center' }}>+</Text>
          </TouchableOpacity>
          <Text style={styles.mediumPrice}>{'$5.00'}</Text>
        </View>
        <Separator />
        <Text style={styles.instMsg}>{'Please note that special requests may result in price adjustments after your order is processed'}</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.LIGHTGRAY}
          placeholder={'(suace ect.)'}
        />
        <Separator customStyle={{marginTop:0}} />
        <TouchableOpacity style={styles.addCartBtn} onPress={() => props.navigation.navigate('CustomerFavorite')}>
          <Text style={styles.addCartTxt}>{'Add to Cart $60'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // marginHorizontal:20,
    justifyContent: 'space-between',
    backgroundColor: Color.WHITE
  },
  backBtn: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvaluecontainer: {
    height: 20,
    width: 15,
    backgroundColor: Color.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.GRAY,
    borderWidth: 1
  },
  downvaluecontainer: {
    height: 20,
    width: 18,
    backgroundColor: Color.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.GRAY,
    borderWidth: 1
  },
  txtcount: {
    height: 20,
    width: 60, marginHorizontal: 2,
    paddingLeft: 2, borderWidth: 1,
    borderRadius: 1,
    borderColor: Color.BLACK
  },
  backimg: {
    marginLeft: 10,
    height: 20,
    width: 20,
    tintColor: Color.BLACK
  },
  scroller: {
    flex: 1,
    marginHorizontal:20,
    alignItems: 'center'
  },
  header: {
    fontSize: 25,
    width: '80%',
    marginBottom:5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  subHeading: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  requiredView: {
    width: 80,
    height: 20,
    marginRight: 10,
    borderRadius: 15,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.BLUE
  },
  requiredTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Color.WHITE
  },
  unChecked: {
    width: 20,
    height: 20,
    tintColor: Color.BLACK
  },
  checked: {
    width: 20,
    height: 20,
    tintColor: Color.BLACK
  },
  sizeTxt: {
    fontSize: 15,
    marginStart: 5
  },
  mediumPrice: {
    fontSize: 15,
    marginLeft: 'auto'
  },
  instMsg: {
    marginTop: 5,
    lineHeight: 20
  },
  input: {
    width: '100%',
    fontSize: 16,
    color:Color.BLACK
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
  },
  spinner: {
    borderRadius: 5,
    minWidth: 50,
    minHeight: 50,
    color: 'green',
    alignSelf: 'flex-end',
    backgroundColor: Color.LIGHTGRAY
  }

});
export default ItemDetail;
