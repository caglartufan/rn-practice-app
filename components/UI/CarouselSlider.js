import React from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import NativeTouchable from '../Primitives/NativeTouchable';

const { width } = Dimensions.get('window');

const renderItem = ({item, index}, parallaxProps) => {

    return (
        <NativeTouchable borderRadius={0}>
            <SafeAreaView style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.source }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    {...parallaxProps}
                />
            </SafeAreaView>
        </NativeTouchable>
    );
};

const CarouselSlider = props => {    return (
        <View style={styles.carousel}>
            <Carousel
                sliderWidth={props.width}
                sliderHeight={props.height}
                itemWidth={props.itemWidth}
                data={props.data}
                renderItem={renderItem}
                hasParallaxImages={true}
                loop={true}
                autoplay={true}
                autoplayDelay={1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carousel: {
        paddingTop: 15
    },
    item: {
        width: '100%',
        height: width*0.5
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }),
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover'
    }
});

export default CarouselSlider;