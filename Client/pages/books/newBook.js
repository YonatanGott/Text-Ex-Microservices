import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Container,
} from '@chakra-ui/react';

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/books',
        method: 'post',
        body: {
            title,
            author,
            price,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = (event) => {
        event.preventDefault();
        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);
        if (isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2));
    };

    return (
        <Container maxW="container.lg" d="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading as="h2" size="xl" mb="4">Post a Book</Heading>
            <form onSubmit={onSubmit}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Author</FormLabel>
                    <Input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="form-control"
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Price $</FormLabel>
                    <Input
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                </FormControl>
                {errors}
                <Button colorScheme="black" variant="outline" type="submit" marginTop='4'>Submit</Button>
            </form>
        </Container>
    );
};

export default NewBook;