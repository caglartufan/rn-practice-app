import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NativeTouchable from './NativeTouchable';
import { DefaultText } from './Typography';

import Colors from '../../constants/Colors';

const randomColor = () => {
    const colors = Array.from({length: 3}, _ => Math.floor(Math.random()*256));
    return `rgb(${colors.join(',')})`;
}

const CategoryItem = props => {
    const navigation = useNavigation();

    const onPressHandler = categoryTitle => {
        navigation.navigate('Products', {
            categoryTitle: categoryTitle
        });
    };

    return (
        <NativeTouchable
            style={styles.container}
            borderRadius={8}
            onPress={onPressHandler.bind(this, props.title)}
        >
            <View style={styles.content}>
                <ImageBackground imageStyle={styles.image} source={{ uri: props.image }} style={{...styles.imageContainer, backgroundColor: randomColor()}}>
                    <DefaultText style={styles.title}>{props.title}</DefaultText>
                </ImageBackground>
            </View>
        </NativeTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        margin: 10
    },
    content: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 8
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined, 
        resizeMode: 'cover',
        opacity: .18,
        borderRadius: 8
    },
    title: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 20,
        textTransform: 'uppercase',
        width: '100%',
        padding: 10,
        textAlign: 'right',
        color: Colors.white,
        textShadowColor: Colors.black,
        textShadowRadius: 6
    }
});

export default CategoryItem;