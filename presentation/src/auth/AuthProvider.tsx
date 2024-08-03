import { useMemo, useEffect, useReducer, useCallback, useState } from 'react';

import { UserContext } from './UserContext';
import { setSession, isValidToken, getSession, setLocalStorage } from './utils';
import { ActionMapType, AuthStateType } from './types';
import axios from 'axios';

enum Types {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESETPASSWORD = 'RESETPASSWORD',
    RECOVERPASSWORD = 'RECOVERPASSWORD',
    LOGOUT = 'LOGOUT',
}

type Payload = {
    [Types.INITIAL]: {
        user: AuthStateType;
    };
    [Types.LOGIN]: {
        user: AuthStateType;
    };
    [Types.REGISTER]: {
        user: AuthStateType;
    };
    [Types.RESETPASSWORD]: {
        user: undefined;
    };
    [Types.RECOVERPASSWORD]: {
        user: undefined;
    };
    [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
    user: null!,
    token: "",
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useState<AuthStateType>();
    const [ returnUrl, setReturnUrl ] = useState<string>('/');

    const initialize = useCallback(async () => {
        try {
            const token = window.sessionStorage.getItem('accessToken')!;
            if (token.length > 0) {
                const claims = getSession(token!);

                // fetch all info for the logged in user
                const userFetched = await axios.get(process.env.REACT_APP_AUTH + `/user/user/${claims.id!}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const user = userFetched.data;
                dispatch({
                    user,
                    token
                });
            }

        } catch (error) {
            console.log("error: ", error)
            if (window.location.href != "http://localhost:3000/login")
                window.location.href = "http://localhost:3000/login"
        }
    }, []);

    const [checkAuthenticated, setCheckAuthenticated] = useState('');

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = useCallback(
        async (username: string, password: string) => {
            try {
                //authenticate the user with username and password
                const res = await axios.post(process.env.REACT_APP_AUTH + "/user/authenticate", null, {
                    params: {
                        username,
                        password
                    }
                });


                const { token } = res.data;
                if (token.length > 0) {
                    // get user claims
                    const claims = getSession(token!);

                    // fetch all info for logged in user
                    const userFetched = await axios.get(process.env.REACT_APP_AUTH + `/user/user/${claims.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    const user = userFetched.data;


                    setSession(token);
                    setLocalStorage('login', JSON.stringify({ id: user.id, name: user.name}));

                    dispatch({
                        user,
                        token: token!
                    });

                }
            } catch (error) {
                console.log("##### ERROR #2: ", error);
            }

        },
        [dispatch]
    );

    // LOGOUT
    const logout = useCallback(async () => {
        setSession(null);

        dispatch({
            user: null!,
            token: ""
        });
    }, [dispatch]);

    const memoizedValue = useMemo(
        () => ({
            user: state!,
            method: 'jwt',
            authenticated: state?.user != null,
            login,
            logout,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [login, logout, state]
    );

    return <UserContext.Provider value={memoizedValue}>{children}</UserContext.Provider>;
}
