import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCircularProgesss } from './CustomCircularProgesss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Content = ({ children }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStartLoading = () => setLoading(true);
    const handleStopLoading = () => setLoading(false);

    router.events.on('routeChangeStart', handleStartLoading);
    router.events.on('routeChangeComplete', handleStopLoading);
    router.events.on('routeChangeError', handleStopLoading);

    return () => {
      router.events.off('routeChangeStart', handleStartLoading);
      router.events.off('routeChangeComplete', handleStopLoading);
      router.events.off('routeChangeError', handleStopLoading);
    };
    dispatch({ type: 'set', loading: loading });
  }, [router, loading]);
  return (
    <Box
      overflowY='auto'
      overflowX={'hidden'}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#512DA8',
          borderRadius: '24px',
        },
      }}
      maxH={'100vh'}
      background={'#F9F9F9'}
      maxW='100vw'
    >
      {children}
    </Box>
  );
};

export default Content;
