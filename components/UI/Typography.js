import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const HeadingPrimary = props => {
    return (
        <View style={styles.headingPrimary}>
            <Text style={styles.headingPrimaryText}>{props.children}</Text>
        </View>
    );
};

export const HeadingSecondary = props => {
    return (
        <View style={styles.headingSecondary}>
            <Text style={styles.headingSecondaryText}>{props.children}</Text>
        </View>
    );
};

export const DefaultText = props => {
    return (
        <Text {...props} style={{...styles.defaultText, ...props.style}}>{props.children}</Text>
    );
};

export const BoldText = props => {
    return (
        <Text {...props} style={{...styles.boldText, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    headingPrimary: {
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingPrimaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.primary
    },
    headingSecondary: {
        marginVertical: 4,
        marginHorizontal: 10
    },
    headingSecondaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Colors.primary
    },
    defaultText: {
        fontFamily: 'open-sans',
        fontSize: 13
    },
    boldText: {
        fontFamily: 'open-sans-bold',
        fontSize: 13
    }
});