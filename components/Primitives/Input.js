import React, { useReducer, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { DefaultText, BoldText } from './Typography';

export const Errors = {
    REQUIRED: 'REQUIRED',
    MIN: 'MIN',
    MAX: 'MAX',
    MINLENGTH: 'MINLENGTH',
    MAXLENGTH: 'MAXLENGTH',
    EMAIL: 'EMAIL'
};

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_FOCUS  = 'INPUT_FOCUS';

const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                error: action.error
            }
        case INPUT_FOCUS:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    };
};

const Input = (
    {
        name,
        inputChangeText,
        containerStyle,
        labelContainerStyle,
        labelStyle,
        textInputOutlineStyle,
        textInputContainerStyle,
        textInputStyle,
        errorContainerStyle,
        errorStyle,
        ...props
    }
) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        error: null,
        touched: false
    });

    useEffect(() => {
        if(inputState.touched) {
            inputChangeText(name, inputState.value, inputState.error);
        }
    }, [name, inputState, inputChangeText]);

    const onChangeTextHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const dispatchInputChange = (error) => {
            dispatch({
                type: INPUT_CHANGE,
                value: text.trim(),
                error: error
            });
        };

        if(props.required && text.trim().length === 0) {
            return dispatchInputChange(Errors.REQUIRED);
        }
        if(props.min !== null && Number(text) < props.min) {
            return dispatchInputChange(Errors.MIN);
        }
        if(props.max !== null && Number(text) > props.max) {
            return dispatchInputChange(Errors.MAX);
        }
        if(props.minlength !== null && text.trim().length < props.minlength) {
            return dispatchInputChange(Errors.MINLENGTH);
        }
        if(props.maxlength !== null && text.trim().length > props.maxlength) {
            return dispatchInputChange(Errors.MAXLENGTH);
        }
        if(props.email && !emailRegex.test(text.trim().toLowerCase())) {
            return dispatchInputChange(Errors.EMAIL);
        }

        dispatchInputChange(null);
    };

    const onFocusHandler = () => {
        dispatch({
            type: INPUT_FOCUS
        });
    };

    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            {props.title && 
                <View style={{ ...styles.labelContainer, ...labelContainerStyle }}>
                    <BoldText style={{ ...styles.label, ...labelStyle }}>
                        {props.title}
                    </BoldText>
                </View>
            }
            <View style={{...styles.textOutline, ...textInputOutlineStyle }}>
                <View style={{ ...styles.textInputContainer, ...textInputContainerStyle }}>
                    <TextInput
                        style={{ ...styles.textInput, ...textInputStyle }}
                        value={inputState.value}
                        onChangeText={onChangeTextHandler}
                        onFocus={onFocusHandler}
                        {...props}
                    />
                </View>
            </View>
            <View style={{ ...styles.errorContainer, ...errorContainerStyle }}>
                <DefaultText style={{ ...styles.error, ...errorStyle }}>
                    {props.error || inputState.error || ' '}
                </DefaultText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    labelContainer: {
        marginBottom: 8
    },
    label: {

    },
    textOutline: {
        marginBottom: 5
    },
    textInputContainer: {

    },
    textInput: {

    },
    errorContainer: {

    },
    error: {
        color: 'red'
    }
});

export default Input;