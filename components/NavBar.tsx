import { BellIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
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
import React, { useEffect } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../contexts/AuthContext';
import { auth, logout } from '../firebase';
import { useRouter } from 'next/router';

interface NavBarProps {
  pathname: string;
}

const NavBar = ({ pathname }: NavBarProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.isOpen);

  const handleSignOut = () => {
    logout();
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) router.push('/login');
  }, [user, loading, router]);
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
        <Text display={{ base: 'none', lg: 'initial', md: 'initial' }}>
          {pathname}
        </Text>
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
        <Text display={{ base: 'none', lg: 'initial', md: 'initial' }}>
          {user?.displayName}
        </Text>
        <Menu>
          <MenuButton as={Stack} direction='row' spacing={4} cursor={'pointer'}>
            <Avatar
              src={user?.photoURL ? user?.photoURL : ''}
              name={user?.displayName ? user?.displayName : ''}
              cursor='pointer'
              size={'sm'}
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title='Profile'>
              <Text
                ml={'13px'}
                textTransform='capitalize'
                color={'ActiveCaption'}
              >
                {user?.displayName}
              </Text>
              <MenuItem>Minha Conta</MenuItem>
              <MenuItem>Pagamentos </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Help'>
              <MenuItem>Docs</MenuItem>
              <MenuItem display={'flex'} gap='10px' onClick={handleSignOut}>
                <VscSignOut />
                Sair
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
