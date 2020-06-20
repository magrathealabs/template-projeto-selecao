import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '../../services/api';

import { Creators as RepoActions } from '../../store/ducks/repositories';
import { Creators as InfoActions } from '../../store/ducks/info';

import Header from '../../components/Header';
import RepoList from '../../components/RepoList';
import SearchBox from '../../components/SearchBox';

import './styles.scss';

const App = () => {
    const [repositories, setRepositories] = useState([]);
    const [searching, setSearching] = useState(false);

    const [filtered, setFiltered] = useState([]);
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleSearch = (searchIds) => {
        const filteredRepos = repositories.filter((repo) => searchIds.indexOf(repo.id + '') !== -1);
        setFiltered(filteredRepos);

        setSearching(searchIds.length);
    };

    const getUserInfo = (callback) => {
        api.get('/user').then(function (response) {
            dispatch(InfoActions.setInfo(response.data));

            setLogin(response.data.login);

            if (typeof callback == 'function') {
                callback(response.data.login);
            }
        });
    };

    const getStarredRepos = (login) => {
        setLoading(true);
        api.get(`/users/${login}/starred`)
            .then(function (response) {
                dispatch(RepoActions.setInfo(response.data));
                setRepositories(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getUserInfo(getStarredRepos);
    }, [login.length]);

    return (
        <>
            <Header login={login} />
            <div className='container-sm'>
                <SearchBox onSearch={handleSearch} />
                <RepoList repositories={searching ? filtered : repositories} loading={loading} />
            </div>
        </>
    );
};

export default App;
