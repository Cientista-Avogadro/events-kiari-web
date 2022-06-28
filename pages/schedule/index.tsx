import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Text,
  Wrap,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BiChevronLeft, BiChevronRight, BiFilter } from 'react-icons/bi';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Content from '../../components/Content';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { Card } from '../../components/Card';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IinitialProps } from '../../store';

const Index: NextPage = () => {
  const { isOpen, cardDatas } = useSelector((state: IinitialProps) => state);
  const router = useRouter();
  const [close, setClose] = useState(true);
  const [selected, setSelected] = useState('');
  const [searched, setSearched] = useState('');
  const [lenght, setLenght] = useState(cardDatas?.length);

  console.log(cardDatas);

  return (
    <>
      <Head>
        <title>Event Page</title>
      </Head>
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
          <NavBar
            pathname={
              router.pathname.replace('/', '') === 'schedule'
                ? 'Agenda de Eventos'
                : ''
            }
          />
          <Content>
            <Flex h='90vh'>
              <Flex
                flexDir={'column'}
                width='100%'
                flex='3'
                px='30px'
                py='30px'
              >
                <Flex gap='12px'>
                  <Flex gap='10px' mb='45px'>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                      </InputLeftElement>
                      <Input
                        backgroundColor={'#fff'}
                        type='search'
                        placeholder='Pesquisar...'
                        onChange={e => setSearched(e.target.value)}
                      />
                    </InputGroup>
                    <Menu closeOnSelect={true}>
                      <MenuButton>
                        <Flex
                          display={'flex'}
                          flexDir={'row'}
                          justify='center'
                          align={'center'}
                        >
                          <BiFilter />
                          <Text>Filtrar</Text>
                        </Flex>
                      </MenuButton>
                      <MenuList minWidth='240px'>
                        <MenuOptionGroup
                          defaultValue=''
                          title='Ordenar Por'
                          type='radio'
                          onChange={e => setSelected(e.toString())}
                        >
                          <MenuItemOption value={''}>Nenhum</MenuItemOption>
                          {cardDatas?.map(types => (
                            <MenuItemOption key={types.id} value={types.buyied}>
                              {types.buyied}
                            </MenuItemOption>
                          ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Flex>
                <Flex gap='30px' flexDir={'column'}>
                  <Flex flexDir={'column'} rowGap='30px'>
                    <Text>Lista de Eventos ({lenght})</Text>
                    <SimpleGrid
                      spacing={'12px'}
                      gridTemplateColumns='repeat(3, 1fr)'
                    >
                      {cardDatas
                        ?.filter(item => item.title.includes(searched))
                        .map(item => (
                          <Card key={item.id} item={item} isReserved={true} />
                        ))}
                    </SimpleGrid>
                  </Flex>
                </Flex>
              </Flex>

              <Box
                my='20px'
                borderLeft={'1px solid #D6CACA'}
                width={!close ? '0' : ''}
                transition='flex 0.5s ease-out'
                flex={!close ? '0' : '1.2'}
              >
                <Flex align='center' position={'relative'}>
                  <Box
                    style={{
                      backgroundColor: '#512DA8',
                      borderRadius: '100%',
                      color: '#fff',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      left: '-30px',
                      zIndex: '10',
                      cursor: 'pointer',
                      top: !close ? '256px' : '256px',
                    }}
                    onClick={() => setClose(!close)}
                    title={!close ? 'open lateral box' : 'close lateral box'}
                  >
                    {close ? (
                      <BiChevronRight
                        style={{
                          color: '#fff',
                          fontSize: '28px',
                        }}
                      />
                    ) : (
                      <BiChevronLeft
                        style={{
                          color: '#fff',
                          fontSize: '28px',
                        }}
                      />
                    )}
                  </Box>
                  {/* 
                  <Divider backgroundColor='#C4C4C4' h={'2px'} width='98%' /> */}
                </Flex>
                {close && (
                  <Box mt={'20px'} p='10px 15px'>
                    <Heading
                      size={'md'}
                      display='flex'
                      justifyContent={'center'}
                      alignItems={'center'}
                      alignSelf={'center'}
                      mb='10px'
                    >
                      Cronograma de Eventos
                    </Heading>
                    <Box
                      bgColor={'#fff'}
                      width='full'
                      h='300px'
                      display='grid'
                      placeItems={'center'}
                      border='1px solid #eee'
                      borderRadius={'10px'}
                      mb='20px'
                    >
                      Date Time Picker
                    </Box>
                    <Flex flexDir='column' gap='20px'>
                      <Box
                        bgColor='#141414'
                        width='full'
                        height='76px'
                        borderRadius='8px'
                        display={'flex'}
                        alignItems='center'
                        px='20px'
                        gap='20px'
                        color={'#fff'}
                      >
                        <Heading size='md'>28</Heading>
                        <Divider
                          backgroundColor='#C4C4C4'
                          h={'70%'}
                          orientation='vertical'
                          width='1px'
                        />
                        <Flex gap='20px'>
                          <Flex flexDir={'column'}>
                            <Heading size='md'>O Recontro</Heading>
                            <Text fontSize={'12px'} color={'#EEEEEE'}>
                              Cientista Avogadro
                            </Text>
                          </Flex>
                          <Text fontSize={'12px'} color={'#EEEEEE'}>
                            09:00
                          </Text>
                        </Flex>
                      </Box>

                      <Box
                        bgColor='#141414'
                        width='full'
                        height='76px'
                        borderRadius='8px'
                        display={'flex'}
                        alignItems='center'
                        px='20px'
                        gap='20px'
                        color={'#fff'}
                      >
                        <Heading size='md'>28</Heading>
                        <Divider
                          backgroundColor='#C4C4C4'
                          h={'70%'}
                          orientation='vertical'
                          width='1px'
                        />
                        <Flex gap='20px'>
                          <Flex flexDir={'column'}>
                            <Heading size='md'>O Recontro</Heading>
                            <Text fontSize={'12px'} color={'#EEEEEE'}>
                              Cientista Avogadro
                            </Text>
                          </Flex>
                          <Text fontSize={'12px'} color={'#EEEEEE'}>
                            09:00
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Flex>
          </Content>
        </Flex>
      </Grid>
    </>
  );
};

export default Index;
