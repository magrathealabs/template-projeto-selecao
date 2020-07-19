import React, { useCallback, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import Modal from '../Modal';

import './styles.scss';

interface RepositoryStarred {
  _id: string;
  user: number;
  name: string;
  description: string;
  url: string;
  tags: [string];
}

interface CardProps {
  repository: RepositoryStarred;
}

interface Modal {
  show: boolean;
  _id: string;
  name: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ repository }) => {
  const [modal, setModal] = useState<Modal>({} as Modal);

  const truncateString = useCallback((value, size = 40) => {
    let newValue;

    if (value && value.length > size) {
      newValue = `${value.substring(0, size - 3)}...`;
    }

    return newValue || value;
  }, []);

  useEffect(() => {
    if (modal.show === true) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'visible';
    }
  }, [modal]);

  return (
    <>
      <div className="repo__card">
        <div>
          <h3 title={repository.name}>{truncateString(repository.name, 15)}</h3>
          <p title={repository.description}>{truncateString(repository.description)}</p>
          <div>
            {repository.tags.map(tag => (
              <small key={tag}>{tag}</small>
            ))}
          </div>
        </div>
        <section>
          <a href={repository.url} target="_blank" rel="noopener noreferrer">
            See repo <FiChevronRight />
          </a>
          <button
            onClick={() =>
              setModal({
                show: true,
                _id: repository._id,
                name: repository.name,
                value: repository.tags.join(', '),
              })
            }
          >
            Edit tags
          </button>
        </section>
      </div>

      <Modal
        onShow={modal.show}
        onHide={() => setModal({} as Modal)}
        id={modal._id}
        name={modal.name}
        value={modal.value}
      />
    </>
  );
};

export default Card;
