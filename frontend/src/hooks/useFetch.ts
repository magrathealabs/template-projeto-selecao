import useSWR from 'swr';

import api from '../services/api';

import { useAuth } from './useAuth';

export default function useFetch<Data = any, Error = any>(fetchArguments: string[]) {
  const { token, user } = useAuth();

  const [url, filter] = fetchArguments;

  const { data, error, mutate } = useSWR<Data, Error>([url, filter], async url => {
    const data = JSON.parse(localStorage.getItem('@Magrathea:repositories') || '[]');

    if (data.length === 0 || filter !== '') {
      const response = await api.get(url, {
        headers: { authorization: token, id: user.id, login: user.login },
        params: { filter },
      });

      if (filter === '') {
        localStorage.setItem('@Magrathea:repositories', JSON.stringify(response.data));
      }

      return response.data;
    }

    return data;
  });

  return { data, error, mutate };
}
