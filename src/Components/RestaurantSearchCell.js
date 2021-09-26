/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ActivityIndicator,
    Alert
} from 'react-native';

import Color from '../Utilities/Color';
import Constants from '../Utilities/Constants';
const image = require('../../assets/heart.png')

const RestaurantSearchCell = (props) => {
    const { item, navigation } = props

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            Constants.selectedRestaurant = item
            props.navigation.navigate('Home')
        }}>
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.address}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 30,
        fontWeight: '700'
    },
    subTitle: {
        marginLeft: 20,
        marginBottom: 5,
        fontSize: 15,
        color: 'gray'
    },
    heartView: {
        marginLeft: 'auto',
        marginRight: 10
    },
    heart: {
        width: 30,
        height: 30,
    }
});
export default RestaurantSearchCell;
