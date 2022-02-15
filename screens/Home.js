import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';

const Home = props => {
    return (
        <View style={styles.container}>
            <Text>Home Screen!</Text>
            <Button color={Colors.primary} title='Go to Categories' onPress={() => {
                props.navigation.navigate('Categories');
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home;