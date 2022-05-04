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
import React from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { ImPriceTags } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { VscRepoPush } from 'react-icons/vsc';
const img =
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export const Card = (props: BoxProps) => {
  return (
    <Box
      display='flex'
      gap='13px'
      border={'1px solid #DADADA'}
      position='relative'
      borderRadius={'10px'}
      {...props}
    >
      <Image src={img} maxW='145px' alt='events description'/>
      <Flex flexDir={'column'} py='5px' gap={'5px'}>
        <Text fontSize={'17px'} maxW='70%' noOfLines={1} title='Game Over 2dgh'>
          Game Over 2dghn fgjgfjfg
        </Text>
        <HStack display={'flex'} alignItems='center'>
          <ImPriceTags />
          <Text>2.000,00 KZ</Text>
        </HStack>
        <HStack display={'flex'} alignItems='center' mb={'20px'}>
          <BiCalendarEvent />
          <Text>10 de Oct, 20:00</Text>
        </HStack>
        <Tooltip label='House Party'>
          <Box p='1'>
            <Tag>House Party</Tag>
          </Box>
        </Tooltip>
      </Flex>
      <Menu>
        <MenuButton
          transition='all 0.2s'
          _focus={{ boxShadow: 'none' }}
          position='absolute'
          top={'10px'}
          right='10px'
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
