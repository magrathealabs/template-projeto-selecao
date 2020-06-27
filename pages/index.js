import { useEffect } from 'react'
import Router from 'next/router'
import { Flex, Grid } from '@chakra-ui/core'
import { useSession } from 'next-auth/client'
import { FullpageSpinner } from '../components/spinner'
import { User } from '../components/user'
import { RepositoryCard } from '../components/repository-card'

function IndexPage() {
  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) {
      Router.replace('/login')
    }
  }, [loading, session])

  if (loading) {
    return <FullpageSpinner h="100vh" />
  }

  return (
    <Flex direction="column">
      <Flex
        p={4}
        borderBottomColor="gray.200"
        borderBottomWidth={1}
        width="100%"
      >
        <User name={session?.user.name} image={session?.user.image} />
      </Flex>
    </Flex>
  )
}

export default IndexPage
