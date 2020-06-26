import Head from 'next/head'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Head>
        <title>GuhTags</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
