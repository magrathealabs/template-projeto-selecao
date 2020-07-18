import React, { useEffect, useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';

import Card from '../../components/Card';
import Load from '../../components/Load';
import Template from '../../components/Template';

import './styles.scss';

import { useAuth } from '../../hooks/auth';
import { useRequest } from '../../hooks/request';

interface RepositoryStarred {
  _id: string;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: [string];
}

const Repositories: React.FC = () => {
  const [repositories, setRepositories] = useState([] as any);
  const [searchTag, setSearchTag] = useState('');
  const [load, setLoad] = useState(false);

  const { user } = useAuth();
  const { updateAt, getData } = useRequest();

  useEffect(() => {
    setLoad(true);

    if (searchTag) {
      setRepositories(JSON.parse(localStorage.getItem('@Magrathea:repositories') || '[]'));
      setLoad(false);
    } else {
      getData().then((response) => {
        setRepositories(response);
        setLoad(false);
      });
    }
  }, [searchTag, updateAt, getData]);

  const handleSearchRepositoryPerTag = useCallback(
    (e) => {
      e.preventDefault();

      getData(searchTag);
    },
    [searchTag, getData],
  );

  return (
    <Template>
      {load ? (
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
                <form onSubmit={(e) => handleSearchRepositoryPerTag(e)}>
                  <input
                    placeholder="search tag"
                    defaultValue={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    required
                  />
                  <button type="submit">
                    <FiSearch />
                  </button>
                </form>
              </div>
            </section>
            <div>
              {repositories &&
                repositories.map((repository: RepositoryStarred) => (
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
