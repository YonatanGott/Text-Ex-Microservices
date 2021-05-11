import Router from 'next/router';
import useRequest from '../../hooks/use-request';

import {
    Button,
    Heading,
    Container,
} from '@chakra-ui/react';

const BookShow = ({ book }) => {
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            bookId: book.id,
        },
        onSuccess: (order) =>
            Router.push('/orders/[orderId]', `/orders/${order.id}`),
    });

    return (
        <Container maxW="container.lg" d="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading size="lg">{book.title}</Heading>
            <Heading size="md">by {book.author}</Heading>
            <Heading size="sm">Price: {book.price}$</Heading>
            {errors}
            <Button colorScheme="black" variant="outline" type="submit" marginTop='4' onClick={() => doRequest()} className="btn">
                Purchase
            </Button>
        </Container>
    );
};

BookShow.getInitialProps = async (context, client) => {
    const { bookId } = context.query;
    const { data } = await client.get(`/api/books/${bookId}`);

    return { book: data };
};

export default BookShow;
