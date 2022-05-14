import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StyleSheet
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLOURS, Items } from '../database/Database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const MyCart = ({ navigation }) => {
    const [product, setProduct] = useState('');
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get data from local DB by ID
    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        // console.log(items)
        let productData = [];
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    return;
                }
            });
            setProduct(productData);
            getTotal(productData);
        } else {
            setProduct(false);
            getTotal(false);
        }
    };

    //get total price of all items in the cart
    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice;
            total = total + productPrice;
        }
        setTotal(total);
    };

    //remove data from Cart

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                getDataFromDB();
            }
        }
    };

    //checkout

    const checkOut = async () => {
        // console.log("===== ", product)
        try {
            await AsyncStorage.removeItem('cartItems');
        } catch (error) {
            return error;
        }

        ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);
        // console.log("===== ", product)
        navigation.navigate('Home');
    };

    const renderProducts = (data, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ProductsInfo', { productID: data.id })}
                style={styles.renderProducts1}>
                <View
                    style={styles.renderProducts2}>
                    <Image
                        source={data.productImage}
                        style={styles.renderProducts3}
                    />
                </View>
                <View
                    style={styles.renderProducts4}>
                    <View style={{}}>
                        <Text
                            style={styles.renderProducts5}>
                            {data.productName}
                        </Text>
                        <View
                            style={styles.renderProducts6}>
                            <Text
                                style={styles.renderProducts7}>
                                &#8377;{data.productPrice}
                            </Text>
                            <Text>
                                (~&#8377;
                                {data.productPrice + data.productPrice / 20})
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.renderProducts8}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View
                                style={styles.renderProducts9}>
                                <Entypo
                                    name="minus"
                                    style={styles.renderProducts10}
                                />
                            </View>
                            <Text>1</Text>
                            <View
                                style={styles.renderProducts11}>
                                <Entypo
                                    name="plus"
                                    style={{
                                        fontSize: 16,
                                        color: COLOURS.backgroundDark,
                                    }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                            <MaterialCommunityIcons
                                name="delete-circle"
                                style={styles.renderProducts12}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={styles.s1}>
            <ScrollView>
                <View
                    style={styles.s2}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Entypo
                            name="chevron-left"
                            style={styles.s3}
                        />
                    </TouchableOpacity>
                    <Text
                        style={styles.s4}>
                        Order Details
                    </Text>
                    <View></View>
                </View>

                <Text
                    style={styles.s5}>
                    My Cart
                </Text>
                <View style={{ paddingHorizontal: 16 }}>
                    {product && product.length ? product.map((data, index) => renderProducts(data, index)) :
                        <Text style={styles.text1}>Pleas add product in your cart!</Text>
                    }
                </View>
                <View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginVertical: 10,
                        }}>
                        <Text
                            style={styles.s6}>
                            Delivery Location
                        </Text>
                        <View
                            style={styles.s7}>
                            <View
                                style={styles.s8}>
                                <View
                                    style={styles.s9}>
                                    <MaterialCommunityIcons
                                        name="truck-delivery"
                                        style={{
                                            fontSize: 18,
                                            color: COLOURS.blue,
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={styles.s10}>
                                        Weekly Market Road, Nandura, Maharashtra.
                                    </Text>
                                    <Text
                                        style={styles.s11}>
                                        443404
                                    </Text>
                                </View>
                            </View>
                            <Entypo
                                name="chevron-right"
                                style={{ fontSize: 22, color: COLOURS.black }}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.s12}>
                        <Text
                            style={styles.s13}>
                            Payment Method
                        </Text>
                        <View
                            style={styles.s14}>
                            <View
                                style={styles.s15}>
                                <View
                                    style={styles.s16}>
                                    <Text
                                        style={styles.s17}>
                                        VISA
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={styles.s18}>
                                        Visa Classic
                                    </Text>
                                    <Text
                                        style={styles.s19}>
                                        ****-9092
                                    </Text>
                                </View>
                            </View>
                            <Entypo
                                name="chevron-right"
                                style={styles.s20}
                            />
                        </View>
                        <View
                            style={styles.s14}>
                            <View
                                style={styles.s15}>
                                <View
                                    style={styles.s16}>
                                    <Text
                                        style={styles.s17}>
                                        NYU
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={styles.s18}>
                                        RapiPay
                                    </Text>
                                    <Text
                                        style={styles.s19}>
                                        NEO BANKING PARTNER
                                    </Text>
                                </View>
                            </View>
                            <Entypo
                                name="chevron-right"
                                style={styles.s20}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.s21}>
                        <Text
                            style={styles.s22}>
                            Order Info
                        </Text>
                        <View
                            style={styles.s23}>
                            <Text
                                style={styles.s24}>
                                Subtotal
                            </Text>
                            <Text
                                style={styles.s25}>
                                &#8377;{total}.00
                            </Text>
                        </View>
                        <View
                            style={styles.s26}>
                            <Text
                                style={styles.s27}>
                                Shipping Tax
                            </Text>
                            <Text
                                style={styles.s28}>
                                &#8377;{total / 20}
                            </Text>
                        </View>
                        <View
                            style={styles.s29}>
                            <Text
                                style={styles.s30}>
                                Total
                            </Text>
                            <Text
                                style={styles.s31}>
                                &#8377;{total + total / 20}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View
                style={styles.s32}>
                <TouchableOpacity
                    onPress={() => (total != 0 ? checkOut() : null)}
                    style={styles.s33}>
                    <Text
                        style={styles.s34}>
                        CHECKOUT (&#8377;{total + total / 20} )
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MyCart;



const styles = StyleSheet.create({
    text1: {
        fontSize: 20,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 10
    },
    renderProducts1: {
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    renderProducts2: {
        width: '30%',
        height: 100,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 10,
        marginRight: 22,
    },
    renderProducts3: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    renderProducts4: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
    },

    renderProducts5: {
        fontSize: 14,
        maxWidth: '100%',
        color: COLOURS.black,
        fontWeight: '600',
        letterSpacing: 1,
    },

    renderProducts6: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },

    renderProducts7: {
        fontSize: 14,
        fontWeight: '400',
        maxWidth: '85%',
        marginRight: 4,
    },

    renderProducts8: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    renderProducts9: {
        borderRadius: 100,
        marginRight: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: COLOURS.backgroundMedium,
        opacity: 0.5,
    },

    renderProducts10: {
        fontSize: 16,
        color: COLOURS.backgroundDark,
    },

    renderProducts11: {
        borderRadius: 100,
        marginLeft: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: COLOURS.backgroundMedium,
        opacity: 0.5,
    },

    renderProducts12: {
        fontSize: 25,
        color: COLOURS.backgroundDark,
        backgroundColor: COLOURS.backgroundLight,
        padding: 8,
        borderRadius: 100,
    },

    s1: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
    },

    s2: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    s3: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 12,
    },

    s4: {
        fontSize: 15,
        color: COLOURS.black,
        fontWeight: '500',
    },

    s5: {
        fontSize: 20,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        paddingTop: 20,
        paddingLeft: 16,
        marginBottom: 10,
    },

    s6: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },

    s7: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    s8: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },

    s9: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        marginRight: 18,
    },

    s10: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '500',
    },

    s11: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        lineHeight: 20,
        opacity: 0.5,
    },

    s12: {
        paddingHorizontal: 16,
        marginVertical: 10,
    },

    s13: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },

    s14: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    s15: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    },

    s16: {
        color: COLOURS.blue,
        backgroundColor: COLOURS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        marginRight: 18,
    },

    s17: {
        fontSize: 10,
        fontWeight: '900',
        color: COLOURS.blue,
        letterSpacing: 1,
    },

    s18: {
        fontSize: 14,
        color: COLOURS.black,
        fontWeight: '500',
    },

    s19: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        lineHeight: 20,
        opacity: 0.5,
    },

    s20: {
        fontSize: 22,
        color: COLOURS.black
    },

    s21: {
        paddingHorizontal: 16,
        marginTop: 40,
        marginBottom: 80,
    },

    s22: {
        fontSize: 16,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 20,
    },

    s23: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    s24: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },

    s25: {
        fontSize: 12,
        fontWeight: '400',
        color: COLOURS.black,
        opacity: 0.8,
    },

    s26: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    s27: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },

    s28: {
        fontSize: 12,
        fontWeight: '400',
        color: COLOURS.black,
        opacity: 0.8,
    },

    s29: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    s30: {
        fontSize: 12,
        fontWeight: '400',
        maxWidth: '80%',
        color: COLOURS.black,
        opacity: 0.5,
    },

    s31: {
        fontSize: 18,
        fontWeight: '500',
        color: COLOURS.black,
    },

    s32: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    s33: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    s34: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    }



});


