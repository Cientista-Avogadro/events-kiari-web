import { Box } from '@chakra-ui/react';

const Content = ({ children }: any) => {
  return (
    <Box px='30px' py='30px'>
      {children}
    </Box>
  );
};

export default Content;
