import { EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdDelete, MdRadioButtonUnchecked } from 'react-icons/md';
import { VscRepoPush } from 'react-icons/vsc';

interface IRowsProps {
  avatarUrl?: string;
  status: 'pendente' | 'em análise' | 'concluído';
  clientName: string;
  createdAt: string;
  ingressType: string;
  checked: boolean;
}

export const RowsTableReserve = ({
  clientName,
  createdAt,
  ingressType,
  status,
  avatarUrl,
  checked,
}: IRowsProps) => {
  const getColorStatus = (status: string): string => {
    if (status === 'pendente') return '#F12B2C';
    if (status === 'em análise') return '#FEC400';
    if (status === 'concluído') return '#29CC97';
    return '';
  };

  return (
    <Tr borderBottom={'1.1px solid #DFE0EB'}>
      <Td>
        {checked ? (
          <IoIosCheckmarkCircle
            style={{
              cursor: 'pointer',
              fontSize: '32px',
              color: '#512DA8',
            }}
          />
        ) : (
          <MdRadioButtonUnchecked
            style={{
              cursor: 'pointer',
              fontSize: '32px',
              color: '#C5C7CD',
            }}
          />
        )}
      </Td>
      <Td>
        <Avatar name={clientName} src={avatarUrl} size='sm' />
      </Td>
      <Td
        fontSize={{
          base: '10px',
          md: '12px',
          lg: '14px',
          sm: '10px',
        }}
      >
        {ingressType}
      </Td>
      <Td>{clientName}</Td>
      <Td>{createdAt}</Td>
      <Td>
        <span
          style={{
            color: '#fff',
            backgroundColor: getColorStatus(status),
            borderRadius: '100px',
            padding: '6px 12px',
            fontSize: '10px',
            fontWeight: '700',
            lineHeight: '12.55px',
            textTransform: 'uppercase',
          }}
        >
          {status}
        </span>
      </Td>
      <Td textAlign={'right'}>
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
      </Td>
    </Tr>
  );
};
