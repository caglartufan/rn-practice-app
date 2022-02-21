import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

import { DefaultText } from '../components/Primitives/Typography';

const Settings = props => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <DefaultText>Settings Screen!</DefaultText>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
});

export default Settings;