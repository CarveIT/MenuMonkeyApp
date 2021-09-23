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
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';

import Color from '../Utilities/Color';
import Separator from '../Components/Separator';
import { ItemSize } from '../Utilities/Enums';
import ApiCalls from '../Services/ApiCalls';
import I18n from 'i18n-js';

const backImg = require('../../assets/left-arrow.png');
const checkedImgradio = require('../../assets/checkedradio.png');
const uncheckedImgradio = require('../../assets/uncheckradio.png');
const checkedImg = require('../../assets/checked.png');
const uncheckedImg = require('../../assets/un-checked.png');

const ItemDetail = (props) => {
  const [details, setDetails] = useState(null)
  const [size, setSize] = useState(0)
  const [sides, setSides] = useState([])
  const [count, setCount] = useState(1)
  const [total, setTotal] = useState(+(props.route.params.detail.price))
  let price = +(props.route.params.detail.price)
  useEffect(() => {
    fetchDetails('upsell/' + props.route.params.detail.id)
  }, []);

  const upinputvalue = () => {
    setCount(prevCount => prevCount + 1)
    setTotal(total + price)
  }

  const downinputvalue = () => {
    setCount(prevCount => prevCount == 1 ? 1 : prevCount - 1)
    total > price && setTotal(total - price)
  }

  const fetchDetails = (endPoint) => {
    // setLoading(true)
    ApiCalls.getApiCall(endPoint).then(data => {
      console.log("DATA");
      console.log(data)
      // setLoading(false)
      if (data.dish) {
        setDetails(data)
      } else {
        Alert.alert('Error', data.error);
      }
    }, error => {
      Alert.alert('Error', error);
    })
  }

  const SizeList = () => {
    return (
      (details != null) && details.allsizes.map((obj, index) => {
        return (
          <View key={'container' + index} style={{ width: '100%' }}>
            <View key={'row' + index} style={styles.row}>
              <TouchableOpacity key={'button' + index} onPress={() => { setSize(index) }}>
                <Image key={'img' + index} style={styles.checked} source={index == size ? checkedImgradio : uncheckedImgradio} />
              </TouchableOpacity>
              <Text key={'text' + index} style={styles.sizeTxt}>{obj.name}</Text>
            </View>
            <Separator />
          </View>
        )
      })
    )
  }

  const appendSide = (index) => {
    let temp = [...sides]
    if (temp.indexOf(index) == -1) {
      temp.push(index)
    } else {
      temp = temp.filter(obj => obj != index)
    }
    setSides(temp)
  }

  const SideList = () => {
    return (
      (details != null) && details.dishItems.map((obj, index) => {
        return (
          <View key={'checkContainer' + index} style={{ width: '100%' }}>
            <View key={'checkRow' + index} style={styles.row}>
              <TouchableOpacity key={'checkBtn' + index} onPress={() => { appendSide(index) }}>
                <Image key={'checkImg' + index} style={styles.checked} source={sides.includes(index) ? checkedImg : uncheckedImg} />
              </TouchableOpacity>
              <Text key={'checkTxt' + index} style={styles.sizeTxt}>{obj.name}</Text>
            </View>
            <Separator />
          </View>
        )
      })
    )
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
          <Text style={styles.subHeading}>{I18n.t('Select') + " " + I18n.t('Size')}</Text>
          <View style={styles.requiredView}>
            <Text style={styles.requiredTxt}>{I18n.t('Required')}</Text>
          </View>
        </View>
        <Separator />
        <SizeList />
        <View style={styles.row}>
          <Text style={styles.subHeading}>{I18n.t('Select') + " " + I18n.t('Side')}</Text>
          <View style={styles.requiredView}>
            <Text style={styles.requiredTxt}>{I18n.t('Required')}</Text>
          </View>
        </View>
        <Separator />
        {/* <View style={styles.row}>
          <TouchableOpacity onPress={() => { setFree(!free) }}>
            <Image style={free ? styles.checked : styles.unChecked} source={free ? checkedImg : uncheckedImg} />
          </TouchableOpacity>
          <Text style={styles.sizeTxt}>{'Free'}</Text>
        </View>
        <Separator /> */}
        <SideList />

        <View style={styles.row}>
          <Text style={styles.subHeading}>{I18n.t('Quantity')}</Text>
        </View>
        <View style={{ width: "100%", flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity style={styles.upvaluecontainer} onPress={() => downinputvalue()}>
            <Text style={{ height: 20, width: 15, textAlign: 'center' }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.txtcount}>{count}</Text>
          <TouchableOpacity style={styles.downvaluecontainer} onPress={() => upinputvalue()}>
            <Text style={{ height: 20, width: 18, textAlign: 'center' }}>+</Text>
          </TouchableOpacity>
          <Text style={styles.mediumPrice}>{'$' + total}</Text>
        </View>
        <Separator />
        <View style={styles.row}>
          <Text style={styles.subHeading}>{I18n.t('Special Instructions')}</Text>
        </View>
        <Separator />
        <Text style={styles.instMsg}>{I18n.t('Please note that special requests may result in price adjustments after your order is processed')}</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.LIGHTGRAY}
          placeholder={'(suace ect.)'}
        />
        <Separator customStyle={{ marginTop: 0 }} />
        <TouchableOpacity style={styles.addCartBtn} onPress={() => props.navigation.navigate('CustomerFavorite', {total: total})}>
          <Text style={styles.addCartTxt}>{I18n.t('Add to Cart')}</Text>
          <Text style={styles.totalTxt}>{"$" + total}</Text>
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
    width: 60,
    marginHorizontal: 2,
    paddingLeft: 2,
    borderWidth: 1,
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
    // flex: 1,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  header: {
    fontSize: 25,
    width: '80%',
    marginBottom: 5,
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
    lineHeight: 20,
    alignSelf: 'flex-start',
    color: Color.BG_GRAY
  },
  input: {
    width: '100%',
    fontSize: 16,
    color: Color.BLACK
  },
  addCartBtn: {
    // position: 'absolute',
    marginTop: 20,
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
  totalTxt: {
    position: 'absolute',
    right: 30,
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
