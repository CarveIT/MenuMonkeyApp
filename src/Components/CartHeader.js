/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ImageBackground
} from 'react-native';

import Color from '../Utilities/Color';
const cartImg = require('../../assets/cart.png')
const backImg = require('../../assets/left-arrow.png')
const WIDTH = Dimensions.get('window').width;
const CartHeader = (props) => {
    const { title, subTitle, backbtnstyle } = props
    return (
        <View style={{ alignItems: 'center', backgroundColor: Color.WHITE}}>
            <View style={styles.container}>
                <View  style={styles.backBtnView}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image resizeMode='contain' style={[styles.backBtn, backbtnstyle]} source={backImg}></Image>
                </TouchableOpacity>
                </View>
                <View style={styles.titleview}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.cartView}>
                    <Image resizeMode='contain' style={styles.cartIcon} source={cartImg} />
                    <Text style={styles.counter}>{'2'}</Text>
                </View>
            </View>
            <View style={styles.separator}></View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
    
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight:'bold',
        color: Color.RED
    },
    titleview: {
        flex: 8,
        justifyContent: 'center',
    },
    cartView: {
        flex:1,
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:10
        // right: 20
    },
    cartIcon: {
        width: 25,
        height: 25,
    },
    counter: {
        fontSize: 18,
        fontWeight: '600'
    },
    backBtnView: {
        flex:1,
    },
    backBtn: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        tintColor: Color.BLACK
    },
    separator: {
        width: '100%',
        height: 1.5,
        backgroundColor: Color.BLACK
    },
});
export default CartHeader;
