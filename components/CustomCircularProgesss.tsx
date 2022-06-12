import {Box, CircularProgress, CircularProgressLabel, Text} from "@chakra-ui/react";


export const CustomCircularProgesss = () => {

    return (
        <Box display={'flex'} h={'80vh'}
             justifyContent={'center'}
             flexDir={'column'}
             alignItems={'center'}
             backdropFilter={'brightness(0.5)'}
        >
            <CircularProgress isIndeterminate={true} size={'300px'} color='#512DA8'>
                <CircularProgressLabel
                    display={'flex'}
                    flexDir={'column'}
                    justifyContent="center"
                    alignItems={'center'}
                    fontSize={'20px'}>
                    <Text color='#512DA8'>KIARI-EVENTOS</Text>
                </CircularProgressLabel>

            </CircularProgress>
            <Text fontSize={'32px'} color='#512DA8'>Aproveita a Plataforma</Text>
        </Box>
    )

}