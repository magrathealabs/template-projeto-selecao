import Head from 'next/head'
import { Provider } from 'next-auth/client'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { UserProvider } from '../context/user'

const App = ({ Component, pageProps }) => {
  const { session } = pageProps

  return (
    <ThemeProvider>
      <CSSReset />
      <Provider options={{ site: process.env.APP_DOMAIN }} session={session}>
        <UserProvider>
          <Head>
            <title>TagHub</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>

          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
