import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiImageAdd } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import { createNewEvent } from '../helpers/EventCrud';
import { IinitialProps } from '../store';

interface Inputs {
  id: string;
  title: string;
  description: string;
  localization: string;
  state: 'public' | 'private';
  type: string;
  latitude: number;
  longitude: number;
  managementWays: 'card' | 'money';
  accountDetails: string;
  price: string;
  data: string;
  img: string;
  click?: boolean;
  yesterday?: number[];
  today?: number[];
  buyied?: 'pago' | 'em análise' | 'pendente';
}

interface IModalForm {
  open: any;
  onOpen: any;
  onClose: any;
  type: 'edit' | 'add';
}

export const ModalForm = ({ onClose, onOpen, open }: IModalForm) => {
  const { cardDatas } = useSelector((state: IinitialProps) => state);
  const [getImage, setGetImage] = useState('');
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setGetImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (data) {
      createNewEvent({ ...data, id: uuid(), img: getImage })
        .then(res => {
          cardDatas?.push(data);
          toast({
            title: 'evento criado com Sucesso.',
            description: 'Nós um evento para ti.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
        })
        .catch(err =>
          toast({
            title: 'erro ao criar um vento',
            description: err,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        );
    }
  };
  return (
    <Modal isOpen={open} onClose={onClose} size={'3xl'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Ingresso</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Flex gap='10px' pb={'10px'}>
              <Box h='calc(170px + 7px + 30px)'>
                <Image
                  src={
                    getImage ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Sysqd0TeyF91ln8xcnUNGJzv3oCDX7s1LQ&usqp=CAU'
                  }
                  alt=''
                  w={'170px'}
                  h='125px'
                />
                <Flex
                  style={{
                    width: '170px',
                    height: '30px',
                    background: '#fefefe',
                    border: '1px solid #cccccc',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <label
                    htmlFor='photo'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      cursor: 'pointer',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '16px',
                      letterSpacing: '1.25px',
                      color: 'rgba(63, 62, 62, 0.6)',
                    }}
                  >
                    <BiImageAdd color={'white'} />
                    Carregar...
                  </label>
                  <Input
                    type='file'
                    accept='image/jpg,image/png,image/jpeg,image/svg,image/gif'
                    id='photo'
                    style={{
                      width: '170px',
                      height: '30px',
                      position: 'absolute',
                      zIndex: '-1',
                      opacity: '0',
                    }}
                    onChange={onImageChange}
                  />
                  <MdDelete onClick={() => setGetImage('')} />
                </Flex>
              </Box>
              <Flex flexDir='column' gap='20px' ml={'50px'}>
                <Flex gap={'10px'}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      aria-invalid={errors.title ? 'true' : 'false'}
                      placeholder='Titulo do Evento'
                      {...register('title', {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.title && (
                      <i style={{ color: 'red' }}>
                        is required an name min 10 char
                      </i>
                    )}
                  </FormControl>
                </Flex>
                <Flex gap={'10px'}>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      aria-invalid={errors.description ? 'true' : 'false'}
                      placeholder='Descrição do Evento'
                      {...register('description', {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.description && (
                      <i style={{ color: 'red' }}>
                        is required an name min 10 char
                      </i>
                    )}
                  </FormControl>
                </Flex>
                <Flex gap={'10px'}>
                  <FormControl>
                    <FormLabel>Localização</FormLabel>
                    <Input
                      aria-invalid={errors.localization ? 'true' : 'false'}
                      placeholder='Local do evento'
                      {...register('localization', {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.localization && (
                      <i style={{ color: 'red' }}>
                        is required an name min 10 char
                      </i>
                    )}
                  </FormControl>
                </Flex>
                <Flex gap={'10px'}>
                  <FormControl>
                    <FormLabel>Tipo de Evento</FormLabel>
                    <Select
                      placeholder='Seleciona uma Opção'
                      {...register('state', {
                        required: true,
                        minLength: 1,
                      })}
                    >
                      <option value='public'>Público</option>
                      <option value='private'>Privado</option>
                    </Select>

                    {errors.state && (
                      <i style={{ color: 'red' }}>
                        is required an name min 10 char
                      </i>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Categoria</FormLabel>
                    <Input
                      placeholder='Categoria do evento'
                      {...register('type', {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.price && (
                      <i style={{ color: 'red' }}>is required a min 10 char</i>
                    )}
                  </FormControl>
                </Flex>
                <Flex gap={'10px'}>
                  <FormControl>
                    <FormLabel>Forma de Gerenciamento</FormLabel>
                    <Input
                      aria-invalid={errors.managementWays ? 'true' : 'false'}
                      placeholder='Forma de Gerenciamento'
                      {...register('managementWays', {
                        required: true,
                        minLength: 1,
                      })}
                    />
                    {errors.managementWays && (
                      <i style={{ color: 'red' }}>
                        is required an name min 10 char
                      </i>
                    )}
                  </FormControl>
                </Flex>
              </Flex>
            </Flex>
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
  );
};
