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

  const arrayPrivate = cardDatas
    ?.filter(item => item.type.includes(selected))
    .filter(item => item.title.includes(searched))
    .map(item => item);

  console.log(arrayPrivate);

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
            <Flex>
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
                      minChildWidth='353px'
                      spacing={'12px'}
                      width={''}
                    >
                      {cardDatas
                        ?.filter(
                          item =>
                            item?.buyied && item?.buyied.includes(selected)
                        )
                        .filter(item => item.title.includes(searched))
                        .map((item, index) => (
                          <Card
                            key={item?.id}
                            item={item}
                            isReserved={true}
                            index={index}
                          />
                        ))}
                    </SimpleGrid>
                  </Flex>
                </Flex>
              </Flex>

              <Box
                backgroundColor={'#F4F4F4'}
                p={!close ? '12px' : '12px'}
                width={!close ? '0' : ''}
                transition='flex 0.5s ease-out'
                flex={!close ? '0' : '1.2'}
              >
                <Grid
                  gap={isOpen ? '4px' : '4px'}
                  templateColumns='repeat(3, auto)'
                ></Grid>
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

                  <Divider backgroundColor='#C4C4C4' h={'2px'} width='98%' />
                </Flex>
                {close && (
                  <Box mt={'20px'}>
                    <Heading
                      size={'md'}
                      display='flex'
                      justifyContent={'center'}
                      alignItems={'center'}
                      alignSelf={'center'}
                    >
                      Localização no Mapa
                    </Heading>
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
