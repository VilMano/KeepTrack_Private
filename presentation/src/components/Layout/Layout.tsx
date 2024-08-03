import React, { ReactNode, useContext } from 'react';
import './Layout.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { HomePage } from '../../pages/Homepage/Homepage';
import { Insert } from '../../pages/Insert/Insert';
import { UserContext } from '../../auth/UserContext';
import { Login } from '../../pages/Login/Login';

interface Props {
    children: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = (props: Props) => {
    const auth = useContext(UserContext);

    

    const client = new ApolloClient({
        uri: 'http://192.168.1.107:5126/graphql',
        cache: new InMemoryCache(),
        headers: {
            "Authorization": `Bearer ${window.sessionStorage.getItem('accessToken') ?? ""}`
        }
    });

    return (
        <ApolloProvider client={client}>
            <Router>
                {props.children}
                <Routes>
                    <Route path='/login' Component={Login}></Route>
                    <Route path='/' Component={HomePage} />
                    <Route path='/create' Component={Insert} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}