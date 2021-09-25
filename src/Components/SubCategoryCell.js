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
                <Image resizeMode='contain' style={styles.image} source={{ uri: Constants.dishImageUrl + item.imageName }}></Image>

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
        height: 150,
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    innercontainer: {
        flexDirection: 'row',
        marginVertical: 6,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: Color.WHITE,
    },
    imagecontainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginRight:20,
        marginTop:20,
    },
    image:
    {
        height: 60,
        width: 60
    },
    addcart: {
        height: 15,
        width: 15,
        alignSelf: 'center'
    },
    cartcontainer: {
        height: 32,
        flex: 0.7,
        borderRadius: 1,
        borderWidth: 3,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 12,
        marginRight: 15,
        borderColor: Color.BLACK,

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
        fontSize: 18,
        color: 'black'
    },
    priceTxt: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        position:'absolute',
        bottom:15
    }
});
export default SubCategoryCell;
