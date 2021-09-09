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

const SubCategoryCell = (props) => {
    const { item } = props
    return (
        <TouchableOpacity style={styles.container} onPress={() => {props.navigation.navigate('ItemDetail', { detail: item })}}>
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.description}</Text>
            </View>
            <Text style={styles.priceTxt}>{'$'+item.price}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 6,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 25,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: Color.BLUE
    },
    subTitle: {
        marginLeft: 20,
        marginTop: 8,
        marginBottom: 5,
        fontSize: 12,
        fontWeight: '700',
        color: 'gray'
    },
    priceTxt: {
        marginLeft: 'auto',
        marginRight: 20,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
export default SubCategoryCell;
