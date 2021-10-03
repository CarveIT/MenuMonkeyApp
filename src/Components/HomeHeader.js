/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Linking,
    Alert
} from 'react-native';

import Color from '../Utilities/Color';
const image = require('../../assets/heart.png')
const imageback = require('../../assets/left-arrow.png')
const shareIcon = require('../../assets/share.png')
import ApiCalls from '../Services/ApiCalls';

const HomeHeader = (props) => {
    const { title, subTitle, onbackpress } = props

    // const [loading, setLoading] = useState(false)

    const addFavoriteApi = (params, endPoint) => {
        // setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            // console.log("DATA");
            // console.log(data)
            // setLoading(false)
            if (data.success) {
            } else {
                Alert.alert('Error', data.error);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    const add = () => {
        var formData = new FormData();
        formData.append('id', 1)
        addFavoriteApi(formData, 'add-favorite')
    }

    const share = async () => {
        console.log('SHARE')
        try {
            await Linking.openURL('https://www.facebook.com');
        } catch {
            throw new Error('URI cant open:' + url);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>

            </View>

            <TouchableOpacity style={styles.heartView} onPress={() => add()}>
                <Image style={styles.heart} source={image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareView} onPress={() => share()}>
                <Image style={styles.heart} source={shareIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onbackpress} style={styles.backimageBG}>
                <Image style={styles.backimage} source={imageback}></Image>
                <Text style={{ color: Color.WHITE, marginStart: 2, alignSelf: 'center' }} >Back</Text>
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
        height: 30, width: 30,
        borderRadius: 15,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Color.RED,
        bottom: 7,
        right: 40,
    },
    heart: {
        width: 20,
        height: 20,
        alignSelf: "center",
        tintColor: Color.WHITE
    },
    backimage: {
        height: 8, width: 8, alignSelf: "center"
    },
    backimageBG: {
        flexDirection: 'row',
        width: 55, height: 20,
        backgroundColor: Color.BG_BLUE,
        borderRadius: 15,
        position: 'absolute',
        right: 3, top: 3,
        justifyContent: 'center'
    },
    shareView: {
        marginLeft: 'auto',
        marginRight: 10,
        height: 30, width: 30,
        borderRadius: 15,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Color.BG_BLUE,
        bottom: 7,
        right: 2,
    },
});
export default HomeHeader;
