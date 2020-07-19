import React, { useEffect, useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Template from '../../components/Template';

import './styles.scss';

import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const history = useHistory();

  const handleSignInWithGithub = useCallback(
    async code => {
      await signIn(code);

      history.push('/repositories');
    },
    [signIn, history],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      handleSignInWithGithub(code);
    }
  }, [handleSignInWithGithub]);

  return (
    <Template>
      <main>
        <section>
          <h2>login</h2>
          <div>
            <div className="login__card">
              <h3>Github</h3>
              <a href="http://github.com/login/oauth/authorize?client_id=0c8bf460469b9af72df7">
                login with github <FiChevronRight />
              </a>
            </div>
            <div className="login__card --facebook">
              <h3>Facebook</h3>
              <a href="/">
                login with facebook <FiChevronRight />
              </a>
            </div>
          </div>
        </section>
      </main>
    </Template>
  );
};

export default SignIn;
