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
} from 'react-native';

import Color from '../Utilities/Color';
const image = require('../../assets/master-card.png')

const PaymentCell = (props) => {
    const { item } = props
    return (
        <View style={styles.container}>
            <Image style={styles.menu} source={image} />
            <View style={styles.centerView}>
                <Text style={styles.status}>{'**** **** **** 4242'}</Text>
                <Text style={styles.statusVal}>{'Expires 11/2021'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginHorizontal: 10,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    menu: {
        marginLeft: 10
    },
    centerView: {
        marginLeft: 20
    },
    status: {
        // marginTop: 10,
        fontSize: 16,
        fontWeight: '700'
    },
    statusVal: {
        marginBottom: 5,
        fontSize: 16,
        color: 'gray'
    },
    order: {
        marginBottom: 5,
        fontWeight: '700',
        color: 'gray'
    },
    rightView: {
        marginLeft: 'auto',
        marginRight: 10,
        alignItems: 'center'
    },
    date: {
        fontSize: 17,
        fontWeight: '700'
    },
    reOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
        backgroundColor: Color.BLUE
    },
    reorderTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.WHITE
    }
});
export default PaymentCell;
