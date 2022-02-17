import React from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import ProductItem from './ProductItem';

const FeaturedProducts = props => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={itemData => <ProductItem {...itemData.item} />}
                horizontal={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
});

export default FeaturedProducts;