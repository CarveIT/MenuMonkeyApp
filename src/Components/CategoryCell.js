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
    Text,
    Dimensions,
    ImageBackground
} from 'react-native';

import Color from '../Utilities/Color';
const image = require('../../assets/menu_caption.jpeg')
const WIDTH = Dimensions.get('window').width;

const CategoryCell = (props) => {
    
    const { item, navigation } = props
    return (
        <TouchableOpacity style={styles.cell} onPress={() => navigation.navigate('SubCategory', {dishID: item.id})}>
            <ImageBackground style={styles.image} source={image} imageStyle={styles.imageStyle} resizeMode='cover'>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>{item.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        width: (WIDTH / 2),
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        height: 150,
        width: '100%'
    },
    header: {
        width: '100%',
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BLACK,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    headerTxt: {
        fontSize: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: Color.WHITE
    },
    imageStyle: {
        borderRadius: 5
    }
});
export default CategoryCell;
