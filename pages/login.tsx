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
import React, {useEffect, useState} from 'react';
import loginImage from '../assets/img/loginImage.png';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {Ilogin, useAuth} from '../contexts/AuthContext';
import {useRouter} from 'next/router';
import {delay} from '../services/auth';
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const {register, handleSubmit} = useForm();
    const {signIn, loading} = useAuth();
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch();


    async function handleSignIn(data: Ilogin) {
        await signIn(data);
        await delay();
        router.push('/');
    }

    useEffect(() => {
        dispatch({type: 'set', rememberMe: rememberMe})
    }, [rememberMe])


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
                display={{base: 'none', lg: 'flex', md: 'none'}}
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
                <Image src={loginImage} alt='imagem descritiva da pagina de '/>
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
                px={{base: '50px', lg: '50px', md: '0', sm: '0'}}
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
                    <FormControl isRequired pb={'30px'}>
                        <FormLabel htmlFor='email'>Email ou Nome de Usuário</FormLabel>
                        <Input
                            {...register('email')}
                            id='email'
                            placeholder='Email ou Nome de Usuário'
                            type={'email'}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <Flex justifyContent={'space-between'}>
                            <FormLabel htmlFor='password'>Senha</FormLabel>
                            <Text color={'#37298D'}>
                                {' '}
                                <Link href={'/forgot-password'}>Esqueceu a senha?</Link>
                            </Text>
                        </Flex>
                        <Input
                            {...register('password')}
                            id='password'
                            placeholder='Password'
                            type={'password'}
                        />
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
                    <Button
                        bgColor={'#512DA8'}
                        color='#fff'
                        w='170px'
                        _hover={{backgroundColor: '#512DA8fa'}}
                        type={'submit'}
                        alignSelf={{base: 'center', lg: '', md: 'flex-start'}}
                        isLoading={loading}
                    >
                        Entrar
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
                        Ainda não possui uma conta?
                        <span style={{color: '#37298D'}}>
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
