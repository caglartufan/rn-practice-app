import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NativeTouchable from './NativeTouchable';
import { DefaultText } from './Typography';

import Colors from '../../constants/Colors';

const socials = [
    { name: 'twitter', link: 'https://www.twitter.com/' },
    { name: 'instagram', link: 'https://www.instagram.com/' },
    { name: 'youtube', link: 'https://www.youtube.com/' }
];

const socialMediaIcons = Platform.select({
    ios: {
        twitter: {
            name: 'ios-logo-twitter',
            color: '#1DA1F2'
        },
        instagram: {
            name: 'ios-logo-instagram',
            color: '#'
        },
        youtube: {
            name: 'ios-logo-youtube',
            color: '#FF0000'
        }
    },
    android: {
        twitter: {
            name: 'md-logo-twitter',
            color: '#1DA1F2'
        },
        instagram: {
            name: 'md-logo-instagram',
            color: '#'
        },
        youtube: {
            name: 'md-logo-youtube',
            color: '#FF0000'
        }
    }
})

const SocialItem = props => {
    return (
        <NativeTouchable style={styles.item} borderRadius={22.5}>
            <View style={styles.socialButton}>
                <Ionicons
                    name={socialMediaIcons[props.name].name}
                    size={23}
                    color={socialMediaIcons[props.name].color}
                />
            </View>
        </NativeTouchable>
    );
};

const SocialMediaList = props => {
    return (
        <View style={styles.container}>
            {socials.map(social =>
                <SocialItem {...social} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    item: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    socialButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        borderRadius: 22.5
    }
});

export default SocialMediaList;