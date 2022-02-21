import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    StyleSheet
} from 'react-native';

import Colors from '../../constants/Colors';

const NativeTouchable = props => {
    let TouchableCmp;

    if(Platform.OS === 'android' && Platform.Version > 20) {
        TouchableCmp = TouchableNativeFeedback;
    }

    if(Platform.OS === 'ios') {
        TouchableCmp = TouchableOpacity;
    }

    return (
        <View style={{...styles.item, ...props.style, borderRadius: props.borderRadius || 0}}>
            <View style={{...styles.touchable, borderRadius: props.borderRadius || 0}}>
                <TouchableCmp
                    onPress={props.onPress}
                    useForeground
                >
                    {props.children}
                </TouchableCmp>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        shadowColor: Colors.black,
        shadowOpacity: .26,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        elevation: 4,
    },
    touchable: {
        overflow: 'hidden'
    },
});

export default NativeTouchable;