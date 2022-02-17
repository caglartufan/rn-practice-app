import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import ProductItem from './ProductItem';

const ProductList = props => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={itemData =>
                    <ProductItem {...itemData.item} />
                }
                {...props}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ProductList;