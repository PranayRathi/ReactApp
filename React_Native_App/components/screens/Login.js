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
import { AsyncStorage } from 'react-native';
import { useTheme } from 'react-native-paper';
import { COLOURS, Items } from '../database/Database';

const Login = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        phoneNo: '',
        check_textInputChange: false,
        isValidUser: true,
    });

    const [isOTPEnter, setisOTPEnter] = React.useState(false);
    const [validateUser, setvalidateUser] = React.useState(false);
    const [Otp, setOtp] = React.useState('')
    const { colors } = useTheme();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoginData();
        });

        return unsubscribe;
    }, [navigation]);

    // const { signIn } = React.useContext(AuthContext);
    const setLoginData = () => {
        setData({
            ...data,
            username: '',
            phoneNo: '',
        });

        setisOTPEnter(false)
        setvalidateUser(false);
        setOtp('');
    }
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
                phoneNo: val,
            });
            setisOTPEnter(true)
            Alert.alert('OTP is 1234', `${data.username}, please use above otp for login`, [
                { text: 'Okay' }
            ]);
        } else {
            if (!isNaN(val)) {

                setData({
                    ...data,
                    phoneNo: val
                });
            } else if (isNaN(val)) {
                Alert.alert('Wrong Input!', 'Phone No should be digits only.', [
                    { text: 'Okay' }
                ]);
            }

        }
    }

    const loginHandle = async () => {

        if (!data.username) {
            Alert.alert('Wrong Input!', 'Please enter your Name.', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (data.username && data.phoneNo) {
            await AsyncStorage.setItem('UserName', JSON.stringify(data.username));
            await AsyncStorage.setItem('PhoneNo', JSON.stringify(data.phoneNo));
            setData({
                ...data,
                phoneNo: '',
            });

            setisOTPEnter(false)
            setvalidateUser(false);
            setOtp('');
            navigation.navigate('Home');
            return;
        }
    }

    const validateOTP = (otp) => {
        if (otp == 1234) {
            setOtp(otp);
            setvalidateUser(true);
        } else {
            setOtp(otp);
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
                        value={data.username}
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
                        value={data.phoneNo}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePhoneNoChange(val)}
                    />
                    {data.phoneNo.toString().length == 10 ?
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
                {data.phoneNo.toString().length == 10 || data.phoneNo.toString().length == 0 ? null :
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
                                secureTextEntry={true}
                                maxLength={4}
                                keyboardType='numeric'
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                value={Otp}
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
                            onPress={() => (loginHandle())}
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