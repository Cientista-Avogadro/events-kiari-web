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
import React, { useEffect, useState } from 'react';
import loginImage from '../assets/img/siginImage.png';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase';
import { useRouter } from 'next/router';

interface Inputs {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const [errPs, setErrPs] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignUp: SubmitHandler<Inputs> = data => {
    if (data?.password === data?.passwordConfirm) {
      registerWithEmailAndPassword(data.username, data.email, data.password);
    } else {
      setErrPs('password diferentes');
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/');
  }, [user, loading, router]);
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
              <FormLabel htmlFor='username'>Nome de Usuário</FormLabel>
              <Input
                {...register('username', {
                  required: true,
                  minLength: 10,
                })}
                id='username'
              />
              {errors?.username && (
                <i style={{ color: 'red' }}>insira um username válido</i>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='email'>E-mail</FormLabel>
              <Input
                {...register('email', {
                  required: true,
                  minLength: 10,
                })}
                id='email'
                type='email'
              />
              {errors?.username && (
                <i style={{ color: 'red' }}>insira um username válido</i>
              )}
            </FormControl>
          </Flex>

          <Flex
            gap='20px'
            pt={'30px'}
            flexDir={{ base: 'column', lg: 'row', md: 'row', sm: 'row' }}
          >
            <FormControl isRequired>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <Input
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                id='password'
                type='password'
              />
              {errPs && <i style={{ color: 'red' }}>{errPs}</i>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='passwordConfirm'>Confirmar Senha</FormLabel>
              <Input
                {...register('passwordConfirm', {
                  required: true,
                  minLength: 6,
                })}
                id='passwordConfirm'
                type='password'
              />
              {errPs && <i style={{ color: 'red' }}>{errPs}</i>}
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
          <Flex gap='20px'>
            <Button
              bgColor={'#512DA8'}
              color='#fff'
              w='170px'
              _hover={{ backgroundColor: '#512DA8fa' }}
              type={'submit'}
              alignSelf={{ base: 'center', lg: '', md: 'flex-start' }}
              isLoading={loading}
            >
              Cadastrar
            </Button>
            <Button
              bgColor={'#6e54ab'}
              color='#fff'
              w='170px'
              _hover={{ backgroundColor: '#512DA8fa' }}
              alignSelf={{ base: 'center', lg: '', md: 'flex-start' }}
              isLoading={loading}
              onClick={signInWithGoogle}
            >
              Entrar com Google
            </Button>
          </Flex>
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
