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
import Content from '../components/Content';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { Card } from '../components/Card';

const Events: NextPage = () => {
  const isOpen = useSelector((state: any) => state.isOpen);
  const router = useRouter();

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
        <NavBar pathname={router.pathname.replace('/', '')} />
        <Content>
          <Flex flexDir={'column'} rowGap='50px'>
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
                  <Input type='search' placeholder='Pesquisar...' />
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
                      defaultValue='asc'
                      title='Order'
                      type='radio'
                    >
                      <MenuItemOption value='asc'>Ascending</MenuItemOption>
                      <MenuItemOption value='desc'>Descending</MenuItemOption>
                    </MenuOptionGroup>
                    <MenuDivider />
                    <MenuOptionGroup title='Events Category' type='checkbox'>
                      <MenuItemOption value='email'>House Party</MenuItemOption>
                      <MenuItemOption value='phone'>Revellion</MenuItemOption>
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
                  _hover={{ backGroundColor: '#512DA0ff' }}
                  _active={{ backGroundColor: '#512DA0ff' }}
                >
                  Adicionar Evento
                </Button>
              </Flex>
            </Flex>
            <Flex gap='30px' flexDir={'column'}>
              <Flex flexDir={'column'} rowGap='30px'>
                <Text>Eventos Públicos (3)</Text>
                <SimpleGrid minChildWidth='353px' spacing={'12px'}>
                  <Card />
                  <Card />
                  <Card />
                </SimpleGrid>
              </Flex>
              <Flex flexDir={'column'} rowGap='30px'>
                <Text>Eventos Públicos (3)</Text>
                <SimpleGrid minChildWidth='353px' spacing={'12px'}>
                  <Card />
                  <Card />
                  <Card />
                </SimpleGrid>
              </Flex>
            </Flex>
          </Flex>
        </Content>
      </Flex>
    </Grid>
  );
};

export default Events;
