import Link from 'next/link'
import { Box, Flex, Spacer, Button, Heading } from "@chakra-ui/react"

const Header = ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <Button key={href} colorScheme="black" mr="4" variant="outline" >
                    <Link href={href}>
                        <a>{label}</a>
                    </Link>
                </Button>
            );
        });

    return (
        <Box w="100%" p={4} >
            <Flex >
                <Box p="2">
                    <Link href="/">
                        <a><Heading size="lg">TextEx</Heading></a>
                    </Link>
                </Box>
                <Spacer />
                <Box>
                    {links}
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;