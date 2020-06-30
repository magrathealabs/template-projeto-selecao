import { useState } from 'react'
import {
  Flex,
  Grid,
  useDisclosure,
  FormControl,
  Input,
  Button,
  FormHelperText,
} from '@chakra-ui/core'
import { getSession } from 'next-auth/client'
import { useQuery } from 'react-query'
import { User } from '../components/user'
import { RepositoryCard } from '../components/repository-card'
import { useUser } from '../context/user'
import { FullpageSpinner } from '../components/spinner'
import { Modal } from '../components/modal'

const getStarredRepositoriesUrl = data => {
  const {
    items: [user],
  } = data
  return `https://api.github.com/users/${user.login}/starred`
}

const getTagsFromRepository = (id, list) => {
  const matches = list.filter(({ rid }) => id === rid)

  if (matches.length > 0) {
    const [head] = matches
    return head.tags
  }

  return []
}

function IndexPage({ tags }) {
  const { isOpen, onClose, onOpen } = useDisclosure(false)
  const [repository, setRepository] = useState('')
  const { user } = useUser()

  const openModal = repo => {
    setRepository(repo)
    onOpen()
  }

  const { data: starred } = useQuery('starred', async () => {
    const data = await fetch(
      `https://api.github.com/search/users?q=${user.email}`
    )

    return data.json()
  })

  const { data: repositories, status, isFetching } = useQuery(
    ['repositories', starred, tags],
    async (__, starred) => {
      const url = getStarredRepositoriesUrl(starred)
      const data = await fetch(url)
      const repos = await data.json()

      const repositories = repos.map(repo => ({
        ...repo,
        tags: getTagsFromRepository(repo.id, tags),
      }))

      return repositories
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
        <Grid
          width="100%"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={4}
          p={4}
        >
          {repositories?.map(repo => (
            <RepositoryCard key={repo.id} openModal={openModal} {...repo} />
          ))}
        </Grid>

        {(status === 'loading' || isFetching) && <FullpageSpinner />}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Input
          name="owner"
          value={user.email}
          variant="filled"
          isReadOnly
          hidden
        />

        <Input
          name="id"
          value={repository.id}
          variant="filled"
          isReadOnly
          hidden
        />

        <FormControl>
          <Input name="tag" placeholder="Tags" variant="filled" />
          <FormHelperText>
            Separe as tags por virgula. ex: node, backend
          </FormHelperText>
        </FormControl>

        <Button width="100%" variantColor="pink" textTransform="uppercase">
          Adicionar Tags
        </Button>
      </Modal>
    </Flex>
  )
}

IndexPage.getInitialProps = async ctx => {
  const { user } = await getSession(ctx)

  const response = await fetch(
    `${process.env.APP_DOMAIN}/api/tags?user=${user.email}`
  )
  const data = await response.json()

  return { tags: data }
}

export default IndexPage
