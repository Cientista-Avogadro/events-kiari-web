import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useContext } from 'react';
import loginImage from '../assets/img/siginImage.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  async function handleSignUp(data: any) {
    console.log(data);
  }

  return (
    <Grid
      templateColumns={{
        base: 'auto auto',
        lg: '45% auto',
        md: '70%',
        sm: '90%',
      }}
      h='100vh'
      justifyContent={{
        base: 'normal',
        lg: 'normal',
        md: 'center',
        sm: 'center',
      }}
    >
      <Flex
        bgGradient={'linear-gradient(135deg, #FD6585 0%, #0D25B9 100%)'}
        color={'#fff'}
        display={{ base: 'none', lg: 'flex', md: 'none' }}
        flexDir='column'
        alignContent={'center'}
        alignItems={'center'}
        py={'5'}
        gap={'20px'}
        w='100%'
      >
        <Text fontSize={'26px'} fontWeight={'400'} fontStyle={'italic'}>
          KIARI EVENTOS
        </Text>
        <Image src={loginImage} alt='imagem descritiva da pagina de ' />
        <Text
          textAlign={'center'}
          maxW={'375px'}
          size='16px'
          fontWeight={'700'}
        >
          Gerencie melhor os seus eventos com a Kiari Eventos, Crie uma conta e
          deixe-nos ajudar-te
        </Text>
      </Flex>
      <Flex
        flexDir='column'
        px={{ base: '50px', lg: '50px', md: '0', sm: '0' }}
        py={'20px'}
        w='100%'
      >
        <Text
          fontSize='20px'
          mb={'30px'}
          fontWeight='700'
          textTransform={'uppercase'}
        >
          Criar Uma conta
        </Text>
        <Box
          as='form'
          display='flex'
          flexDir='column'
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Flex
            gap='20px'
            flexDir={{ base: 'column', lg: 'row', md: 'row', sm: 'row' }}
            pb={'30px'}
          >
            <FormControl isRequired>
              <FormLabel htmlFor='firstName'>Primeiro Nome</FormLabel>
              <Input {...register('firstName')} id='firstName' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='lastName'>Último Nome</FormLabel>
              <Input {...register('lastName')} id='lastName' />
            </FormControl>
          </Flex>
          <Flex
            gap='20px'
            flexDir={{ base: 'column', lg: 'row', md: 'row', sm: 'row' }}
            pb={'30px'}
          >
            <FormControl isRequired>
              <FormLabel htmlFor='userName'>Nome de Usuário</FormLabel>
              <Input {...register('userName')} id='userName' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='email'>E-mail</FormLabel>
              <Input {...register('email')} id='email' type='email' />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel htmlFor='phone'>Número de Telefone</FormLabel>
            <Input {...register('phone')} id='phone' type='tel' />
          </FormControl>
          <Flex
            gap='20px'
            pt={'30px'}
            flexDir={{ base: 'column', lg: 'row', md: 'row', sm: 'row' }}
          >
            <FormControl isRequired>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <Input {...register('password')} id='password' type='password' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='passwordConfirm'>Confirmar Senha</FormLabel>
              <Input
                {...register('passwordConfirm')}
                id='passwordConfirm'
                type='password'
              />
            </FormControl>
          </Flex>
          <Checkbox
            defaultChecked
            mt={'22px'}
            mb={'12px'}
            colorScheme='purple'
            size={'md'}
            display='flex'
            alignItems={'center'}
          >
            Sim, Quero receber notificações por email
          </Checkbox>
          <Checkbox
            mb={'32px'}
            colorScheme='purple'
            size={'md'}
            display='flex'
            alignItems={'center'}
          >
            Concordo com todos{' '}
            <span style={{ color: '#37298D' }}>
              termos e políticas de privacidade
            </span>
          </Checkbox>
          <Button
            bgColor={'#512DA8'}
            color='#fff'
            w='170px'
            _hover={{ backgroundColor: '#512DA8fa' }}
            type={'submit'}
            alignSelf={{ base: 'center', lg: '', md: 'flex-start' }}
          >
            Registar-se
          </Button>
          <Text
            display={'flex'}
            gap='10px'
            py={'20px'}
            fontSize={{
              base: '13px',
              lg: '16px',
              md: '16px',
              sm: '16px',
            }}
          >
            {' '}
            Já possui uma conta?
            <span style={{ color: '#37298D' }}>
              <Link href={'/login'}>Entrar</Link>
            </span>
          </Text>
          <Text
            color={'#37298D'}
            display='flex'
            justifyContent={{
              base: 'center',
              lg: 'normal',
              md: 'normal',
              sm: 'normal',
            }}
          >
            <Link href={'/'}>Voltar para página inicial</Link>
          </Text>
        </Box>
      </Flex>
    </Grid>
  );
};

export default SignUp;
