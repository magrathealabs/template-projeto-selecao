import React from 'react';

const Repo = ({ id, name, description, url }) => {
    return (
        <div key={id} className='Box mb-4 mt-4 anim-fade-in'>
            <div className='Box-header'>
                <span className='Box-title'>{name}</span>
                <span className='Label Label--outline float-right'>id: {id}</span>
            </div>
            <div className='Box-body'>
                <p>{description}</p>
            </div>
            <div className='Box-footer text-right'>
                <a href={url} target='_blank'>
                    Ver no Github
                </a>
            </div>
        </div>
    );
};

export default Repo;
