import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default class CarouselSlider extends Component {
    _renderItem({item, index}, parallaxProps) {
        let TouchableComponent;

        if(Platform.OS === 'android' && Platform.Version > 20) {
            TouchableComponent = TouchableNativeFeedback;
        }

        if(Platform.OS === 'ios') {
            TouchableComponent = TouchableOpacity;
        }

        return (
            <TouchableNativeFeedback onPress={() => alert('Hi!')} useForeground activeOpacity={.1}>
                <View style={{borderRadius: 5}}>
                    <SafeAreaView style={styles.item}>
                        <ParallaxImage
                            source={{ uri: item.source }}
                            containerStyle={styles.imageContainer}
                            style={styles.image}
                            {...parallaxProps}
                        />
                    </SafeAreaView>
                </View>
            </TouchableNativeFeedback>
        );
    };

    render() {
        const settings = {
            sliderWidth: this.props.width,
            sliderHeight: this.props.height,
            itemWidth: this.props.itemWidth,
            data: this.props.data,
            renderItem: this._renderItem,
            hasParallaxImages: true,
            loop: true,
            autoplay: true,
            autoplayDelay: 1000
        };

        return (
            <View style={styles.carousel}>
                <Carousel {...settings} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carousel: {
        paddingTop: 15
    },
    item: {
        width: '100%',
        height: width*0.6
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