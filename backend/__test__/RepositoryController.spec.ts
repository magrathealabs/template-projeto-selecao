import FakeRepositoryController from './fakes/FakeRepositoryController';

describe('RepositoryController', () => {
  const fakeRepositoryController = new FakeRepositoryController();
  const id = Math.random();

  it('should be able to list repositories', async () => {
    const repositories = await fakeRepositoryController.listRepositories(id);

    expect(repositories[0]).toEqual({
      _id: String(id + 1),
      id: 47394776,
      user: id,
      name: 'lerna',
      description:
        ':dragon: A tool for managing JavaScript projects with multiple packages.',
      url: 'https://github.com/lerna/lerna',
      tags: ['tag 1', 'tag 2'],
    });
  });

  it('should be able to filter repositories with tag', async () => {
    const repositories = await fakeRepositoryController.listRepositories(
      id,
      'tag',
    );

    expect(repositories[1]).toEqual({
      _id: String(id + 2),
      id: 10270250,
      user: id,
      name: 'react',
      description:
        'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      url: 'https://github.com/facebook/react',
      tags: ['tag 1', 'tag 2'],
    });
  });
});
