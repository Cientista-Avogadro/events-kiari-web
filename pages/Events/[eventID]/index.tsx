import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Tooltip,
  Image,
  Divider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';
import Content from '../../../components/Content';
import React, { useEffect, useState } from 'react';
import { IinitialProps } from '../../../store';
import {
  BiCalendarEvent,
  BiChevronLeft,
  BiChevronRight,
  BiEdit,
} from 'react-icons/bi';
import { AiFillEye, AiFillHeart } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoCubeSharp } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { EditIcon } from '@chakra-ui/icons';
import { MdDelete, MdOutlineGpsFixed } from 'react-icons/md';
import { VscRepoPush } from 'react-icons/vsc';
import { CustomChart } from '../../../components/Charts';
import { CustomCircularProgesss } from '../../../components/CustomCircularProgesss';
import { format } from 'date-fns';

type Inputs = {
  name: string;
  price: string;
  description: string;
};

const Index: NextPage = () => {
  const { isOpen, currentCard, loading } = useSelector(
    (state: IinitialProps) => state
  );
  const { isOpen: open, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [close, setClose] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>{currentCard?.title}</title>
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
            pathname={router.pathname
              .replace('/', '')
              .replace('[eventID]', currentCard ? currentCard?.title : '')}
          />
          <Content>
            {loading && <CustomCircularProgesss />}
            <Flex>
              <Box
                px='30px'
                py='30px'
                w={'100%'}
                display='flex'
                flexDir={'column'}
              >
                <Flex
                  align='center'
                  justifyContent={'space-between'}
                  w={'100%'}
                >
                  <Flex>
                    <Heading size={'md'}>{currentCard?.title}</Heading>
                    <Tooltip label={currentCard?.id}>
                      <Box p='1'>
                        <Tag>ID {currentCard?.id.substring(0, 8)}</Tag>
                      </Box>
                    </Tooltip>
                  </Flex>
                  <Flex gap={'10px'}>
                    <Flex display='flex' alignItems={'center'}>
                      <Text fontSize={'20px'}>
                        <AiFillHeart />
                      </Text>
                      <Text>30</Text>
                    </Flex>
                    <Flex display='flex' alignItems={'center'}>
                      <Text fontSize={'20px'}>
                        <AiFillEye />
                      </Text>
                      <Text>30k</Text>
                    </Flex>
                    <Text
                      fontSize={'20px'}
                      display='flex'
                      alignItems={'center'}
                    >
                      <BiEdit />
                    </Text>
                    <Button
                      onClick={() => router.push(currentCard?.id + '/Reservas')}
                      leftIcon={<IoCubeSharp />}
                      bgColor='rgba(81, 45, 168, 0.7)'
                      color={'#fff'}
                      _hover={{ backGroundColor: '#512DA8' }}
                      _active={{ backGroundColor: '#512DA8' }}
                    >
                      Reserva
                    </Button>
                    <Menu>
                      <MenuButton
                        transition='all 0.2s'
                        _focus={{ boxShadow: 'none' }}
                        transform={'rotate(90deg)'}
                      >
                        <BsThreeDots />
                      </MenuButton>
                      <MenuList bgColor={'#512DA8'} minW='120px' padding={0}>
                        <MenuItem display={'flex'} alignItems='center'>
                          <HStack display={'flex'} alignItems='center'>
                            <EditIcon />
                            <Text>Editar</Text>
                          </HStack>
                        </MenuItem>
                        <MenuItem display={'flex'} alignItems='center'>
                          <HStack display={'flex'} alignItems='center'>
                            <MdDelete />
                            <Text>Eliminar</Text>
                          </HStack>
                        </MenuItem>
                        <MenuItem display={'flex'} alignItems='center'>
                          <HStack display={'flex'} alignItems='center'>
                            <VscRepoPush />
                            <Text>Reservas</Text>
                          </HStack>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Flex>
                <Grid
                  gridTemplateColumns={'repeat(2,1fr)'}
                  gridTemplateRows={'auto auto'}
                  columnGap={'10px'}
                >
                  <Image
                    src={currentCard?.img}
                    alt={'description card image'}
                  />
                  <Text>{currentCard?.description}</Text>
                  <Flex flexDir={'column'}>
                    <HStack display={'flex'} alignItems='center'>
                      <BiCalendarEvent />
                      <Text fontSize={'16px'}>{currentCard?.data}</Text>
                    </HStack>
                    <HStack display={'flex'} alignItems='center' mb={'20px'}>
                      <MdOutlineGpsFixed />
                      <Text fontSize={'16px'}>{currentCard?.localization}</Text>
                    </HStack>
                  </Flex>
                </Grid>
                <Divider
                  backgroundColor='#C4C4C4'
                  h={'2px'}
                  width='98%'
                  mb={'40px'}
                />
                <Box>
                  <Heading size={'md'}>Preçário</Heading>
                  <Flex mb={'34px'} align='center' justify='space-between'>
                    <Heading
                      size={'sm'}
                      fontWeight={'normal'}
                      mt={'15px'}
                      color={'#C5C7CD'}
                    >
                      Adicionar Ingresso
                    </Heading>
                    <Box
                      backgroundColor={'#512DA8'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      p={'10px'}
                      borderRadius={'5px'}
                      cursor={'pointer'}
                    >
                      <FaPlus
                        style={{
                          color: '#fff',
                          fontSize: '15px',
                        }}
                        onClick={onOpen}
                      />
                      <Modal isOpen={open} onClose={onClose} size={'lg'}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Adicionar Ingresso</ModalHeader>
                            <ModalCloseButton />

                            <ModalBody pb={6}>
                              <Flex gap='10px' pb={'10px'}>
                                <FormControl>
                                  <FormLabel>Nome</FormLabel>
                                  <Input
                                    aria-invalid={
                                      errors.name ? 'true' : 'false'
                                    }
                                    placeholder='Nome do Ingresso'
                                    {...register('name', {
                                      required: true,
                                      minLength: 10,
                                    })}
                                  />
                                  {errors.name && (
                                    <i style={{ color: 'red' }}>
                                      is required an name min 10 char
                                    </i>
                                  )}
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Preço</FormLabel>
                                  <Input
                                    placeholder='Preço'
                                    {...register('price', {
                                      required: true,
                                      pattern: /^[0-9]+/,
                                      min: 500,
                                    })}
                                  />
                                  {errors.price && (
                                    <i style={{ color: 'red' }}>
                                      only numbers max 500
                                    </i>
                                  )}
                                </FormControl>
                              </Flex>

                              <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Textarea
                                  placeholder='Descrição do Ingresso'
                                  {...register('description', {
                                    required: true,
                                    minLength: 10,
                                  })}
                                />
                                {errors.description && (
                                  <i style={{ color: 'red' }}>
                                    is required description min 10 char
                                  </i>
                                )}
                              </FormControl>
                            </ModalBody>

                            <ModalFooter alignSelf={'flex-start'}>
                              <Button
                                bgColor='#512DA8'
                                color='#fff'
                                _focus={{
                                  backgroundColor: 'none',
                                  boxShadow: 'none',
                                }}
                                _active={{ backGroundColor: 'none' }}
                                _hover={{ backgroundColor: 'none' }}
                                mr={3}
                                type='submit'
                              >
                                Adicionar
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </form>
                      </Modal>
                    </Box>
                  </Flex>
                  <Table>
                    <Thead borderBottom={'2px solid #DFE0EB'}>
                      <Tr>
                        <Th color={'#9FA2B4'}>Ingresso</Th>
                        <Th color={'#9FA2B4'}>Preço</Th>
                        <Th color={'#9FA2B4'}>Descrição</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr borderBottom={'1.1px solid #DFE0EB'}>
                        <Td>Preço Individual</Td>
                        <Td>2.000 kz</Td>
                        <Td>Sem descrição</Td>
                        <Td textAlign={'right'}>
                          <Menu>
                            <MenuButton
                              transition='all 0.2s'
                              _focus={{ boxShadow: 'none' }}
                              transform={'rotate(90deg)'}
                            >
                              <BsThreeDots />
                            </MenuButton>
                            <MenuList
                              bgColor={'#512DA8'}
                              minW='120px'
                              padding={0}
                            >
                              <MenuItem display={'flex'} alignItems='center'>
                                <HStack display={'flex'} alignItems='center'>
                                  <EditIcon />
                                  <Text>Editar</Text>
                                </HStack>
                              </MenuItem>
                              <MenuItem display={'flex'} alignItems='center'>
                                <HStack display={'flex'} alignItems='center'>
                                  <MdDelete />
                                  <Text>Eliminar</Text>
                                </HStack>
                              </MenuItem>
                              <MenuItem display={'flex'} alignItems='center'>
                                <HStack display={'flex'} alignItems='center'>
                                  <VscRepoPush />
                                  <Text>Reservas</Text>
                                </HStack>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
              <Box
                backgroundColor={'#F4F4F4'}
                p={!close ? '0' : '14px'}
                width={!close ? '0' : ''}
              >
                <Grid gap={'4px'} templateColumns='repeat(3, 1fr)'>
                  <Box
                    bgColor={'#fff'}
                    w={'110px'}
                    h={'65px'}
                    display={'flex'}
                    flexDir={'column'}
                    alignItems='center'
                    border={'1px solid #492F86'}
                    cursor='pointer'
                    justifyContent='center'
                    borderRadius={'8'}
                  >
                    <Text>Reservas</Text>
                    <Text fontWeight={'bold'}>60</Text>
                  </Box>
                  <Box
                    bgColor={'#fff'}
                    w={'110px'}
                    h={'65px'}
                    display={'flex'}
                    flexDir={'column'}
                    alignItems='center'
                    border={'1px solid #492F86'}
                    cursor='pointer'
                    justifyContent='center'
                    borderRadius={'8'}
                  >
                    <Text>Reservas</Text>
                    <Text fontWeight={'bold'}>60</Text>
                  </Box>
                  <Box
                    bgColor={'#fff'}
                    w={'110px'}
                    h={'65px'}
                    display={'flex'}
                    flexDir={'column'}
                    alignItems='center'
                    border={'1px solid #492F86'}
                    cursor='pointer'
                    justifyContent='center'
                    borderRadius={'8'}
                  >
                    <Text>Reservas</Text>
                    <Text fontWeight={'bold'}>60</Text>
                  </Box>
                </Grid>
                <CustomChart />
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
                      top: !close ? '-30vh' : '',
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
                    Sem Dados
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
