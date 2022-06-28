import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { auth, sendPasswordReset } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ForgotePassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/');
  }, [user, loading, router]);

  return (
    <div className='reset'>
      <div className='reset__container'>
        <input
          type='text'
          className='reset__textBox'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='E-mail Address'
        />
        <button className='reset__btn' onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default ForgotePassword;
