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

const WIDTH = Dimensions.get('window').width;
const CartHeader = (props) => {
    const { title, subTitle } = props
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.cartView}>
                <Image resizeMode='contain' style={styles.cartIcon} source={cartImg} />
                <Text style={styles.counter}>{'2'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: Color.RED
    },
    cartView: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: 20
    },
    cartIcon: {
        width: 25,
        height: 25,
    },
    counter: {
        fontSize: 18,
        fontWeight: '600'
    }
});
export default CartHeader;
