import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import SearchBar from '../components/UI/SearchBar';
import ProductList from '../components/UI/ProductList';
import { HeadingPrimary } from '../components/Primitives/Typography';

import MostSold from '../data/mostSold';

const Products = props => {
    const { route } = props;

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar />
            <ProductList
                data={MostSold}
                numColumns={2}
                key={'Products'}
                ListHeaderComponent={<HeadingPrimary>{route.params.categoryTitle}</HeadingPrimary>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Products;