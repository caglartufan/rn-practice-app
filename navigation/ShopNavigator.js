import React from 'react';
import { Platform, SafeAreaView, Image, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Categories from '../screens/Categories';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import Colors from '../constants/Colors';

import logo from '../assets/logo.png';

const LogoTitle = () => {
    return (
        <View style={{ width: 80, flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
            <Image
                style={{ width: '100%', height: undefined, aspectRatio: 3.325, overflow: 'visible' }}
                source={logo}
            />
        </View>
    );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
    /*headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },*/
    headerShadowVisible: false,
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTitle: () => <LogoTitle />,
    headerTitleAlign: 'center',
    // Color for back button and title
    headerTintColor: Colors.black,
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Authenticate'
                iconName={Platform.OS === 'android' ? 'md-person-circle' : 'ios-person-circle'}
                onPress={() => {}}
            />
            <Item
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {}}
            />
        </HeaderButtons>
    )
};

const MainNavigationStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={defaultNavOptions}
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={({ navigation }) => ({
                    title: 'Mağaza',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={navigation.toggleDrawer}
                            />
                        </HeaderButtons>
                    )
                })}
            />
            <Stack.Screen
                name='Categories'
                component={Categories}
                options={{
                    title: 'Tüm Kategoriler'
                }}
            />
        </Stack.Navigator>
    );
};

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Store'
                screenOptions={{
                    drawerActiveTintColor: Colors.primary
                }}
                drawerContent={props => (
                    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
                        <SafeAreaView>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                )}
            >
                <Drawer.Screen
                    name='Store'
                    component={MainNavigationStack}
                    options={{
                        headerShown: false,
                        title: 'Mağaza',
                        drawerIcon: drawerConfig => (
                            <MaterialIcons
                                name='store'
                                size={23}
                                color={drawerConfig.color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default ShopNavigator;