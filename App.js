import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Fonts.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if(!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={setFontLoaded.bind(this, true)}
                onError={err => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    );
}
