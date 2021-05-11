import { Box, Heading, Grid, GridItem } from "@chakra-ui/react"
import Link from 'next/link'


const LandingPage = ({ currentUser, books }) => {

    const bookList = books.map((book) => {
        return (
            <Box key={book.id} mb="4" ml="1">
                <Heading isTruncated color="white" as="h4" size="md">{book.title},</Heading>
                <Heading isTruncated color="white" as="h4" size="md">{book.author}</Heading>
                <Heading color="white" as="h5" size="sm" >{book.price}$</Heading>
                <Heading color="white" as="h6" size="xs">
                    <Link href="/books/[bookId]" as={`/books/${book.id}`}>
                        <a>View</a>
                    </Link>
                </Heading>
            </Box>
        );
    });


    return (
        <Grid
            h="container.md"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={1} bg="black" >
                <Heading color="white" as="h2" size="xl" mb="4">Books:</Heading>
                {bookList}
            </GridItem>
            <GridItem colSpan={1} bg="white" ></GridItem>
            <GridItem colSpan={1} bg="black" d="flex" justifyContent="center" alignItems="center">
                <Link href="/books/newBook">
                    <a><Heading color="white" size="lg">Sell a Book</Heading></a>
                </Link>
            </GridItem>
            <GridItem colSpan={2} bg="white" d="flex" justifyContent="center" alignItems="center" >
                <Box>
                    {
                        currentUser ? (
                            <Heading size="lg">You Are Signed In With {currentUser.email}</Heading>
                        ) : (
                            <Heading size="lg">You Are Not Signed In</Heading>
                        )
                    }
                </Box>
            </GridItem>
            <GridItem colSpan={1} bg="black" >
            </GridItem>
            <GridItem colSpan={1} bg="white" >
            </GridItem>
            <GridItem colSpan={2} bg="black" d="flex" justifyContent="center" alignItems="center">
                <Link href="/orders">
                    <a><Heading color="white" size="lg"> My Orders</Heading></a>
                </Link>
            </GridItem>
        </Grid>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/books');

    return { books: data };
};

export default LandingPage;
