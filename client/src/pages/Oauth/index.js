import React from 'react';
import { useDispatch } from 'react-redux';

import { Creators as AuthAtions } from '../../store/ducks/auth';

const Oauth = (props) => {
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const token = query.get('access_token');
    dispatch(AuthAtions.setToken(token));
    props.history.push('/app');

    return (
        <div>
            <h4>Oauth</h4>
        </div>
    );
};

export default Oauth;
