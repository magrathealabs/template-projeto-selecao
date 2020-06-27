import { Flex, Grid } from '@chakra-ui/core'
import { useQuery } from 'react-query'
import { User } from '../components/user'
import { RepositoryCard } from '../components/repository-card'
import { useUser } from '../context/user'
import { FullpageSpinner } from '../components/spinner'

const getStarredRepositoriesUrl = data => {
  const {
    items: [user],
  } = data
  return `https://api.github.com/users/${user.login}/starred`
}

function IndexPage() {
  const { user } = useUser()

  const { data: starred } = useQuery('starred', async () => {
    const data = await fetch(
      `https://api.github.com/search/users?q=${user.email}`
    )

    return data.json()
  })

  const { data: repositories, status, isFetching } = useQuery(
    ['repositories', starred],
    async (__, starred) => {
      const url = getStarredRepositoriesUrl(starred)
      const data = await fetch(url)

      return await data.json()
    },
    {
      enabled: starred,
    }
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
        {(status === 'loading' || isFetching) && <FullpageSpinner />}

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
      </Flex>
    </Flex>
  )
}

export default IndexPage
