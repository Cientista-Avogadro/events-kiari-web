import type {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
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
    Th, Tbody, Td, InputGroup, InputLeftElement, Input, MenuOptionGroup, MenuItemOption, MenuDivider
} from "@chakra-ui/react";
import SideBar from "../../../components/SideBar";
import NavBar from "../../../components/NavBar";
import Content from "../../../components/Content";
import React, {useEffect, useState} from "react";
import {IinitialProps} from '../../../store';
import {BiCalendarEvent, BiChevronLeft, BiChevronRight, BiEdit, BiFilter} from "react-icons/bi";

import {BsThreeDots} from "react-icons/bs";
import {ArrowBackIcon, ArrowForwardIcon, EditIcon, PlusSquareIcon, SearchIcon} from "@chakra-ui/icons";
import {MdDelete} from "react-icons/md";
import {VscRepoPush} from "react-icons/vsc";
import {CustomChart} from "../../../components/Charts";
import { AiFillEye, AiFillHeart } from 'react-icons/ai';


const Reservas: NextPage = () => {
    const isOpen = useSelector((state: IinitialProps) => state.isOpen);
    const currentCard = useSelector((state: IinitialProps) => state.currentCard);
    const router = useRouter();
    const [close, setClose] = useState(false);


    return (
        <>
            <Head>
                <title>Reservas</title>
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
                <SideBar/>
                <Flex flexDir={'column'}>
                    <NavBar
                        pathname={
                            router
                                .pathname
                                .replace('/', '')
                                .replace('[eventID]', currentCard ? currentCard?.title : '')}/>
                    <Content>
                        <Flex>
                            <Box px='30px' py='30px' w={'100%'} display="flex" flexDir={'column'}>
                                <Flex align="center" justifyContent={'space-between'} w={'100%'}>
                                    <Flex>
                                        <Heading size={'md'}>{currentCard?.title}</Heading>
                                        <Tooltip label={currentCard?.id}>
                                            <Box p='1'>
                                                <Tag>ID {currentCard?.id.substring(0, 8)}</Tag>
                                            </Box>
                                        </Tooltip>
                                    </Flex>
                                    <Flex gap={'10px'}>
                                        <Flex
                                            display='flex'
                                            alignItems={'center'}
                                        >
                                            <Text fontSize={'20px'}><AiFillHeart/></Text>
                                            <Text>30</Text>
                                        </Flex>
                                        <Flex
                                            display='flex'
                                            alignItems={'center'}
                                        >
                                            <Text fontSize={'20px'}><AiFillEye/></Text>
                                            <Text>30k</Text>
                                        </Flex>
                                        <Text fontSize={'20px'} display='flex'
                                              alignItems={'center'}><BiEdit/>
                                        </Text>

                                        <Menu>
                                            <MenuButton
                                                transition='all 0.2s'
                                                _focus={{boxShadow: 'none'}}
                                                transform={'rotate(90deg)'}
                                            >
                                                <BsThreeDots/>
                                            </MenuButton>
                                            <MenuList bgColor={'#512DA8'} minW='120px' padding={0}>
                                                <MenuItem display={'flex'} alignItems='center'>
                                                    <HStack display={'flex'} alignItems='center'>
                                                        <EditIcon/>
                                                        <Text>Editar</Text>
                                                    </HStack>
                                                </MenuItem>
                                                <MenuItem display={'flex'} alignItems='center'>
                                                    <HStack display={'flex'} alignItems='center'>
                                                        <MdDelete/>
                                                        <Text>Eliminar</Text>
                                                    </HStack>
                                                </MenuItem>
                                                <MenuItem display={'flex'} alignItems='center'>
                                                    <HStack display={'flex'} alignItems='center'>
                                                        <VscRepoPush/>
                                                        <Text>Reservas</Text>
                                                    </HStack>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>

                                    </Flex>
                                </Flex>

                                <Box bgColor={'#fff'} mt={'30px'} p={'20px'}>

                                    <Flex justify={'space-between'}>
                                        <Heading size={'md'}>Todas Reservas</Heading>
                                        <Flex gap='20px'>
                                            <Menu closeOnSelect={true}>
                                                <MenuButton>
                                                    <Flex
                                                        display={'flex'}
                                                        flexDir={'row'}
                                                        justify='center'
                                                        align={'center'}
                                                    >
                                                        <BiFilter/>
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
                                                    <MenuDivider/>
                                                    <MenuOptionGroup title='Index Category' type='checkbox'>
                                                        <MenuItemOption value='email'>House Party</MenuItemOption>
                                                        <MenuItemOption value='phone'>Revellion</MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <SearchIcon color='gray.300'/>
                                                </InputLeftElement>
                                                <Input backgroundColor={'#fff'} type='search' minW={'239px'}
                                                       placeholder='Pesquisar...'/>
                                            </InputGroup>
                                        </Flex>


                                    </Flex>
                                    <Table>
                                        <Thead borderBottom={'2px solid #DFE0EB'}>
                                            <Tr>
                                                <Th color={'#9FA2B4'}>Detalhes do Ingresso</Th>
                                                <Th color={'#9FA2B4'}>Nome do Cliente</Th>
                                                <Th color={'#9FA2B4'}>Data</Th>
                                                <Th color={'#9FA2B4'}>Estado</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr borderBottom={'1.1px solid #DFE0EB'}>
                                                <Td>Ingresso VIP</Td>
                                                <Td>Dércio Derone</Td>
                                                <Td>May 26, 2021</Td>
                                                <Td>


                                                    / </Td>
                                                <Td textAlign={'right'}>
                                                    <Menu>
                                                        <MenuButton
                                                            transition='all 0.2s'
                                                            _focus={{boxShadow: 'none'}}
                                                            transform={'rotate(90deg)'}
                                                        >
                                                            <BsThreeDots/>
                                                        </MenuButton>
                                                        <MenuList bgColor={'#512DA8'} minW='120px' padding={0}>
                                                            <MenuItem display={'flex'} alignItems='center'>
                                                                <HStack display={'flex'} alignItems='center'>
                                                                    <EditIcon/>
                                                                    <Text>Editar</Text>
                                                                </HStack>
                                                            </MenuItem>
                                                            <MenuItem display={'flex'} alignItems='center'>
                                                                <HStack display={'flex'} alignItems='center'>
                                                                    <MdDelete/>
                                                                    <Text>Eliminar</Text>
                                                                </HStack>
                                                            </MenuItem>
                                                            <MenuItem display={'flex'} alignItems='center'>
                                                                <HStack display={'flex'} alignItems='center'>
                                                                    <VscRepoPush/>
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
                                    <Box bgColor={'#fff'} w={'110px'} h={'65px'} display={'flex'} flexDir={'column'}
                                         alignItems='center'
                                         border={'1px solid #492F86'}
                                         cursor='pointer'
                                         justifyContent='center'
                                         borderRadius={'8'}
                                    >
                                        <Text>Reservas</Text>
                                        <Text fontWeight={'bold'}>60</Text>
                                    </Box>
                                    <Box bgColor={'#fff'} w={'110px'} h={'65px'} display={'flex'} flexDir={'column'}
                                         alignItems='center'
                                         border={'1px solid #492F86'}
                                         cursor='pointer'
                                         justifyContent='center'
                                         borderRadius={'8'}
                                    >
                                        <Text>Reservas</Text>
                                        <Text fontWeight={'bold'}>60</Text>
                                    </Box><Box bgColor={'#fff'} w={'110px'} h={'65px'} display={'flex'}
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
                                <CustomChart/>
                                <Flex align="center" position={'relative'}>
                                    <Box style={{
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
                                        top: !close ? '-30vh' : ''
                                    }}
                                         onClick={() => setClose(!close)}
                                         title={!close ? 'open lateral box' : 'close lateral box'}
                                    >
                                        {
                                            close ?
                                                <BiChevronRight style={{
                                                    color: '#fff',
                                                    fontSize: '28px'
                                                }}/>
                                                :
                                                <BiChevronLeft style={{
                                                    color: '#fff',
                                                    fontSize: '28px'
                                                }}/>
                                        }

                                    </Box>

                                    <Divider backgroundColor="#C4C4C4" h={'2px'} width="98%"/>

                                </Flex>
                                {
                                    close && <Box mt={'20px'}>
                                        <Heading size={'md'} display="flex" justifyContent={'center'} alignItems={'center'}
                                                 alignSelf={'center'}>Localização
                                            no
                                            Mapa</Heading>

                                    </Box>
                                }

                            </Box>
                        </Flex>
                    </Content>
                </Flex>
            </Grid>
        </>

    );
}

export default Reservas;