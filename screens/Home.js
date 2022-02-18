import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';

import SearchBar from '../components/UI/SearchBar';
import CarouselSlider from '../components/UI/CarouselSlider';
import FeaturedProducts from '../components/UI/FeaturedProducts';
import RecommendedCategories from '../components/UI/RecommendedCategories';
import ProductList from '../components/UI/ProductList';
import SocialMediaList from '../components/UI/SocialMediaList';
import { HeadingSecondary } from '../components/UI/Typography';

import CarouselSliderData from '../data/slider';
import MostSold from '../data/mostSold';
import Categories from '../data/categories';

const { width } = Dimensions.get('window');

const Home = props => {
    const HeaderPart = () => (
        <ScrollView>
            <View style={styles.sectionSlider}>
                <CarouselSlider
                    data={CarouselSliderData}
                    height={width*0.6}
                    width={width}
                    itemHeight={width*0.5}
                    itemWidth={width - (width/5)}
                />
            </View>
            <View style={styles.sectionFeatured}>
                <HeadingSecondary>Öne Çıkan Ürünler</HeadingSecondary>
                <FeaturedProducts data={MostSold} />
            </View>
            <View style={styles.sectionRecommendedCategories}>
                <HeadingSecondary>Size Uygun Kategoriler</HeadingSecondary>
                <RecommendedCategories data={Categories} />
            </View>
            <HeadingSecondary>Dikkatinizi Çekebilecek Ürünler</HeadingSecondary>
        </ScrollView>
    );

    const FooterPart = () => (
        <View style={styles.sectionSocialMedia}>
            <SocialMediaList />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar />
            <ProductList
                data={MostSold}
                numColumns={2}
                key={'Products'}
                ListHeaderComponent={HeaderPart}
                ListFooterComponent={FooterPart}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    sectionSlider: {
        height: width*0.6,
    },
    sectionSocialMedia: {
        margin: 10
    }
});

export default Home;