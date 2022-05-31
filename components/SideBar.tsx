import {SettingsIcon} from '@chakra-ui/icons';
import {Box, Circle, Divider, Flex, Heading, Text} from '@chakra-ui/react';
import {BiCalendar, BiHome, BiLineChartDown} from 'react-icons/bi';
import {
    MdMiscellaneousServices,
    MdMoveToInbox,
    MdOutlineEventNote,
} from 'react-icons/md';
import {IoCubeSharp} from 'react-icons/io5';
import {BsBank} from 'react-icons/bs';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';

const SideBar = () => {
    const isOpen = useSelector((state: any) => state.isOpen);
    const Router = useRouter()

    return (
        <Box
            bgColor={'#212121'}
            px='15px'
            display={{base: isOpen && 'none', lg: 'flex', md: 'flex'}}
            flexDir='column'
            position={{base: 'absolute', lg: 'unset', md: 'unset', sm: 'absolute'}}
            top='50px'
            zIndex={'9999'}
        >
            <Heading
                fontWeight={'700'}
                fontSize='22px'
                display={'flex'}
                py='18px'
                alignSelf={'center'}
            >
                {!isOpen ? (
                    <>
                        <Text color={'#512DA8'}>KIARI</Text>
                        <Text color={'#fff'}>EVENTOS</Text>
                    </>
                ) : (
                    <Text color={'#512DA8'}>K</Text>
                )}
            </Heading>
            <Flex
                flexDir={'column'}
                my={'40px'}
                gap='10px'
                overflowY='auto'
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#512DA8',
                        borderRadius: '24px',
                    },
                }}
                maxH='500px'
            >
                <Flex
                    onClick={() => Router.push('/')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    borderRadius={'10px'}
                    p='10px'
                    style={{backgroundColor: Router.pathname === '/' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><BiLineChartDown/></Text>
                    {!isOpen && <Text>Dashboard</Text>}
                </Flex>
                <Flex
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    onClick={() => Router.push('/Events')}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/Events' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><MdOutlineEventNote/></Text>
                    {!isOpen && <Text>Eventos</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/invicts')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/Invicts' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><MdMoveToInbox/></Text>
                    {!isOpen && <Text>Convites</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/schedule')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/Schedule' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><BiCalendar/></Text>
                    {!isOpen && <Text>Agenda</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/savedEvents')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/SavedEvents' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><IoCubeSharp/></Text>
                    {!isOpen && <Text>Eventos Salvos</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/services')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/Services' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><MdMiscellaneousServices/></Text>
                    {!isOpen && <Text>Serviços</Text>}
                </Flex>
                <Divider orientation={'horizontal'} color='#575656'/>
                <Flex
                    onClick={() => Router.push('/settings')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/Settings' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}> <SettingsIcon/></Text>
                    {!isOpen && <Text>Definições</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/accountBank')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                    style={{backgroundColor: Router.pathname === '/AccountBank' ? '#512DA8' : ''}}
                >
                    <Text fontSize={'20px'}><BsBank/></Text>
                    {!isOpen && <Text>Coordenadas Bancarias</Text>}
                </Flex>
                <Flex
                    onClick={() => Router.push('/')}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={isOpen && 'center'}
                    color={'#fff'}
                    gap='10px'
                    _hover={{backgroundColor: '#512DA8'}}
                    p='10px'
                    borderRadius={'10px'}
                    cursor='pointer'
                >
                    <Circle bgColor={'#7042DF'} padding={!isOpen ? '5px' : 0}>
                        <Text fontSize={'20px'}><BiHome color='#000'/></Text>
                    </Circle>
                    {!isOpen && <Text>Pagina Inicial</Text>}
                </Flex>
            </Flex>
        </Box>
    );
};

export default SideBar;
