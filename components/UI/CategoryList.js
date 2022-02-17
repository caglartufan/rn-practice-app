import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CategoryItem = props => {
    return (
        <View>
            <Text>{props.title}</Text>
        </View>
    );
};

const CategoryList = props => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={itemData => <CategoryItem {...itemData.item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CategoryList;