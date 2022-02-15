import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    Dimensions
} from 'react-native';

import SearchBar from '../components/UI/SearchBar';
import CarouselSlider from '../components/UI/CarouselSlider';
import FeaturedProducts from '../components/UI/FeaturedProducts';

import Colors from '../constants/Colors';

import CarouselSliderData from '../data/slider';
import MostSold from '../data/mostSold';

const { width } = Dimensions.get('window');

const Home = props => {
    return (
        <View style={styles.container}>
            <SearchBar />
            <ScrollView>
                <View style={styles.carouselSliderContainer}>
                    <CarouselSlider
                        data={CarouselSliderData}
                        height={width*0.6}
                        width={width}
                        itemWidth={width - (width/5)}
                    />
                </View>
                <FeaturedProducts data={MostSold} />
                <Text>Home Screen!</Text>
                <Button color={Colors.primary} title='Go to Categories' onPress={() => {
                    props.navigation.navigate('Categories');
                }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    carouselSliderContainer: {
        height: width*0.6
    }
});

export default Home;