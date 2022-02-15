import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const SearchBar = props => {
    const [hasFocused, setHasFocused] = useState(false);

    return (
        <View style={styles.searchBar}>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-search-sharp' : 'ios-search-sharp'}
                size={21}
                color={hasFocused ? Colors.primary : Colors.black}
                style={styles.searchIcon}
            />
            <TextInput
                autoCorrect={false}
                autoComplete='off'
                onFocus={setHasFocused.bind(this, true)}
                onBlur={setHasFocused.bind(this, false)}
                style={styles.searchInput}
            />
            <Ionicons
                name={Platform.OS === 'android' ? 'md-filter-sharp' : 'ios-filter-sharp'}
                size={23}
                color={Colors.black}
                style={styles.filterIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: 50,
        backgroundColor: Colors.white
    },
    searchIcon: {
        position: 'absolute',
        top: 0,
        left: 21,
        zIndex: 50,
        transform: [
            { translateY: 13 },
        ]
    },
    searchInput: {
        width: '84%',
        backgroundColor: '#EFEFEF',
        fontSize: 15,
        paddingVertical: 6,
        paddingRight: 10,
        paddingLeft: 34,
        marginRight: 10,
        borderRadius: 6
    }
});

export default SearchBar;