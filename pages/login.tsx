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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import loginImage from '../assets/img/loginImage.png';
import { useAuth } from '../contexts/AuthContext';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase';

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  const handleSignIn: SubmitHandler<Inputs> = data => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user)
      router.push('/login');
    else
      router.push("/");
  }, [user, loading]);

  return (
    <Grid
      templateColumns={{
        base: 'auto auto',
        lg: 'auto auto',
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
        bgGradient={
          'linear-gradient(136.29deg, #C56CD5 10.08%, #0E1B68 96.69%)'
        }
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
          Tenha controle de todas actividades marcadas por ti em um único lugar
        </Text>
      </Flex>
      <Flex
        flexDir='column'
        px={{ base: '50px', lg: '50px', md: '0', sm: '0' }}
        py={'60px'}
        w='100%'
      >
        <Text
          fontSize='20px'
          mb={'30px'}
          fontWeight='700'
          textTransform={'uppercase'}
        >
          Entrar
        </Text>
        <Box
          as='form'
          display='flex'
          flexDir='column'
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Flex gap={'10px'}>
            <FormControl>
              <FormLabel>Email ou username</FormLabel>
              <Input
                aria-invalid={errors?.email ? 'true' : 'false'}
                type='email'
                placeholder='Titulo do Evento'
                {...register('email', {
                  required: true,
                  minLength: 10,
                })}
              />
              {errors?.email && (
                <i style={{ color: 'red' }}>insira um email válido</i>
              )}
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <Flex justifyContent={'space-between'}>
              <FormLabel htmlFor='password'>Senha</FormLabel>
              <Text color={'#37298D'}>
                {' '}
                <Link href={'/forgot-password'}>Esqueceu a senha?</Link>
              </Text>
            </Flex>
            <Input
              type='password'
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            {errors?.password && (
              <i style={{ color: 'red' }}>insira uma password válida 6 char</i>
            )}
          </FormControl>
          <Checkbox
            mt={'22px'}
            mb={'32px'}
            colorScheme='purple'
            size={'md'}
            display='flex'
            alignItems={'center'}
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            maxWidth={'150px'}
          >
            Relembrar-me
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
              Entrar
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
            Ainda não possui uma conta?
            <span style={{ color: '#37298D' }}>
              <Link href={'/signup'}>Registar-se</Link>
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

export default Login;
