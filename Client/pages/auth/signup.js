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

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
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
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign Up To An Account</Heading>
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
                                Sign Up
                        </Button>
                        </Stack>
                    </form>
                    {errors}
                </Stack>
            </Flex>
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
        </Stack>
    )
}

export default SignUp