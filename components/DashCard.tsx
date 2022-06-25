import { Box, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import React from 'react';

export interface IDashCard {
  title: string;
  value: number;
  percentage?: number;
  showLastInfo?: boolean;
  showProgress?: boolean;
  progressvalue?: number;
  showPercentage?: boolean;
}

export const DashCard = ({
  title,
  value,
  percentage,
  showLastInfo,
  progressvalue,
  showProgress,
  showPercentage,
}: IDashCard) => {
  return (
    <Box
      bgColor={'#fff'}
      p={'20px 60px 20px 20px '}
      borderRadius='5'
      gap='5px'
      flex='1'
    >
      <Text>{title}</Text>
      <Heading size='xl' fontWeight={'medium'}>
        {value}
      </Heading>
      <Flex gap={'5px'} fontSize='10pt' pt='10px'>
        {showPercentage && (
          <Text color={percentage && percentage < 0 ? 'red' : 'green'}>
            {percentage && percentage >= 0
              ? '+'.concat(percentage.toString())
              : percentage}
            %
          </Text>
        )}
        {showLastInfo && <Text>Since Last Month</Text>}
        {showProgress && (
          <Flex w={'100%'} align='center' gap={'5px'}>
            <Progress value={progressvalue} w={'100%'} size='xs' />
            {progressvalue}%
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
