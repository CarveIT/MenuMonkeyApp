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
import Constants from '../Utilities/Constants';

const image = require('../../assets/slide1.jpg')
const plusIcon = require('../../assets/add.png')

const CustomerFavoriteCell = (props) => {
    const { item, navigation } = props
    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.menu} source={{uri: Constants.dishImageUrl+item.dish.imageName}} />
            <View style={styles.centerView}>
                <Text style={styles.status}>{item.dish.name.charAt(0).toUpperCase() + item.dish.name.slice(1)}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ItemDetail')}>
                    <Image style={styles.plusImage} source={plusIcon}></Image>
                </TouchableOpacity>
            </View>
            <Text style={styles.statusVal}>{'$'+item.dish.price+'   Description of Dish'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        // marginHorizontal: 10,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    menu: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    centerView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    status: {
        // marginTop: 10,
        fontSize: 20,
        fontWeight: '700'
    },
    statusVal: {
        marginTop: 20,
        alignSelf: 'flex-start',
        fontSize: 16,
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
    plusLbl: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Color.GREEN
    },
    plusImage: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
});
export default CustomerFavoriteCell;
