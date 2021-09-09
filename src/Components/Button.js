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
    ActivityIndicator
} from 'react-native';

import Color from '../Utilities/Color';

const Button = (props) => {
    const { title, style, onPress, loading = false } = props

    const Loader = () => {
        return (
            <View style={[styles.container, style]} onPress={onPress}>
                <ActivityIndicator size={'large'}  color={Color.WHITE} />
            </View>
    
        )
    }
    
    return (
        !loading ? <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity> :
        <Loader/>

    );
};

const styles = StyleSheet.create({
    container: {
        //  flex: 1,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Color.GREEN
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.WHITE
    }
});
export default Button;
