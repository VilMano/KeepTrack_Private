import React, { ReactNode } from 'react';
import './Layout.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface Props {
    children: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = (props: Props) => {
    const client = new ApolloClient({
        uri: 'http://localhost:5126/graphql',
        cache: new InMemoryCache(),
        headers: {
            "X-API-Key": process.env.REACT_APP_API_KEY!
        }
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}