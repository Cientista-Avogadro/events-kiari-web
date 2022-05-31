import {Flex, Grid} from '@chakra-ui/react';
import type {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';

import {parseCookies} from 'nookies';
import {useSelector} from 'react-redux';
import Content from '../components/Content';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Home: NextPage = () => {
    const router = useRouter();
    const isOpen = useSelector((state: any) => state.isOpen);

    if (router.isFallback) {
        return <h1>loading</h1>;
    }

    return (
        <Grid
            h='100vh'
            templateColumns={{
                base: 'auto',
                lg: !isOpen ? '260px auto' : '76px auto',
                md: !isOpen ? '260px auto' : '76px auto',
                sm: 'auto',
            }}
            templateRows='repeat(1, 1fr)'
        >
            <SideBar/>
            <Flex flexDir={'column'}>
                <NavBar pathname='dashboard'/>
                <Content></Content>
            </Flex>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const {['@RNAuth:token']: token} = parseCookies(ctx);
    const {['@RNAuth:user']: user} = parseCookies(ctx);
    if (!token || !user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default Home;
