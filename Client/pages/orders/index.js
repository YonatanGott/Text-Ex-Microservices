import {
    List,
    ListItem,
    Heading,
    Container,
} from "@chakra-ui/react"

const OrderIndex = ({ orders }) => {
    return (
        <Container maxW="container.lg" d="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading as="h2" size="xl" mb="4"> My Orders </Heading>
            <List spacing={3}>
                {orders.map((order) => {
                    return (
                        <ListItem key={order.id}>
                            <Heading as="h4" size="md" mb="4"> {order.book.title} by {order.book.author} - {order.status}</Heading>
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex;