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
const image = require('../../assets/menu_caption.jpeg')
const addimage = require('../../assets/add.png')

const SubCategoryCell = (props) => {
    const { item } = props
    return (
        <TouchableOpacity style={styles.container} onPress={() => { props.navigation.navigate('ItemDetail', { detail: item }) }}>
            <View style={styles.imagecontainer}>
                <Image resizeMode='contain' style={styles.image} source={{uri: Constants.dishImageUrl+item.imageName}}></Image>

            </View>
            <View style={styles.productcontainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subTitle}>{item.description}</Text>
                <Text style={styles.priceTxt}>{'$' + item.price}</Text>
            </View>
            <View style={styles.cartcontainer}>
                <Image style={styles.addcart} source={addimage}></Image>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 6,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    imagecontainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 5
    },
    image:
    {
        height: 50,
        width: 50
    },
    addcart: {
        height: 15,
        width: 15,
        alignSelf: 'center'
    },
    cartcontainer: {
        height: 30,
        flex: 0.7,
        borderRadius: 1,
        borderWidth: 2,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 8,
        marginRight: 10,
        borderColor: Color.BLACK,
        margin: 5
    },
    productcontainer: {
        height: '100%',
        marginLeft: 10,
        flex: 8.5,
        justifyContent: 'flex-start'
    },
    title: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        textTransform: 'uppercase',
        color: Color.BLACK
    },
    subTitle: {
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        fontWeight: '700',
        color: 'gray'
    },
    priceTxt: {
        marginLeft: 20,
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    }
});
export default SubCategoryCell;
