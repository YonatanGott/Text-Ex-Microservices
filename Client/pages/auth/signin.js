import { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Box,
    Spacer,
    VStack
} from '@chakra-ui/react';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    }

    return (
        <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }} >
            <Flex flex={1}>
                <Box bg='black' w="100%" >
                    <VStack spacing={5}
                        align="stretch">
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                    </VStack>
                    <VStack spacing={5}
                        align="stretch">
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                        <Spacer />
                        <Box bg='white' w="100%" p={4} />
                    </VStack>
                </Box>
            </Flex>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign In To Your Account</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack >
                            <Button colorScheme="black" variant="outline" type="submit" marginTop='4'>
                                Sign In
                        </Button>
                        </Stack>
                    </form>
                    {errors}
                </Stack>
            </Flex>
        </Stack>
    )
}

export default SignIn;
