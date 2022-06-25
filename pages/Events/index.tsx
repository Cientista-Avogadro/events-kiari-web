import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Grid,
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
import { BiFilter } from 'react-icons/bi';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Content from '../../components/Content';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { Card } from '../../components/Card';
import Head from 'next/head';
import { cardDatas } from '../../services/Card';
import { useState } from 'react';

const Index: NextPage = () => {
  const isOpen = useSelector((state: any) => state.isOpen);
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [searched, setSearched] = useState('');

  const arrayPrivate = cardDatas
    .filter(item => item.type.includes(selected))
    .filter(item => item.title.includes(searched))
    .filter(item => item.state == 'private');

  const arrayPublic = cardDatas
    .filter(item => item.type.includes(selected))
    .filter(item => item.title.includes(searched))
    .filter(item => item.state == 'public');

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
          <NavBar pathname={router.pathname.replace('/', '')} />
          <Content>
            <Flex flexDir={'column'} rowGap='50px' px='30px' py='30px'>
              <Flex
                justify={'space-between'}
                width='full'
                wrap={'wrap'}
                gap='12px'
              >
                <Flex align={'center'} gap='10px'>
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
                        title='Order'
                        type='radio'
                        onChange={e => setSelected(e.toString())}
                      >
                        <MenuItemOption value=''>Nenhum</MenuItemOption>
                        {cardDatas.map(types => (
                          <MenuItemOption key={types.id} value={types.type}>
                            {types.type}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex align={'center'} gap='12px'>
                  <Wrap display={'flex'}>
                    <IoHelpCircleOutline fontSize={'20px'} />
                    <Text>Ajuda</Text>
                  </Wrap>
                  <Button
                    bgColor='#512DA8'
                    color={'#fff'}
                    _hover={{ backgroundColor: '#512DA0ff' }}
                    _active={{ backgroundColor: '#512DA0ff' }}
                  >
                    Adicionar Evento
                  </Button>
                </Flex>
              </Flex>
              <Flex gap='30px' flexDir={'column'}>
                <Flex flexDir={'column'} rowGap='30px'>
                  <Text>
                    Eventos Públicos (
                    {arrayPublic.filter(item => item.state == 'public').length})
                  </Text>
                  <SimpleGrid
                    minChildWidth='353px'
                    spacing={'12px'}
                    width={arrayPublic.length <= 1 ? '395px' : ''}
                  >
                    {cardDatas
                      .filter(item => item.type.includes(selected))
                      .filter(item => item.title.includes(searched))
                      .map(
                        item =>
                          item.state == 'public' && (
                            <Card key={item.id} item={item} />
                          )
                      )}
                  </SimpleGrid>
                </Flex>
                <Flex flexDir={'column'} rowGap='30px'>
                  <Text>
                    Eventos Privados (
                    {arrayPublic.filter(item => item.state == 'private').length}
                    )
                  </Text>
                  <SimpleGrid
                    minChildWidth='353px'
                    spacing={'12px'}
                    width={arrayPrivate.length <= 1 ? '395px' : ''}
                  >
                    {cardDatas
                      .filter(item => item.type.includes(selected))
                      .filter(item => item.title.includes(searched))
                      .map(
                        item =>
                          item.state == 'private' && (
                            <Card key={item.id} item={item} />
                          )
                      )}
                  </SimpleGrid>
                </Flex>
              </Flex>
            </Flex>
          </Content>
        </Flex>
      </Grid>
    </>
  );
};

export default Index;
