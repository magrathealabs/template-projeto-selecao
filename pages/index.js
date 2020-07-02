import { useState } from 'react'
import { Flex, Grid, useDisclosure } from '@chakra-ui/core'
import { useQuery, useMutation, queryCache } from 'react-query'
import { useFormik } from 'formik'
import {
  User,
  RepositoryCard,
  FullpageSpinner,
  AddTagModal,
  Search,
} from '../components'
import { useUser } from '../context/user'
import {
  fetchTags,
  fetchUserData,
  fetchStarredRepositories,
  addTagsToRepository,
} from '../services'

function IndexPage() {
  const { user } = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [repository, setRepository] = useState(null)
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])

  const { data: starred } = useQuery(['starred', user], fetchUserData, {
    enabled: user,
  })

  const { data: tags } = useQuery(['tags', user], fetchTags, {
    enabled: user,
  })

  const { data: repositories, status, isFetching } = useQuery(
    ['repositories', starred, tags],
    fetchStarredRepositories,
    { enabled: starred }
  )

  const [mutate] = useMutation(addTagsToRepository, {
    onSettled: () => {
      queryCache.invalidateQueries('tags')
      queryCache.invalidateQueries('repositories')
    },
  })

  const { handleSubmit, getFieldProps, resetForm } = useFormik({
    initialValues: {
      tags: '',
    },
    onSubmit: async values => {
      const data = {
        owner: user.email,
        rid: repository.id,
        tags: values.tags.split(',').map(tag => tag.trim()),
      }

      await mutate({ data })

      closeModal()
    },
  })

  const tagsField = getFieldProps('tags')

  const openModal = repo => {
    setRepository(repo)
    onOpen()
  }

  const closeModal = () => {
    resetForm()
    onClose()
  }

  const handleChangeTerm = ({ target }) => {
    setTerm(() => target.value)
  }

  const handleSearch = () => {
    if (!repositories) {
      return
    }

    const results = repositories.filter(({ tags }) =>
      tags
        .map(tag => tag.toLowerCase())
        .includes(term.trim().toLocaleLowerCase())
    )

    setResults(old => results)
  }

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

      <Search onChange={handleChangeTerm} onSearch={handleSearch} term={term} />

      <Flex flexWrap="wrap">
        <Grid
          width="100%"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={4}
          p={4}
        >
          {results?.map(repo => (
            <RepositoryCard key={repo.id} openModal={openModal} {...repo} />
          ))}

          {results.length <= 0 &&
            repositories?.map(repo => (
              <RepositoryCard key={repo.id} openModal={openModal} {...repo} />
            ))}
        </Grid>

        {(status === 'loading' || isFetching) && <FullpageSpinner />}
      </Flex>

      <AddTagModal
        field={tagsField}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </Flex>
  )
}

export default IndexPage
