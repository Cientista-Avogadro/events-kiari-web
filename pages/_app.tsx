import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ChakraProvider, CircularProgress, CircularProgressLabel, Text, Box} from '@chakra-ui/react';
import {AuthProvider} from '../contexts/AuthContext';
import {Provider} from 'react-redux';
import store from '../store';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {delay} from "../services/auth";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleStartLoading = () => setLoading(true)
        const handleStopLoading = () => setLoading(false)

        delay(1500)
        router.events.on('routeChangeStart', handleStartLoading)

        router.events.on('routeChangeComplete', handleStopLoading)
        router.events.on('routeChangeError', handleStopLoading)

        return () => {
            router.events.off('routeChangeStart', handleStartLoading)
            router.events.off('routeChangeComplete', handleStopLoading)
            router.events.off('routeChangeError', handleStopLoading)
        }
    }, [router, loading])
    return (
        <Provider store={store}>
            <AuthProvider>
                <ChakraProvider>
                    {
                        loading ?
                            <Box display={'flex'} h={'100vh'}
                                 justifyContent={'center'}
                                 flexDir={'column'}
                                 alignItems={'center'}
                                 w={'100vw'}>
                                <CircularProgress isIndeterminate={true} size={'300px'} color='#512DA8'>
                                    <CircularProgressLabel
                                        display={'flex'}
                                        flexDir={'column'}
                                        justifyContent="center"
                                        alignItems={'center'}
                                        fontSize={'20px'}>
                                        <Text color='#512DA8'>KIARI-EVENTOS</Text>
                                    </CircularProgressLabel>

                                </CircularProgress>
                                <Text fontSize={'32px'} color='#512DA8'>Aproveita a Plataforma</Text>
                            </Box>
                            :
                            <Component {...pageProps} />
                    }
                </ChakraProvider>
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
