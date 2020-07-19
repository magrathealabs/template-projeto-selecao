import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';

import './styles.scss';

import { mutate } from 'swr';

import api from '../../services/api';

import parseStringAsArray from '../../utils/parseStringAsArray';

import { useAuth } from '../../hooks/useAuth';

interface RepositoryStarred {
  _id: string;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

interface ModalProps {
  onShow: boolean;
  onHide(): void;
  id: string;
  name: string;
  value: string;
}

const Modal: React.FC<ModalProps> = ({ onShow, onHide, id, name, value }) => {
  const [tags, setTags] = useState(() => value || '');

  const { token } = useAuth();

  const handleUpdateTagAtRepository = useCallback(
    e => {
      e.preventDefault();

      api.put(`/repositories/${id}`, { tags }, { headers: { authorization: token } });

      const data = JSON.parse(localStorage.getItem('@Magrathea:repositories') || '[]');

      const updatedRepositories = data?.map((repository: RepositoryStarred) => {
        if (repository._id === id) {
          return { ...repository, tags: parseStringAsArray(tags) };
        }

        return repository;
      });

      localStorage.setItem('@Magrathea:repositories', JSON.stringify(updatedRepositories));

      mutate(['repositories', ''], updatedRepositories);
      onHide();
    },
    [id, tags, token, onHide],
  );

  const render = (
    <div className="modal">
      <form onSubmit={e => handleUpdateTagAtRepository(e)}>
        <div className="modal__header">
          <h3>Please, enter your tags</h3>
          <button type="button" onClick={() => onHide()}>
            <FiX size={24} />
          </button>
        </div>
        <div className="modal__input">
          <p>tags at {name} - please separate with ","</p>
          <input
            placeholder="repo tags"
            defaultValue={value}
            onChange={e => setTags(e.target.value)}
            required
          />
        </div>
        <div className="modal__footer">
          <button type="submit">Add tags</button>
        </div>
      </form>
    </div>
  );

  return onShow ? render : null;
};

export default Modal;
