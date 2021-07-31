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
const image = require('../../assets/heart.png')

const HomeHeader = (props) => {
    const { title, subTitle } = props
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
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
        height: 80,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '700'
    },
    subTitle: {
        marginLeft: 20,
        fontSize: 15,
        color: 'gray'
    },
    heartView: {
        marginLeft: 'auto',
        marginRight: 10
    },
    heart: {
        width: 30,
        height: 30
    }
});
export default HomeHeader;
