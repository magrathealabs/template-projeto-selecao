import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '../../services/api';

import { Creators as RepoActions } from '../../store/ducks/repositories';
import { Creators as InfoActions } from '../../store/ducks/info';

import Header from '../../components/Header';
import RepoList from '../../components/RepoList';

import './styles.scss';

const App = () => {
    const [repositories, setRepositories] = useState([]);
    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
            <RepoList repositories={repositories} loading={loading} />
        </>
    );
};

export default App;
