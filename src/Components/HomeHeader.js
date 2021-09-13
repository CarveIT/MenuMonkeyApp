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
const imageback = require('../../assets/left-arrow.png')

const HomeHeader = (props) => {
    const { title, subTitle, onbackpress } = props
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>

            </View>

            <TouchableOpacity style={styles.heartView}>
                <Image style={styles.heart} source={image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onbackpress} style={styles.backimageBG}>
                <Image style={styles.backimage} source={imageback}></Image>
                <Text style={{ color: Color.WHITE, marginStart: 2 ,alignSelf:'center'}} >Back</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        height: 70,
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        fontSize: 30,
        position: 'absolute',
        left: 10,
        top: 10,

        fontWeight: '700'
    },
    subTitle: {
        marginLeft: 20,
        fontSize: 15,
        position: 'absolute',
        left: 10,
        top: 45,
        color: 'gray'
    },
    heartView: {
        marginLeft: 'auto',
        marginRight: 10,
        height:30,width:30,
        borderRadius:15,
        position: 'absolute',
        justifyContent:'center',
        backgroundColor:"red",
        bottom: 7,
        right: 2,
    },
    heart: {
        width: 20,
        height: 20,
        alignSelf:"center",
        tintColor:Color.WHITE
    },
    backimage: {
        height: 8, width: 8, alignSelf:"center"
    },
    backimageBG: {
        flexDirection: 'row',
        width: 55, height: 20,
        backgroundColor: Color.BG_BLUE,
        borderRadius: 15,
        position: 'absolute',
        right: 3, top: 3,
        justifyContent: 'center'
    }
});
export default HomeHeader;
