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
    Text,
    ImageBackground
} from 'react-native';

import Color from '../Utilities/Color';
const image = require('../../assets/account-bg.jpeg')

const AccountHeader = (props) => {
    const { title, subTitle } = props
    return (
        <ImageBackground style={styles.image} source={image}>
            <View style={styles.profileView}>
                <Text style={styles.alphabet}>{'U'}</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.fname}>{'Ahmed'}</Text>
                <Text style={styles.sname}>{'Uzair'}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flexDirection: 'row',
        height: 120,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileView: {
        height: 70,
        width: 70,
        backgroundColor: Color.WHITE,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alphabet: {
        fontSize: 30,
        color: Color.BLUE
    },
    nameView: {
        marginLeft: 10
    },
    fname: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.WHITE
    },
    sname: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.WHITE
    },
});
export default AccountHeader;
