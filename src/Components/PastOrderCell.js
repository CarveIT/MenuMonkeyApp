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
const image = require('../../assets/menu.png')

const PastOrderCell = (props) => {
    const { item, navigation } = props
    return (
        <View style={styles.container}>
            <Image style={styles.menu} source={image} />
            <View style={styles.centerView}>
                <Text style={styles.status}>{'Status:'}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PastOrderDetail', { pastOrderID: item.id })}>
                    <Text style={styles.statusVal}>{item.status}</Text>
                </TouchableOpacity>
                <Text style={styles.order}>{'Order ID:'}
                    <Text>{'  ' + item.id}</Text>
                </Text>
            </View>
            <View style={styles.rightView}>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity style={styles.reOrder}>
                    <Text style={styles.reorderTxt}>{'Re-Order'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
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
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700'
    },
    statusVal: {
        marginBottom: 5,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'green'
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
export default PastOrderCell;
