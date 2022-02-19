import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import NativeTouchable from './NativeTouchable';

import Colors from '../../constants/Colors';

const socials = [
    { name: 'twitter', link: 'https://www.twitter.com/' },
    { name: 'instagram', link: 'https://www.instagram.com/' },
    { name: 'youtube', link: 'https://www.youtube.com/' },
    { name: 'whatsapp', link: 'https://www.whatsapp.com/' }
];

const socialMediaIcons = Platform.select({
    ios: {
        twitter: {
            name: 'ios-logo-twitter',
            color: '#1DA1F2'
        },
        instagram: {
            name: 'ios-logo-instagram',
            color: '#E1306C'
        },
        youtube: {
            name: 'ios-logo-youtube',
            color: '#FF0000'
        },
        whatsapp: {
            name: 'ios-logo-whatsapp',
            color: '#25D366'
        }
    },
    android: {
        twitter: {
            name: 'md-logo-twitter',
            color: '#1DA1F2'
        },
        instagram: {
            name: 'md-logo-instagram',
            color: '#E1306C'
        },
        youtube: {
            name: 'md-logo-youtube',
            color: '#FF0000'
        },
        whatsapp: {
            name: 'md-logo-whatsapp',
            color: '#25D366'
        }
    }
})

const SocialItem = props => {
    const onPressHandler = link => {
        WebBrowser.openBrowserAsync(link);
    };

    return (
        <NativeTouchable
            style={styles.item}
            borderRadius={22.5}
            onPress={onPressHandler.bind(this, props.link)}
        >
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
                <SocialItem {...social} key={social.name} />
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