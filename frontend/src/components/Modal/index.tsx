import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';

import './styles.scss';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useRequest } from '../../hooks/request';

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
  const { updateDate } = useRequest();

  const handleUpdateTagAtRepository = useCallback(
    (e) => {
      e.preventDefault();

      api
        .put(
          `/repositories/${id}`,
          { tags },
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then(() => {
          setTags('');
          updateDate(new Date());
          onHide();
        });
    },
    [token, id, tags, updateDate, onHide],
  );

  const render = (
    <div className="modal">
      <form onSubmit={(e) => handleUpdateTagAtRepository(e)}>
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
            onChange={(e) => setTags(e.target.value)}
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
