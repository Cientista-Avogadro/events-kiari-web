import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider, CircularProgress, CircularProgressLabel, Text, Box} from '@chakra-ui/react';
import {AuthProvider} from '../contexts/AuthContext';
import {Provider, useDispatch} from 'react-redux';
import store from '../store';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {delay} from "../services/auth";

function MyApp({Component, pageProps}: AppProps) {

    return (
        <Provider store={store}>
            <AuthProvider>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
