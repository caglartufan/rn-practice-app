import React from 'react';
import {
    Platform,
    SafeAreaView,
    Image,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Products from '../screens/Products';
import Settings from '../screens/Settings';
import Auth from '../screens/Auth';

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

const DrawerButton = ({ navigation }) => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={navigation.toggleDrawer}
        />
    </HeaderButtons>
);

const LogOutButton = () => {
    let TouchableCmp;

    if(Platform.OS === 'android' && Platform.Version > 20) {
        TouchableCmp = TouchableNativeFeedback;
    }

    if(Platform.OS === 'ios') {
        TouchableCmp = TouchableOpacity;
    }

    return (
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
            <TouchableCmp background={TouchableNativeFeedback.Ripple('#656566', false)}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name='logout'
                        size={23}
                        color={'#656566'}
                        style={{ marginRight: 30 }}
                    />
                    <Text style={{ color: '#656566' }}>Çıkış Yap</Text>
                </View>
            </TouchableCmp>
        </View>
    );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = ({ navigation }) => ({
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
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {}}
            />
            <Item
                title='Authenticate'
                iconName={Platform.OS === 'android' ? 'md-person-circle' : 'ios-person-circle'}
                onPress={() => {
                    // Check if user signed in already later
                    navigation.navigate('Auth');
                }}
            />
        </HeaderButtons>
    )
});

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
                    headerLeft: () => <DrawerButton navigation={navigation} />
                })}
            />
            <Stack.Screen
                name='Categories'
                component={Categories}
            />
            <Stack.Screen
                name='Products'
                component={Products}
            />
            <Stack.Screen
                name='Auth'
                component={Auth}
                options={{
                    cardStyle: {
                        backgroundColor: Colors.white
                    }
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
                        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View>
                                <DrawerItemList {...props} />
                            </View>
                            <View style={{ padding: 10 }}>
                                <LogOutButton />
                            </View>
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
                <Drawer.Screen
                    name='Settings'
                    component={Settings}
                    options={({navigation}) => ({
                        title: 'Ayarlar',
                        drawerIcon: drawerConfig => (
                            <MaterialIcons
                                name='settings'
                                size={23}
                                color={drawerConfig.color}
                            />
                        ),
                        headerLeft: () => <DrawerButton navigation={navigation} />,
                    })}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default ShopNavigator;