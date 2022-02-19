// export const SIGNUP = 'SIGNUP';
// export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE   = 'AUTHENTICATE';
export const LOGOUT         = 'LOGOUT';

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const APIKey = 'AIzaSyAjZTAOQXsEEmUtIzaoznQWle8iDSKj4zg';

            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if(!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                if(errorId === 'EMAIL_EXISTS') {
                    throw new Error('E-posta adresi kullanımda.');
                } else if(errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    throw new Error('Çok fazla denemede bulundunuz. Daha sonra tekrar deneyiniz.');
                } else {
                    throw new Error('Bir şeyler ters gitti.');
                }
            }

            const resData = await response.json();

            dispatch(
                authenticate(
                    resData.localId,
                    resData.idToken,
                    parseInt(resData.expiresIn) * 1000
                )
            );
        } catch(error) {
            throw error;
        }
    };
};

export const signin = (email, password) => {
    return async dispatch => {
        try {
            const APIKey = 'AIzaSyAjZTAOQXsEEmUtIzaoznQWle8iDSKj4zg';

            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            );

            if(!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                if(errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
                    throw new Error('Geçersiz e-posta adresi veya şifre.');
                } else {
                    throw new Error('Bir şeyler ters gitti!');
                }
            }

            const resData = await response.json();

            dispatch(
                authenticate(
                    resData.localId,
                    resData.idToken,
                    parseInt(resData.expiresIn) * 1000
                )
            );
        } catch(error) {
            throw error;
        }
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT
        });
    }
};