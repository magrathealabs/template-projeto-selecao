import React, { useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import Card from '../../components/Card';
import Load from '../../components/Load';
import Template from '../../components/Template';

import './styles.scss';

import { useAuth } from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

interface RepositoryStarred {
  _id: string;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: [string];
}

const Repositories: React.FC = () => {
  const [searchTag, setSearchTag] = useState('');

  const { data, mutate } = useFetch<RepositoryStarred[]>(['repositories', searchTag]);

  const { user } = useAuth();

  const handleSearchRepositoryPerTag = useCallback(
    e => {
      e.preventDefault();

      mutate();
    },
    [mutate],
  );

  return (
    <Template>
      {!data ? (
        <Load />
      ) : (
        <main>
          <section>
            <section>
              <img src={user.avatarUrl} alt={user.name} />
              <div>
                <small>@{user.login}</small>
                <h3>{user.name}</h3>
                <p>followers: {user.followers}</p>
                <p>following: {user.following}</p>
                <form onSubmit={e => handleSearchRepositoryPerTag(e)}>
                  <input
                    placeholder="filter by tag"
                    defaultValue={searchTag}
                    onBlur={e => setSearchTag(e.target.value)}
                  />
                  <button type="submit">
                    <FiSearch />
                  </button>
                </form>
              </div>
            </section>
            <div>
              {data?.map((repository: RepositoryStarred) => (
                <Card key={repository._id} repository={repository} />
              ))}
            </div>
          </section>
        </main>
      )}
    </Template>
  );
};

export default Repositories;
