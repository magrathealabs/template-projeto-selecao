import Router from 'next/router'
import { Button, Flex, Avatar, Stack, Text, Box } from '@chakra-ui/core'
import { useSession, signout } from 'next-auth/client'
import { FullpageSpinner } from '../components/spinner'

function IndexPage() {
  const [session, loading] = useSession()

  if (loading) {
    return <FullpageSpinner />
  }

  if (!loading && !session) {
    Router.replace('/login')
  }

  return (
    <Flex>
      <Flex
        p={4}
        borderBottomColor="gray.200"
        borderBottomWidth={1}
        width="100%"
      >
        <Stack spacing={2} align="center" isInline>
          <Avatar name={session.user.name} src={session.user.image} />
          <Box>
            <Text>{session.user.name}</Text>
            <Button
              size="xs"
              variantColor="pink"
              onClick={() =>
                signout({ callbackUrl: 'http://localhost:3000/login' })
              }
            >
              Sair
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default IndexPage
