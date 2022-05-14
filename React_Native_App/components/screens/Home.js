import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLOURS, Items } from '../database/Database';
import { AsyncStorage } from 'react-native';
const Home = ({ navigation }) => {

    const [product, setProduct] = useState([]);
    const [accessory, setAccessory] = useState([]);
    const [vegetable, setVegetable] = useState([]);
    const [laptop, setLaptop] = useState([]);
    const [userName, setUserName] = useState('Human Being');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getName()
            getDataFromDb();
        });
        return unsubscribe;
    }, [navigation]);

    const getName = async () => {
        let user = await AsyncStorage.getItem('UserName')

        setUserName(user);
    }

    const getDataFromDb = () => {

        let productList = [], accessoryList = [], laptopList = [], vegetableList = [];

        for (const product of Items) {
            if (product.category === 'product') {
                productList.push(product);
            }
            else if (product.category === 'accessory') {
                accessoryList.push(product);
            }
            else if (product.category === 'Laptop') {
                laptopList.push(product);
            }
            else if (product.category === 'Vegetable') {
                vegetableList.push(product);
            }
        }

        setProduct(productList);
        setAccessory(accessoryList);
        setVegetable(vegetableList);
        setLaptop(laptopList);
    };

    // create Products component

    const ProductCart = ({ data }) => {
        // console.log('Data... ', data)
        return (
            <TouchableOpacity
                style={styles.mainproductContainer1}
                onPress=
                {
                    () => {
                        navigation.navigate('ProductsInfo', { productID: data.id })
                    }
                }>
                <View style={styles.mainproductContainer2}>
                    {data.isOff ? (
                        <View style={styles.mainproductContainer3}>
                            <Text style={styles.mainproductContainer4}> {data.offPercentage}%</Text>
                        </View>
                    ) : null}
                    <Image source={data.productImage} style={styles.imageContainer} />
                </View>
                <Text style={styles.mainproductContainer5}>{data.productName}</Text>
                <View>
                    <Text>{data.isAvailable ? (
                        <View style={styles.mainproductContainer7}>
                            <FontAwesome name="circle" style={styles.mainproductContainer6} />
                            <Text>Available</Text>
                        </View>
                    ) : <View style={styles.mainproductContainer7}>
                        <FontAwesome name="circle" style={styles.mainproductContainer8} />
                        <Text>Unavailable</Text>
                    </View>}</Text>
                    <Text>&#8377; {data.productPrice}</Text>
                </View>

            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.bag}>
            <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.verticalScroll}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        <FontAwesome5 name="shopping-bag" style={styles.shoppingBagStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                        <FontAwesome5 name="shopping-cart" style={styles.shoppingCartStyle} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.text1}>Hi {userName} 👋</Text>
                    <Text style={styles.text2}>Thanks for choosing us 😃.</Text>
                    <Text style={styles.text2}>{'\u2728'}Find some intesting deal on items.{'\u2728'}</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <View style={styles.productContainer1}>
                        <View style={styles.mainTextContainer}>
                            <Text style={styles.mainText1}>Vegetable</Text>
                            <Text style={styles.mainText2}>{vegetable.length}</Text>
                        </View>

                    </View>
                    <View style={styles.outerContainer}>{
                        vegetable.map(data => {
                            return <ProductCart data={data} key={data.id} />;
                        })
                    }</View>
                    <View style={styles.productContainer1}>
                        <View style={styles.mainTextContainer}>
                            <Text style={styles.mainText1}>Laptop</Text>
                            <Text style={styles.mainText2}>{laptop.length}</Text>
                        </View>

                    </View>
                    <View style={styles.outerContainer}>{
                        laptop.map(data => {
                            return <ProductCart data={data} key={data.id} />;
                        })
                    }</View>
                    <View style={styles.productContainer1}>
                        <View style={styles.mainTextContainer}>
                            <Text style={styles.mainText1}>Product</Text>
                            <Text style={styles.mainText2}>{product.length}</Text>
                        </View>

                    </View>
                    <View style={styles.outerContainer}>{
                        product.map(data => {
                            return <ProductCart data={data} key={data.id} />;
                        })
                    }</View>
                    <View style={styles.productContainer1}>
                        <View style={styles.mainTextContainer}>
                            <Text style={styles.mainText1}>Accessory</Text>
                            <Text style={styles.mainText2}>{accessory.length}</Text>
                        </View>

                    </View>
                    <View style={styles.outerContainer}>{
                        accessory.map(data => {
                            return <ProductCart data={data} key={data.id} />;
                        })
                    }</View>
                </View>

            </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    bag: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white
    },
    imageContainer: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    headerText: {
        marginBottom: 5,
        padding: 16
    },
    mainTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainText1: {
        fontSize: 18,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1
    },
    mainText2: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        opacity: 0.5,
        marginLeft: 12
    },
    mainText3: {
        fontSize: 14,
        color: COLOURS.blue,
        fontWeight: '400',
    },

    mainproductContainer1: {
        width: '48%',
        marginVertical: 14
    },
    mainproductContainer2: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight,
        position: 'relative',
        justifyContent: 'center',
        marginBottom: 8
    },
    mainproductContainer3: {
        position: 'absolute',
        width: '20%',
        height: '24%',
        backgroundColor: COLOURS.green,
        top: 0,
        left: 0,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainproductContainer4: {
        fontSize: 12,
        color: COLOURS.white,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    mainproductContainer5: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '600',
        marginBottom: 2,
    },
    mainproductContainer6: {
        fontSize: 12,
        marginRight: 6,
        color: COLOURS.green,
    },
    mainproductContainer8: {
        fontSize: 12,
        marginRight: 6,
        color: COLOURS.red,
    },
    mainproductContainer7: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    outerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    productContainer1: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    shoppingBagStyle: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLOURS.backgroundLight,
        letterSpacing: 10
    },
    shoppingCartStyle: {
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderRadius: 1,
        borderColor: COLOURS.backgroundLight
    },
    text1: {
        fontSize: 26,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 10
    },
    text2: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        lineHeight: 24
    },
    verticalScroll: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    }
});
