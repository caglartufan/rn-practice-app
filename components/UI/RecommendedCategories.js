import React from 'react';
import { View, StyleSheet } from 'react-native';

import CategoryItem from './CategoryItem';

const RecommendedCategories = props => {
    return (
        <View style={styles.container}>
            {props.data.map(category =>
                <CategoryItem {...category} key={category.id} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    }
});

export default RecommendedCategories;