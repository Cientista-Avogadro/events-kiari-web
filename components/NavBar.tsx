import { BellIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';

interface NavBarProps {
  pathname: string;
}

const NavBar = ({ pathname }: NavBarProps) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.isOpen);

  return (
    <Flex
      align={'center'}
      px='30px'
      py='10px'
      borderBottom={'0.5px solid #DFDFDF'}
      justify='space-between'
    >
      <Flex align={'center'} gap='10px'>
        <HamburgerIcon
          w='16px'
          p='0'
          h='16px'
          cursor={'pointer'}
          onClick={() => dispatch({ type: 'set', isOpen: !isOpen })}
        />
        <Text display={{ base: 'none', lg: 'initial', md: 'initial' }}>{pathname}</Text>
      </Flex>
      <Flex align={'center'} gap='10px'>
        <SearchIcon
          w='16px'
          p='0'
          h='16px'
          cursor={'pointer'}
          display={{ base: 'none', lg: 'initial', md: 'initial' }}
        />
        <BellIcon
          w='16px'
          p='0'
          h='16px'
          cursor={'pointer'}
          display={{ base: 'none', lg: 'initial', md: 'initial' }}
        />
        <Divider
          orientation='vertical'
          height={'32px'}
          display={{ base: 'none', lg: 'initial', md: 'initial' }}
        />
        <Text display={{ base: 'none', lg: 'initial', md: 'initial' }}>{user?.name}</Text>
        <Menu>
          <MenuButton as={Stack} direction='row' spacing={4} cursor={'pointer'}>
            <Avatar
              src={user?.avatarUrl}
              name={user?.name}
              cursor='pointer'
              size={'sm'}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title='Profile'>
              <Text>{user?.name}</Text>
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Help'>
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
