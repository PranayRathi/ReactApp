import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    Animated,
    ToastAndroid,
    StyleSheet
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
import { connect } from 'react-redux'
let opacity

const ProductInfo = (prop) => {
    // console.log("========= prop", prop)
    const { productID } = prop.route.params;

    const [product, setProduct] = useState({});

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);

    useEffect(() => {
        const unsubscribe = prop.navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [prop.navigation]);

    //get product data by productID

    const getDataFromDB = () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == productID) {
                setProduct(Items[index]);
                return;
            }
        }
    };
    // console.log(product, productID)
    //add to cart

    const addToCart = (id) => {
        prop.addItemToCart(id);
        ToastAndroid.show(
            'Item Added Successfully to cart',
            ToastAndroid.SHORT,
        );
        // console.log('product ===== ', prop.cartItems)
        prop.navigation.navigate('Home');

        // let itemArray = this.props.cartItems//await AsyncStorage.getItem('cartItems');
        // itemArray = JSON.parse(itemArray);
        // if (itemArray) {
        //     let array = itemArray;
        //     array.push(id);

        //     try {
        //         // await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        //         this.props.addItemToCart(id)
        //         ToastAndroid.show(
        //             'Item Added Successfully to cart',
        //             ToastAndroid.SHORT,
        //         );
        //         navigation.navigate('Home');
        //     } catch (error) {
        //         return error;
        //     }
        // } else {
        //     let array = [];
        //     array.push(id);
        //     try {
        //         // await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        //         this.props.addItemToCart(id)
        //         ToastAndroid.show(
        //             'Item Added Successfully to cart',
        //             ToastAndroid.SHORT,
        //         );
        //         navigation.navigate('Home');
        //     } catch (error) {
        //         return error;
        //     }
        // }
        // this.props.addItemToCart(id)
    };

    //product horizontal scroll product card
    const renderProduct = ({ item, index }) => {
        return (
            <View
                style={styles.s1}>
                <Image
                    source={item}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
        );
    };

    return (
        <View
            style={styles.s2}>
            <StatusBar
                backgroundColor={COLOURS.backgroundLight}
                barStyle="dark-content"
            />
            <ScrollView>
                <View
                    style={styles.s3}>
                    <View
                        style={styles.s4}>
                        <TouchableOpacity onPress={() => prop.navigation.goBack('Home')}>
                            <Entypo
                                name="chevron-left"
                                style={styles.s5}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={product.productImageList ? product.productImageList : null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                    />
                    <View
                        style={styles.s6}>
                        {product.productImageList
                            ? product.productImageList.map((data, index) => {
                                opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={styles.s7}></Animated.View>
                                );
                            })
                            : null}
                    </View>
                </View>
                <View
                    style={styles.s8}>
                    <View
                        style={styles.s9}>
                        <Entypo
                            name="shopping-cart"
                            style={styles.s10}
                        />
                        <Text
                            style={styles.s11}>
                            Shopping
                        </Text>
                    </View>
                    <View
                        style={styles.s12}>
                        <Text
                            style={styles.s13}>
                            {product.productName}
                        </Text>
                        <Ionicons
                            name="link-outline"
                            style={styles.s14}
                        />
                    </View>
                    <Text
                        style={styles.s15}>
                        {product.description}
                    </Text>
                    <View
                        style={styles.s16}>
                        <View
                            style={styles.s17}>
                            <View
                                style={styles.s18}>
                                <Entypo
                                    name="location-pin"
                                    style={styles.s19}
                                />
                            </View>
                            <Text> Weekly Market Road,{'\n'} Nandura-443404</Text>
                        </View>
                        <Entypo
                            name="chevron-right"
                            style={styles.s20}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 6,
                        }}>
                        <Text
                            style={styles.s21}>
                            &#8377; {product.productPrice}.00
                        </Text>
                        <Text>
                            Tax Rate 2%~ &#8377;{product.productPrice / 20} (&#8377;
                            {product.productPrice + product.productPrice / 20})
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View
                style={styles.s22}>
                <TouchableOpacity
                    onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
                    style={styles.s23}>
                    <Text
                        style={styles.s24}>
                        {product.isAvailable ? 'Add to cart' : 'Not Avialable'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

// export default ProductInfo;

const styles = StyleSheet.create({
    s1: {
        width: width,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    s2: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
    },

    s3: {
        width: '100%',
        backgroundColor: COLOURS.backgroundLight,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },

    s4: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,
    },

    s5: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.white,
        borderRadius: 10,
    },

    s6: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 32,
    },

    s7: {
        width: '16%',
        height: 2.4,
        backgroundColor: COLOURS.black,
        opacity,
        marginHorizontal: 4,
        borderRadius: 100,
    },

    s8: {
        paddingHorizontal: 16,
        marginTop: 6,
    },

    s9: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 14,
    },

    s10: {
        fontSize: 18,
        color: COLOURS.blue,
        marginRight: 6,
    },

    s11: {
        fontSize: 12,
        color: COLOURS.black,
    },

    s12: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    s13: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginVertical: 4,
        color: COLOURS.black,
        maxWidth: '84%',
    },

    s14: {
        fontSize: 24,
        color: COLOURS.blue,
        backgroundColor: COLOURS.blue + 10,
        padding: 8,
        borderRadius: 100,
    },

    s15: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
        lineHeight: 20,
        maxWidth: '85%',
        maxHeight: 44,
        marginBottom: 18,
    },

    s16: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 14,
        borderBottomColor: COLOURS.backgroundLight,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },

    s17: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },

    s18: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 100,
        marginRight: 10,
    },

    s19: {
        fontSize: 16,
        color: COLOURS.blue,
    },

    s20: {
        fontSize: 22,
        color: COLOURS.backgroundDark,
    },
    s21: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '85%',
        color: COLOURS.black,
        marginBottom: 4,
    },

    s22: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    s23: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    s24: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    }

})