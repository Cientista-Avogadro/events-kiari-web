import { Container, Flex, Grid, Heading } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Content from '../components/Content';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { AuthContext } from '../contexts/AuthContext';

const Events: NextPage = () => {
  const { user } = useContext(AuthContext);
  const isOpen = useSelector((state: any) => state.isOpen);

  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  const handleSignOut = () => {
    destroyCookie(null, 'nextauth.token');
    Router.push('/login');
  };
  return (
    <Grid
      h='100vh'
      templateColumns={{ base: !isOpen ? '260px auto' : 'auto' }}
      templateRows='repeat(1, 1fr)'
    >
      <SideBar />
      <Flex flexDir={'column'}>
        <NavBar pathname='dashboard' />
        <Content />
      </Flex>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
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

export default Events;
