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
    TextInput,
    ImageBackground
} from 'react-native';

import Color from '../Utilities/Color';
const cartImg = require('../../assets/cart.png')
const backImg = require('../../assets/left-arrow.png')
const searchImg = require('../../assets/search.png')

const SubCatHeader = (props) => {
    const { title, backbtnstyle, subTitlestyle,cartimgstyle } = props
    return (
        <View style={styles.main}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.backBtnView} onPress={() => props.navigation.goBack()}>
                    <Image resizeMode='contain' style={[styles.backBtn , backbtnstyle]} source={backImg}></Image>
                </TouchableOpacity>

                <View style={styles.titleView}>
                    <Text style={[styles.subTitle,subTitlestyle]}>{title}</Text>
                </View>
                <View style={styles.cartView}>
                    <Image resizeMode='contain' style={[styles.cartIcon,cartimgstyle]} source={cartImg} />
                    <Text style={styles.counter}>{'2'}</Text>
                </View>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    main: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        height: 50,

        alignItems: 'center',
        justifyContent: 'center',

    },
    backBtnView: {
        flex: 1,
        justifyContent: 'center',
        marginStart: 10,
    },
    backBtn: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        tintColor: Color.BLACK
    },
    titleView: {
        flexDirection: 'row',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        flex: 1,
        height: 60,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: Color.WHITE,
    },
    searchIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        tintColor: Color.WHITE
    },
    title: {
        width: '100%',
        fontSize: 30,
        fontWeight: '700',
        fontWeight:'bold',
        color: Color.RED
    },
    cartView: {
        flex: 1,
        marginRight: 15,
        alignSelf: 'center',
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        // right: 20
    },
    cartIcon: {
        width: 25,
        height: 25,
        tintColor: Color.BG_BLUE
    },
    counter: {
        fontSize: 18,
        fontWeight: '600'
    },
    subTitle: {
        color: Color.RED, fontWeight: 'bold'
    },
    
});
export default SubCatHeader;
