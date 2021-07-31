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
const backImg = require('../../assets/back.png')
const searchImg = require('../../assets/search.png')

const SubCatHeader = (props) => {
    const { title, subTitle } = props
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtnView} onPress={() => props.navigation.goBack()}>
                    <Image resizeMode='contain' style={styles.backBtn} source={backImg}></Image>
                </TouchableOpacity>
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Search by name'}
                    />
                    <Image style={styles.searchIcon} source={searchImg} />
                </View>
                <View style={styles.cartView}>
                    <Image resizeMode='contain' style={styles.cartIcon} source={cartImg} />
                    <Text style={styles.counter}>{'2'}</Text>
                </View>
                
            </View>
            <Text style={styles.subTitle}>{'FOOD ITEMS'}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    main: {
        height: 100,
        backgroundColor: Color.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',  
    },
    backBtnView: {
        flex: 1,
    },
    backBtn: {
        width: 25,
        height: 25
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
    input: {
        flex: 1,
        height: 30,
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
        color: Color.RED
    },
    cartView: {
        flex: 1,
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
    subTitle:{
        marginTop: 15,
        color: Color.BG_BLUE
    }
});
export default SubCatHeader;
