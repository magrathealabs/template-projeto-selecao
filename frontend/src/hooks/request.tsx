import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

import { useAuth } from './auth';

interface Repositories {
  id: number;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: [string];
}

interface RequestContextData {
  updateAt: Date;
  repositories: Repositories;
  getData(filter?: String): Promise<Repositories>;
  updateDate(date: Date): void;
}

const RequestContext = createContext<RequestContextData>({} as RequestContextData);

const RequestProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Repositories>(() => {
    const repositories = JSON.parse(localStorage.getItem('@Magrathea:repositories') || '[]');

    if (repositories) {
      return repositories;
    }

    return {} as Repositories;
  });
  const [requestDate, setRequestDate] = useState(new Date());

  const { token, user } = useAuth();

  const getData = useCallback(
    async (filter) => {
      const response = await api.get('/repositories', {
        headers: { authorization: token, id: user.id, login: user.login },
        params: { filter },
      });

      localStorage.setItem('@Magrathea:repositories', JSON.stringify(response.data));

      setData(response.data);

      if (filter) {
        setRequestDate(new Date());
      }

      return response.data;
    },
    [token, user],
  );

  const updateDate = useCallback((date) => {
    setRequestDate(date);
  }, []);

  return (
    <RequestContext.Provider
      value={{ updateAt: requestDate, repositories: data, getData, updateDate }}
    >
      {children}
    </RequestContext.Provider>
  );
};

function useRequest(): RequestContextData {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('useRequest must be used within an RequestProvider');
  }

  return context;
}

export { RequestProvider, useRequest };
