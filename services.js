const GITHUB_BASE_URL = 'https://api.github.com/'
const API_BASE_URL = '/api/'
const TAGS_URL = `${API_BASE_URL}tags`

const fetcher = (url, options = {}) =>
  fetch(url, options).then(response => response.json())

export const fetchUserData = async (__, { email }) =>
  fetcher(`${GITHUB_BASE_URL}search/users?q=${email}`)

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

export const fetchTags = async (__, { email }) => {
  return fetcher(`${TAGS_URL}?user=${email}`)
}

export const fetchStarredRepositories = async (__, starred, tags) => {
  const url = getStarredRepositoriesUrl(starred)
  const data = await fetch(url)
  const repos = await data.json()

  const repositories = repos.map(repo => ({
    ...repo,
    tags: getTagsFromRepository(repo.id, tags),
  }))

  return repositories
}

export const addTagsToRepository = ({ data }) =>
  fetcher(TAGS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
