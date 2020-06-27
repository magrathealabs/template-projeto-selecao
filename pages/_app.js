import Head from 'next/head'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { UserProvider } from '../context/user'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
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
    </ThemeProvider>
  )
}

export default App
