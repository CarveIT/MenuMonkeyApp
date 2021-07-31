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
const image = require('../../assets/heart.png')
const FavouriteCell = (props) => {
    const { item } = props
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.address}</Text>
            </View>
            <TouchableOpacity style={styles.heartView}>
                <Image style={styles.heart} source={image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 30,
        fontWeight: '700'
    },
    subTitle: {
        marginLeft: 20,
        marginTop: 8,
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
export default FavouriteCell;
