import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { parseCookies } from 'nookies';
import { useSelector } from 'react-redux';
import { BarCharts } from '../components/BarCharts';
import Content from '../components/Content';
import { DashCard, IDashCard } from '../components/DashCard';
import { DoughnutCharts } from '../components/DoughnutCharts';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const isOpen = useSelector((state: any) => state.isOpen);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

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
      value: 1000,
      percentage: 12,
      showLastInfo: true,
      showPercentage: true,
    },
    {
      title: 'Events Buyied',
      value: 100,
      percentage: -12,
      showLastInfo: false,
      showPercentage: false,
      progressvalue: 50,
      showProgress: true,
    },
    {
      title: 'Total',
      value: 500,
      percentage: -12,
    },
  ];

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) router.push('/login');
  }, [user, loading, router]);

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
            <Flex gap='30px' wrap={'wrap'}>
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

            <Flex gap={'30px'} wrap='wrap'>
              <Box bgColor='#fff' p='30px' flex='1 0 0'>
                <BarCharts />
              </Box>
              <Box bgColor='#fff' p='30px' flex='1 0 0'>
                <DoughnutCharts />
              </Box>
            </Flex>
          </Flex>
        </Content>
      </Flex>
    </Grid>
  );
};

export default Home;
