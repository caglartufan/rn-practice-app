import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import NativeTouchable from './NativeTouchable';
import { DefaultText, BoldText } from './Typography';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const ProductItem = props => {
    return (
        <NativeTouchable
            style={styles.item}
            onPress={props.onPress}
            borderRadius={8}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: props.image }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <DefaultText style={styles.title} numberOfLines={1} lineBreakMode='clip'>{props.title}</DefaultText>
                    <BoldText style={styles.price}>{props.price}TL</BoldText>
                </View>
            </View>
        </NativeTouchable>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 10,
        backgroundColor: Colors.white
    },
    container: {
        minHeight: 200
    },
    imageContainer: {
        flex: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: (width-40)/2 - 20,
        aspectRatio: 1.25,
        resizeMode: 'contain'
    },
    details: {
        flex: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE'
    },
    title: {
        textAlign: 'center',
        fontSize: 15
    },
    price: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors.primary
    }
});

export default ProductItem;