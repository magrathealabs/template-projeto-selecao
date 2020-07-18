import parseStringAsArray from '../../src/utils/parseStringAsArray';

import mockRepositoriesStarred from '../mocks/mockRepositoriesStarred';

interface RepositoryStarred {
  _id: string;
  id: number;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export default class RepositoryController {
  private repositories: RepositoryStarred[] = [];

  public async listRepositories(id: number, filter?: string) {
    const repositoriesFind = this.repositories.filter(
      (repository: RepositoryStarred) => repository.user === id,
    );

    if (filter) {
      const repositoriesFilterAsTag = this.repositories.filter(
        repository =>
          repository.user === id &&
          repository.tags.map(tag => tag.includes(filter)),
      );

      repositoriesFilterAsTag.map(repository =>
        this.repositories.push(repository),
      );

      return repositoriesFilterAsTag;
    }

    if (repositoriesFind.length === 0) {
      const repositoriesStarred = mockRepositoriesStarred.map(
        (repository, index) => ({
          _id: String(id + index + 1),
          id: repository.id,
          user: id,
          name: repository.name,
          description: repository.description,
          url: repository.html_url,
          tags: ['tag 1', 'tag 2'],
        }),
      );

      repositoriesStarred.map(repository => this.repositories.push(repository));

      return repositoriesStarred;
    }

    return repositoriesFind;
  }
}
