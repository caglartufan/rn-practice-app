import React, { useState, useReducer, useCallback } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import NativeTouchable from '../components/Primitives/NativeTouchable';
import Input from '../components/Primitives/Input';
import { BoldText, DefaultText } from '../components/Primitives/Typography';

import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_TYPE_CHANGE  = 'FORM_TYPE_CHANGE';

const formReducer = (state, action) => {
    switch(action.type) {
        case FORM_INPUT_UPDATE: {
            const updatedInputs = {
                ...state.inputs,
                [action.name]: {
                    value: action.value,
                    error: action.error
                }
            };
            let updatedIsFormValid = true;
            for(const inputName in updatedInputs) {
                updatedIsFormValid = updatedIsFormValid && !updatedInputs[inputName].error;
                if(!updatedIsFormValid) {
                    break;
                }
            }
            return {
                inputs: updatedInputs,
                isFormValid: updatedIsFormValid
            };
        } case FORM_TYPE_CHANGE: {
            let updatedInputs;
            if(action.changedTo === 'signup') {
                updatedInputs = {
                    ...state.inputs,
                    passwordAgain: {
                        value: '',
                        error: null
                    }
                };
            }
            if(action.changedTo === 'signin') {
                updatedInputs = { ...state.inputs };
                delete updatedInputs.passwordAgain;
            }
            return {
                ...state,
                inputs: updatedInputs
            };
        } default: {
            return state;
        }
    }
};

const Button = props => {
    return (
        <NativeTouchable style={styles.button} borderRadius={6} onPress={props.onPress}>
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

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputs: {
            email: {
                value: '',
                error: null
            },
            password: {
                value: '',
                error: null
            }
        },
        isFormValid: false
    });

    const formSubmitHandler = () => {
        // handle form submit
        console.log(formState);
    };

    const onInputChangeText = useCallback((name, value, error) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            name,
            value,
            error
        });
    }, [dispatchFormState]);

    const onFormTypeChange = () => {
        dispatchFormState({
            type: FORM_TYPE_CHANGE,
            changedTo: doShowLogin ? 'signup' : 'signin'
        });
        setDoShowLogin(prevState => !prevState);
    };

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
                    <Input
                        name='email'
                        placeholder='E-posta adresi'
                        inputChangeText={onInputChangeText}
                        containerStyle={styles.inputMainContainer}
                        textInputOutlineStyle={styles.inputShadow}
                        textInputContainerStyle={styles.inputContainer}
                        textInputStyle={styles.input}
                        required
                        email
                    />
                    <Input
                        name='password'
                        placeholder='Şifre'
                        inputChangeText={onInputChangeText}
                        containerStyle={styles.inputMainContainer}
                        textInputOutlineStyle={styles.inputShadow}
                        textInputContainerStyle={styles.inputContainer}
                        textInputStyle={styles.input}
                        required
                        minlength={5}
                        maxlength={30}
                    />
                    {doShowLogin === false && 
                        <Input
                            name='passwordAgain'
                            placeholder='Şifre tekrar'
                            inputChangeText={onInputChangeText}
                            containerStyle={styles.inputMainContainer}
                            textInputOutlineStyle={styles.inputShadow}
                            textInputContainerStyle={styles.inputContainer}
                            textInputStyle={styles.input}
                            required
                            minlength={5}
                            maxlength={30}
                        />
                    }
                </View>
                <Button
                    title={
                        doShowLogin
                            ? 'Giriş Yap'
                            : 'Kayıt Ol'
                    }
                    onPress={formSubmitHandler}
                />
                <View style={styles.otherOption}>
                    <DefaultText style={styles.textDescriptor}>
                        {
                            doShowLogin
                            ? 'Hesabın yok mu?'
                            : 'Zaten hesabın var mı?'
                        }
                    </DefaultText>
                    <Pressable onPress={onFormTypeChange}>
                        <BoldText style={styles.textLink}>
                            {
                                doShowLogin
                                    ? 'Kayıt Ol'
                                    : 'Giriş Yap'
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
    inputMainContainer: {
        marginBottom: 15
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