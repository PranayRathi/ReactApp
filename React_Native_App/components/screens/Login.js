import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import { COLOURS, Items } from '../database/Database';

const Login = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [isOTPEnter, setisOTPEnter] = React.useState(false);
    const [validateUser, setvalidateUser] = React.useState(false);

    const { colors } = useTheme();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

        });

        return unsubscribe;
    }, [navigation]);

    // const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePhoneNoChange = (val) => {
        console.log("=== ", val, val.toString().length)
        if (val.trim().length >= 10 && !isNaN(val)) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
            setisOTPEnter(true)
            Alert.alert('OTP is 1234', `${data.username}, please use above otp for login`, [
                { text: 'Okay' }
            ]);
        } else {
            if (!isNaN(val)) {

                setData({
                    ...data,
                    password: val,
                    isValidPassword: false
                });
            } else if (isNaN(val)) {
                Alert.alert('Wrong Input!', 'Phone No should be digits only.', [
                    { text: 'Okay' }
                ]);
            }

        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        // signIn(foundUser);
    }

    const validateOTP = (otp) => {
        if (otp == 1234) {
            setvalidateUser(true);
        } else {
            setvalidateUser(false);
        }
        return;
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FFBF00' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome {data.username}!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}

                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Phone Number</Text>
                <View style={styles.action}>
                    <Feather
                        name="phone"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Phone Number"
                        placeholderTextColor="#666666"
                        maxLength={10}
                        keyboardType='numeric'
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePhoneNoChange(val)}
                    />
                    {data.password.toString().length == 10 ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.password.toString().length == 10 || data.password.toString().length == 0 ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }

                {!isOTPEnter ? null :
                    <View>
                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 20
                        }]}>OTP</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter OTP"
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                maxLength={4}
                                keyboardType='numeric'
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => validateOTP(val)}
                                onEndEditing={(e) => validateOTP(e.nativeEvent.text)}
                            />
                            {validateUser ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {validateUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Invalid OTP.</Text>
                            </Animatable.View>
                        }
                    </View>
                }
                {validateUser ?
                    <View
                        style={styles.s32}>
                        <TouchableOpacity
                            onPress={() => (navigation.navigate('Home'))}
                            style={styles.s33}>
                            <Text
                                style={styles.s34}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBF00',
        width: '100%',
        height: '100%',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    s32: {
        // position: 'absolute',
        // padding: 15,
        marginTop: 20,
        bottom: 10,
        height: '11%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    s33: {
        width: '86%',
        height: '90%',
        backgroundColor: COLOURS.amber,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    s34: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    }
});