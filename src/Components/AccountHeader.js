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
import Constants from '../Utilities/Constants';
const image = require('../../assets/profile-bg.jpg')

const AccountHeader = (props) => {
    const { title, subTitle } = props
    
    return (
        <ImageBackground style={styles.image} source={image}>
            <View style={styles.profileView}>
                <Text style={styles.alphabet}>{Constants.user.name[0]}</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.fname}>{Constants.user.name}</Text>
                <Text style={styles.sname}>{Constants.user.name}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flexDirection: 'row',
        height: 130,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileView: {
        height: 70,
        width: 70,
        backgroundColor: Color.WHITE,
        borderRadius: 35,
        marginBottom:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alphabet: {
        fontSize: 30,
        color: Color.BLUE
    },
    nameView: {
        marginLeft: 10,
        marginBottom:20,
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
