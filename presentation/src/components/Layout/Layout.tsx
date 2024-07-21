import React from 'react';
import './Layout.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function Layout(children: any) {
    const client = new ApolloClient({
        uri: 'http://localhost:5227/graphql/',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <div className='container'>
                {children}
            </div>
        </ApolloProvider>
    );
}

export default Layout;
