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
    ActivityIndicator,
    Alert
} from 'react-native';

import Color from '../Utilities/Color';
import ApiCalls from '../Services/ApiCalls';
const image = require('../../assets/heart.png')

const FavouriteCell = (props) => {
    const { item, onDelete } = props
    const [loading, setLoading] = useState(false)

    const removeFavoriteApi = (params, endPoint) => {
        setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            setLoading(false)
            if (data.message == null) {
                onDelete(true)
            } else {
                onDelete(true)
                Alert.alert('Error', data.message);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    const remove = () => {
        var formData = new FormData();
        formData.append('id', 3)
        removeFavoriteApi(formData, 'remove-favorite')
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{item.restaurant.name}</Text>
                <Text style={styles.subTitle}>{item.restaurant.address}</Text>
            </View>
            {!loading ? <TouchableOpacity style={styles.heartView} onPress={() => remove()}>
                <Image style={styles.heart} source={image} />
            </TouchableOpacity> :
                <View style={styles.heartView}>
                    <ActivityIndicator size={'large'} color={Color.BG_BLUE} />
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: Color.WHITE
    },
    title: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 30,
        fontWeight: '700'
    },
    subTitle: {
        marginLeft: 20,
        marginTop: 8,
        marginBottom: 5,
        fontSize: 15,
        color: 'gray'
    },
    heartView: {
        marginLeft: 'auto',
        marginRight: 10
    },
    heart: {
        width: 30,
        height: 30,
    }
});
export default FavouriteCell;
