import { Flex } from '@chakra-ui/core'
import { User } from '../components/user'
import { useUser } from '../context/user'

function IndexPage() {
  const { user } = useUser()

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
    </Flex>
  )
}

export default IndexPage
