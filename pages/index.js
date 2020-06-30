import { Flex, Grid } from '@chakra-ui/core'
import { getSession } from 'next-auth/client'
import { useQuery } from 'react-query'
import { User } from '../components/user'
import { RepositoryCard } from '../components/repository-card'
import { useUser } from '../context/user'
import { FullpageSpinner } from '../components/spinner'
import { fetchUserData, fetchStarredRepositories } from '../services'

function IndexPage({ tags }) {
  const { user } = useUser()

  const { data: starred } = useQuery(['starred', user], fetchUserData, {
    enabled: user,
  })

  const { data: repositories, status, isFetching } = useQuery(
    ['repositories', starred, tags],
    fetchStarredRepositories,
    { enabled: starred }
  )

  return (
    <Flex direction="column">
      <Flex
        p={4}
        borderBottomColor="gray.200"
        borderBottomWidth={1}
        width="100%"
      >
        <User name={user?.name} image={user?.image} />
      </Flex>

      <Flex flexWrap="wrap">
        <Grid
          width="100%"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={4}
          p={4}
        >
          {repositories?.map(repo => (
            <RepositoryCard key={repo.id} {...repo} />
          ))}
        </Grid>

        {(status === 'loading' || isFetching) && <FullpageSpinner />}
      </Flex>
    </Flex>
  )
}

IndexPage.getInitialProps = async ctx => {
  const session = await getSession(ctx)

  const response = await fetch(
    `${process.env.APP_DOMAIN}/api/tags?user=${session?.user.email}`
  )
  const data = await response.json()

  return { tags: data }
}

export default IndexPage
