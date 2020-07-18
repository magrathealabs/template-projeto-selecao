import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import './styles.scss';

import { useAuth } from '../../hooks/auth';

const Template: React.FC = ({ children }) => {
  const { token, signOut } = useAuth();

  return (
    <>
      <header>
        <section>
          <div>
            <h1>Github Magrathea</h1>
            <p>app to see your stars</p>
          </div>
          {token && (
            <button type="button" onClick={() => signOut()}>
              <FiLogOut size={30} />
            </button>
          )}
        </section>
      </header>
      {children}
    </>
  );
};

export default Template;
