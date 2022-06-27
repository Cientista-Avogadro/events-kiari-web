import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  Wrap,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BiFilter, BiImageAdd } from 'react-icons/bi';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../../components/Content';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { Card } from '../../components/Card';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllEvents } from '../../helpers/EventCrud';
import { ICardProps } from '../../types/events.type';
import { IinitialProps } from '../../store';
import { ModalForm } from '../../components/ModalForm';

const Index: NextPage = () => {
  const [publicPageNumber, setPublicPageNumber] = useState(0);

  const [selected, setSelected] = useState('');
  const [searched, setSearched] = useState('');
  const [currentPublicItems, setCurrentPublicItems] = useState<
    ICardProps[] | undefined
  >([]);
  const [currentPrivateItems, setCurrentPrivateItems] = useState<
    ICardProps[] | undefined
  >([]);
  const [privatePageNumber, setPrivatePageNumber] = useState(0);

  const { isOpen, cardDatas } = useSelector((state: IinitialProps) => state);
  const { isOpen: open, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();

  const usersPerPage = 6;
  const publicPagesVisited = publicPageNumber * usersPerPage;
  const privatePagesVisited = privatePageNumber * usersPerPage;

  const arrayPublic = cardDatas
    ?.filter(({ state }) => state.includes(selected))
    .filter(({ title }) => title.includes(searched))
    .slice(publicPagesVisited, publicPagesVisited + usersPerPage)
    .filter(({ state }) => state == 'public');

  const arrayPrivate = cardDatas
    ?.filter(({ state }) => state.includes(selected))
    .filter(({ title }) => title.includes(searched))
    .slice(privatePagesVisited, privatePagesVisited + usersPerPage)
    .filter(({ state }) => state == 'private');

  const publicPageCount = Math.ceil(
    currentPublicItems ? currentPublicItems?.length : 0 / usersPerPage
  );
  const privatePageCount = Math.ceil(
    currentPrivateItems ? currentPrivateItems?.length : 0 / usersPerPage
  );

  useEffect(() => {
    getAllEvents().then((res: ICardProps[]) => {
      dispatch({ type: 'set', cardDatas: res });
    });
    setCurrentPublicItems(arrayPublic?.slice(0, 50));
    setCurrentPrivateItems(arrayPrivate?.slice(0, 50));
  }, [dispatch, arrayPublic, arrayPrivate]);

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
                        <MenuItemOption value={'public'}>
                          Público
                        </MenuItemOption>
                        <MenuItemOption value={'private'}>
                          Privado
                        </MenuItemOption>
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
                    onClick={onOpen}
                  >
                    Adicionar Evento
                  </Button>
                  <ModalForm
                    onClose={onClose}
                    onOpen={onOpen}
                    open={open}
                    type='add'
                  />
                </Flex>
              </Flex>
              <Flex gap='30px' flexDir={'column'}>
                <Flex flexDir={'column'} rowGap='30px'>
                  <Text>Eventos Públicos ({arrayPublic?.length})</Text>
                  <SimpleGrid
                    spacing={'12px'}
                    gridTemplateColumns='repeat(3, 1fr)'
                  >
                    {currentPublicItems
                      ?.filter(({ state }) => state.includes(selected))
                      .filter(({ title }) => title.includes(searched))
                      .slice(
                        publicPagesVisited,
                        publicPagesVisited + usersPerPage
                      )
                      .map((item, index) => (
                        <Card key={item.id} item={item} index={index} />
                      ))}
                  </SimpleGrid>
                  <Flex align={'center'} justify='center'>
                    <ReactPaginate
                      pageCount={publicPageCount}
                      onPageChange={({ selected }) =>
                        setPublicPageNumber(selected)
                      }
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      containerClassName={'paginationBtns'}
                      previousLinkClassName={'previousBtns'}
                      pageLinkClassName={'nextBtn'}
                      disabledClassName={'paginationDisabled'}
                      activeClassName={'paginationActive'}
                    />
                  </Flex>
                </Flex>
                <Flex flexDir={'column'} rowGap='30px'>
                  <Text>Eventos Privados ({arrayPrivate?.length})</Text>
                  <SimpleGrid
                    spacing={'12px'}
                    gridTemplateColumns='repeat(3, 1fr)'
                  >
                    {currentPrivateItems
                      ?.filter(({ state }) => state.includes(selected))
                      .filter(({ title }) => title.includes(searched))
                      .slice(
                        privatePagesVisited,
                        privatePagesVisited + usersPerPage
                      )
                      .map((item, index) => (
                        <Card key={item.id} item={item} index={index} />
                      ))}
                  </SimpleGrid>
                  <Flex align={'center'} justify='center'>
                    <ReactPaginate
                      pageCount={privatePageCount}
                      onPageChange={({ selected }) =>
                        setPrivatePageNumber(selected)
                      }
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      containerClassName={'paginationBtns'}
                      previousLinkClassName={'previousBtns'}
                      pageLinkClassName={'nextBtn'}
                      disabledClassName={'paginationDisabled'}
                      activeClassName={'paginationActive'}
                    />
                  </Flex>
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
