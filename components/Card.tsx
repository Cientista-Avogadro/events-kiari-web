import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { ImPriceTags } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { VscRepoPush } from 'react-icons/vsc';
import { ICardProps } from '../services/Card';
import { useDispatch, useSelector } from 'react-redux';

interface ICard {
  boxProps?: BoxProps;
  item: ICardProps;
  isReserved?: boolean;
}

export const Card = ({ item, boxProps, isReserved }: ICard) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getColorStatus = (status: string): string => {
    if (status === 'pendente') return '#F12B2C';
    if (status === 'em análise') return '#FEC400';
    if (status === 'pago') return '#29CC97';
    return '';
  };

  return (
    <Box
      display='flex'
      gap='13px'
      border={'1px solid #DADADA'}
      position='relative'
      borderRadius={'10px'}
      {...boxProps}
      onClick={() => {
        dispatch({ type: 'set', currentCard: item });
        router.push('Events/'.concat(item.id));
      }}
      transition={'transform 0.3s ease-out'}
      _hover={{
        transform: 'scale(1.02)',
      }}
      cursor='pointer'
      boxShadow={'10px 10px 18px 0px rgba(0,0,0,0.08)'}
    >
      <Image
        src={item.img}
        borderRadius={'10px'}
        maxW='145px'
        alt='events description'
      />
      <Flex flexDir={'column'} py='5px' gap={'5px'}>
        <Text fontSize={'17px'} title={item.title} maxW={'90%'}>
          {item.title}
        </Text>
        <HStack display={'flex'} alignItems='center'>
          <ImPriceTags />
          <Text>{item.price}</Text>
        </HStack>
        <HStack display={'flex'} alignItems='center' mb={'20px'}>
          <BiCalendarEvent />
          <Text>{item.data}</Text>
        </HStack>
        {!isReserved ? (
          <Tooltip label={item.type}>
            <Box p='1'>
              <Tag>{item.type}</Tag>
            </Box>
          </Tooltip>
        ) : (
          <Flex>
            <Tooltip label={item.type}>
              <Box p='1'>
                <Tag>{item.type}</Tag>
              </Box>
            </Tooltip>
            <Tooltip label={item.buyied}>
              <Box p='1'>
                <Tag
                  bgColor={getColorStatus(item.buyied)}
                  color='#fff'
                  textTransform='capitalize'
                >
                  {item.buyied}
                </Tag>
              </Box>
            </Tooltip>
          </Flex>
        )}
      </Flex>
      <Menu>
        <MenuButton
          transition='all 0.2s'
          _focus={{ boxShadow: 'none' }}
          position='absolute'
          top={'10px'}
          right='10px'
          pointerEvents={'stroke'}
          zIndex='99999'
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
    </Box>
  );
};
