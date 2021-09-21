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
    TextInput
} from 'react-native';

import Color from '../Utilities/Color';
import QuantityInput from './QuantityInput';
const image = require('../../assets/trash.png')

const CartCell = (props) => {
    const { item } = props

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {/* <View style={styles.inputView}>
                    <Text>{item.id}</Text>
                    <QuantityInput/>
                </View> */}
                {/* <View style={styles.priceView}>
                    <Text style={styles.priceTxt}>{item.price}</Text>
                    <TouchableOpacity>
                        <Image source={image} />
                    </TouchableOpacity>
                </View> */}
            </View>

            <Text style={styles.title}>{item.quantity + "X" +item.dish.price}</Text>
            <Text style={styles.tagline}>{'code best brewed fase help'}</Text>
            <View style={styles.separator}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    row: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        marginLeft: 10,
        alignItems: 'center'
    },
    priceView: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 10
    },
    priceTxt: {
        marginRight: 15,
        fontSize: 20,
        fontWeight: '700'
    },
    title: {
        width:'50%',
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700'
    },
    tagline: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 15,
    },
    separator: {
        width: '100%',
        height: 0.9,
        marginTop: 30,
        backgroundColor: Color.SEPARATOR
    },

});
export default CartCell;
