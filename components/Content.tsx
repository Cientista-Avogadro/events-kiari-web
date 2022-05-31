import {Box} from '@chakra-ui/react';

const Content = ({children}: any) => {
    return (
        <Box overflowY='auto' overflowX={'hidden'}
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
        >
            {children}
        </Box>
    );
};

export default Content;
