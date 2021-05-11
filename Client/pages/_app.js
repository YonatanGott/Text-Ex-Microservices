import 'tailwindcss/tailwind.css'
import { ChakraProvider } from "@chakra-ui/react"
import buildClient from '../api/build-client'
import Header from '../components/header';


const MyApp = ({ Component, pageProps, currentUser }) => {
    return (
        <ChakraProvider>
            <div >
                <Header currentUser={currentUser} />
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </ChakraProvider>
    );
};

MyApp.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
};


export default MyApp;