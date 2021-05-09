import { Box, Heading, Grid, GridItem } from "@chakra-ui/react"
import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {

    return (
        <Grid
            h="container.md"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={1} bg="black" ></GridItem>
            <GridItem colSpan={1} bg="black" ></GridItem>
            <GridItem colSpan={1} bg="black" ></GridItem>
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
            <GridItem colSpan={2} bg="black" ></GridItem>
            <GridItem colSpan={2} bg="black" ></GridItem>
        </Grid>
    )
};

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;
