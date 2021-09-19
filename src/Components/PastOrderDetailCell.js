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

const image = require('../../assets/slide1.jpg')
const plusIcon = require('../../assets/add.png')

const PastOrderDetailCell = (props) => {
    const { item } = props
    return (
        <View style={styles.container}>
            <Image style={styles.menu} source={image} />
            <View style={styles.centerView}>
                <View style={styles.row}>
                    <Text style={styles.dishLbl}>{'Dish:'}</Text>
                    <Text style={styles.dishValueLbl}>{item.dish.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.sizeLbl}>{'Size:'}</Text>
                    <Text style={styles.sizeLbl}>{item.size.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.quantityLbl}>{'Quantity'}</Text>
                    <Text style={styles.quantityLbl}>{item.quantity}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 7,
        marginBottom: 15,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    menu: {
        width: 130,
        height: 130,
        marginLeft: 15,
        resizeMode: 'contain'
    },
    centerView: {
        marginLeft: 20
        // alignItems: 'center'
    },
    status: {
        // marginTop: 10,
        fontSize: 20,
        fontWeight: '700'
    },
    statusVal: {
        marginTop: 20,
        alignSelf: 'flex-start',
        fontSize: 13,
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
    },
    addButton: {
        width: 35,
        height: 40,
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Color.BLACK
    },
    row: {
        flexDirection: 'row'
    },
    dishLbl: {
        fontSize: 18,
        paddingRight: 10,
    },
    dishValueLbl: {
        fontSize: 18,
        color: 'green'
    },
    sizeLbl: {
        fontSize: 18,
        paddingRight: 10,
        color: Color.BG_GRAY
    },
    quantityLbl: {
        fontSize: 18,
        paddingRight: 10,
        color: Color.RED
    }
});
export default PastOrderDetailCell;
