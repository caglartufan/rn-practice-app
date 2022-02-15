import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Platform
} from 'react-native';

import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const Product = props => {
    let TouchableCmp;

    if(Platform.OS === 'android' && Platform.Version > 20) {
        TouchableCmp = TouchableNativeFeedback;
    }

    if(Platform.OS === 'ios') {
        TouchableCmp = TouchableOpacity;
    }

    return (
        <View style={styles.item}>
            <View style={styles.touchable}>
                <TouchableCmp
                    onPress={() => alert('Oke?')}
                    useForeground
                >
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: props.image }} style={styles.image} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title} numberOfLines={1} lineBreakMode='clip'>{props.title}</Text>
                            <Text style={styles.price}>{props.price}$</Text>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

const FeaturedProducts = props => {
    return (
        <View style={styles.slider}>
            <FlatList
                data={props.data}
                renderItem={itemData => <Product {...itemData.item} />}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    slider: {
        height: 230,
    },
    item: {
        width: (width/2 - 20),
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .26,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 8
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 8
    },
    imageContainer: {
        height: 150,
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
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE'
    },
    title: {
        textAlign: 'center',
        fontSize: 16
    },
    price: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '800',
        color: Colors.primary
    }
});

export default FeaturedProducts;