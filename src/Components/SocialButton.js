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

const SocialButton = (props) => {
    const { title, style, onPress, icon } = props
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={styles.iconView}>
                <Image resizeMode='contain' style={styles.icon} source={icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 35,
        width: 120,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 5,
        borderRadius: 17,
        backgroundColor: Color.BG_BLUE
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: Color.WHITE
    },
    iconView: {
        width: 25,
        height: 25,
        padding: 5,
        marginRight: 5,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.WHITE
    },
    icon: {
        width: 20,
        height: 20
    }
});
export default SocialButton;
