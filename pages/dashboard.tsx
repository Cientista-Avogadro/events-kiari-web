import { Button, Container, Heading, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    destroyCookie(null, 'nextauth.token');
    Router.push('/login');
  };

  return (
    <Container
      maxW='full'
      h={'100vh'}
      px={0}
      display='flex'
      justifyContent='center'
      alignItems={'center'}
      flexDir='column'
      gap='10'
    >
      <Heading>
        Seja bem vindo <span style={{ color: 'purple' }}>{user?.name}</span>
      </Heading>
      <Image src={user?.avatarUrl} alt='user avatar github' />
      <Text color={'purple.900'}>{user?.email}</Text>
      <Button onClick={handleSignOut}>Log Out</Button>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  console.log(token);
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

export default Dashboard;
