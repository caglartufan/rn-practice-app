import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Pressable,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import NativeTouchable from '../components/UI/NativeTouchable';
import { BoldText, DefaultText } from '../components/UI/Typography';

import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

const Input = props => {
    return (
        <View style={styles.inputShadow}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} {...props} />
            </View>
        </View>
    );
};

const Button = props => {
    return (
        <NativeTouchable style={styles.button} borderRadius={6}>
            <View style={styles.buttonContainer}>
                <BoldText style={styles.buttonText}>{props.title}</BoldText>
            </View>
        </NativeTouchable>
    );
};

const Auth = props => {
    const [doShowLogin, setDoShowLogin] = useState(true);
    const dispatch = useDispatch();

    const { userId, token } = useSelector(state => state.auth);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <DefaultText style={styles.title}>
                    {
                        doShowLogin
                            ? 'Mevcut Hesabına Bağlan'
                            : 'Yeni Hesap Oluştur'
                    }
                </DefaultText>
                <View style={styles.form}>
                    <Input placeholder='E-posta adresi' />
                    <Input placeholder='Şifre' />
                    {doShowLogin === false && <Input placeholder='Şifre tekrar' />}
                </View>
                <Button
                    title={
                        doShowLogin
                            ? 'Giriş Yap'
                            : 'Kayıt Ol'
                    }
                />
                <View style={styles.otherOption}>
                    <DefaultText style={styles.textDescriptor}>
                        {
                            doShowLogin
                            ? 'Zaten hesabın var mı?'
                            : 'Hesabın yok mu?'
                        }
                    </DefaultText>
                    <Pressable onPress={() => setDoShowLogin(prevState => !prevState)}>
                        <BoldText style={styles.textLink}>
                            {
                                doShowLogin
                                    ? 'Giriş Yap'
                                    : 'Kayıt Ol'
                            }
                        </BoldText>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width/8
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
        width: '100%'
    },
    form: {
        width: '100%'
    },
    inputShadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.26,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 6,
        borderColor: '#656566',
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    inputContainer: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: Colors.white
    },
    input: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        fontSize: 16
    },
    button: {
        width: '100%',
        backgroundColor: 'darkblue',
    },
    buttonText: {
        fontSize: 16,
        padding: 14,
        textAlign: 'center',
        color: Colors.white
    },
    otherOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    textDescriptor: {
        fontSize: 15,
        marginRight: 4
    },
    textLink: {
        fontSize: 15,
        color: 'darkblue'
    }
});

export default Auth;