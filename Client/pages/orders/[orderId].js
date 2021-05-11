import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';


import {
    Heading,
    Container,
} from '@chakra-ui/react';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: () => Router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }

    return (
        <Container maxW="container.lg" d="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading as="h4" size="md" mb="4">Time left to pay: {timeLeft} seconds</Heading>
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey="pk_test_51IptIXLxCDqPuTPGiK4kuoRf7ubS84l2xnDA4bEXUB2te2LIf4FbjvW1dgwDNW21Rb7vgayKgkcSLsi6fIzGnnC600q3iSLIBq"
                amount={order.book.price * 100}
                email={currentUser.email}
            />
            {errors}
        </Container>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;