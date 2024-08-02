import { useMemo, useEffect, useReducer, useCallback, useState } from 'react';

import { UserContext } from './UserContext';
import { setSession, isValidToken, getSession } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from './types';
import axios from 'axios';
import { Console } from 'console';

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
        user: AuthUserType;
    };
    [Types.LOGIN]: {
        user: AuthUserType;
    };
    [Types.REGISTER]: {
        user: AuthUserType;
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

const reducer = (state: AuthStateType, action: ActionsType) => {
    if (action.type === Types.INITIAL) {
        return {
            ...state
        };
    }
    if (action.type === Types.LOGIN) {
        return {
            ...state
        };
    }

    return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const token = window.sessionStorage.getItem('accessToken');
            const claims = getSession('accessToken');

            // fetch all info for the logged in user
            const userFetched = await axios.get(process.env.REACT_APP_AUTH + `/user/user/${claims.id!}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const user = userFetched.data;

            dispatch({
                type: Types.INITIAL,
                payload: {
                    user: {
                        user: user,
                        token: token
                    },
                },
            });
        } catch (error) {
            console.log("error: ", error)
            if (window.location.href != "http://localhost:3000/login")
                window.location.href = "http://localhost:3000/login"

            dispatch({
                type: Types.INITIAL,
                payload: {
                    user: null,
                },
            });
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


                const { token, id } = res.data;
                // fetch all info for logged in user
                const userFetched = await axios.get(process.env.REACT_APP_AUTH + `/user/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const user = userFetched.data;

                setSession(token);

                dispatch({
                    type: Types.LOGIN,
                    payload: {
                        user: {
                            user: user,
                            token: token
                        },
                    },
                });
                console.log("data inserted #2: ", state)
            } catch (error) {
                console.log("##### ERROR #2: ", error);
            }

        },
        [dispatch]
    );

    // REGISTER
    const register = useCallback(async (name: string, email: string, password: string) => {
        //     const data = new FormData();
        //     data.append('name', name);
        //     data.append('email', email);
        //     data.append('password', password);

        //     const res = await axios.post(endpoints.auth.register, data);

        //     const { accessToken, user } = res.data;
        //     sessionStorage.setItem(STORAGE_KEY, accessToken);

        //     // dispatch({
        //     //   type: Types.REGISTER,
        //     //   payload: {
        //     //     user: {
        //     //       ...user,
        //     //       accessToken,
        //     //     },
        //     //   },
        //     // });
        //   }, []);

        //   // RESETPASSWORD
        //   const resetPassword = useCallback(async (email: string, token: string, password: string) => {
        //     const data = new FormData();
        //     data.append('email', email);
        //     data.append('token', token);
        //     data.append('password', password);
        //     const res = await axios.post(endpoints.auth.resetPassword, data);

        //     dispatch({
        //       type: Types.RESETPASSWORD,
        //       payload: {
        //         user: undefined,
        //       },
        //     });
    }, []);

    // RESETPASSWORD
    const recoverPassword = useCallback(async (email: string) => {
        // const data = new FormData();
        // data.append('email', email);
        // const res = await axios.post(endpoints.auth.recoverPassword, data);

        // dispatch({
        //   type: Types.RECOVERPASSWORD,
        //   payload: {
        //     user: undefined,
        //   },
        // });
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        // setSession(null);
        // dispatch({
        //   type: Types.LOGOUT,
        // });
        // setCheckAuthenticated('unauthenticated');
    }, [dispatch]);

    useEffect(() => {
        setCheckAuthenticated(state.user ? 'authenticated' : 'unauthenticated');
    }, [state.user]);

    // CONFIRMEMAIL
    const confirmRegister = useCallback(async (email: string, token: string) => {
        // const data = new FormData();
        // data.append('email', email);
        // data.append('token', token);

        // const res = await axios.post(endpoints.auth.confirmEmail, data);

        // dispatch({
        //   type: Types.RECOVERPASSWORD,
        //   payload: {
        //     user: undefined,
        //   },
        // });
    }, []);

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            method: 'jwt',
            authenticated: state.user != null,
            login,
            register,
            recoverPassword,
            confirmRegister,
            logout,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [login, logout, state.user]
    );

    return <UserContext.Provider value={memoizedValue}>{children}</UserContext.Provider>;
}
