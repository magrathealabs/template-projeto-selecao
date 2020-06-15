import React from 'react';

import { login } from '../../services/auth';

const Oauth = (props) => {
    const query = new URLSearchParams(props.location.search);
    const token = query.get('access_token');
    login(token);
    props.history.push('/app');

    return (
        <div>
            <h4>Oauth</h4>
        </div>
    );
};

export default Oauth;
