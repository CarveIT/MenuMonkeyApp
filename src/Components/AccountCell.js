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

const AccountCell = (props) => {
    const { item, callback } = props
    return (
        <TouchableOpacity style={styles.container} onPress={() => callback(item)}>
            <View style={styles.content}>
                <Image style={styles.menu} source={item.image} resizeMode='contain' />
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.separator}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginVertical: 10,
        height: 70,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    content: {
        flex:  1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menu: {
        width: 25,
        height: 25,
        marginLeft: 10,
        tintColor: Color.BLACK
    },
    title: {
        marginLeft: 20,
        fontSize: 18
    },
    separator: {
        width: '100%',
        height: 2,
        marginTop: 'auto',
        backgroundColor: Color.BLACK
    }
});
export default AccountCell;
