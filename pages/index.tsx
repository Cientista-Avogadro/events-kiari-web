import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { parseCookies } from 'nookies';
import { useSelector } from 'react-redux';
import Content from '../components/Content';
import { DashCard, IDashCard } from '../components/DashCard';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Home: NextPage = () => {
  const isOpen = useSelector((state: any) => state.isOpen);

  const dashCards: IDashCard[] = [
    {
      title: 'Orders',
      value: 10000,
      percentage: -1,
      showLastInfo: true,
      showPercentage: true,
    },
    {
      title: 'Total Events',
      value: 10000,
      percentage: 12,
      showLastInfo: true,
      showPercentage: true,
    },
    {
      title: 'Events Buyied',
      value: 10000,
      percentage: -12,
      showLastInfo: false,
      showPercentage: false,
      progressvalue: 50,
      showProgress: true,
    },
    {
      title: 'Total',
      value: 10000,
      percentage: -12,
    },
  ];

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
      <SideBar />
      <Flex flexDir={'column'}>
        <NavBar pathname='dashboard' />
        <Content>
          <Flex flexDir={'column'} rowGap='50px' px='30px' py='30px'>
            <Flex gap='10px' wrap={'wrap'}>
              {dashCards.map((item, i: number) => (
                <DashCard
                  key={i}
                  title={item.title}
                  value={item.value}
                  percentage={item.percentage}
                  showLastInfo={item.showLastInfo}
                  progressvalue={item.progressvalue}
                  showProgress={item?.showProgress}
                  showPercentage={item.showPercentage}
                />
              ))}
            </Flex>
          </Flex>
        </Content>
      </Flex>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['@RNAuth:token']: token } = parseCookies(ctx);
  const { ['@RNAuth:user']: user } = parseCookies(ctx);
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
