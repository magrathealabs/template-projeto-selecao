import React from 'react';

import Repo from '../Repo';

const RepoList = ({ repositories = [], loading = true }) => {
    return (
        <div id='repo-list' className='container-sm'>
            {loading && (
                <div className='text-center anim-fade-in'>
                    <h2 className='mt-4'>
                        <span>Loading</span>
                        <span className='AnimatedEllipsis'></span>
                    </h2>
                </div>
            )}

            {repositories.map((repo) => (
                <Repo key={repo.id} id={repo.id} name={repo.name} description={repo.description} url={repo.html_url} language={repo.language} />
            ))}

            {!loading && repositories.length === 0 && (
                <div className='blankslate text-center anim-fade-in'>
                    <h3 className='mb-1'>Hmmm, parece que voce não adicionou nenhuma estrela!</h3>
                    <p>Adicione estrelas em alguns repositórios e depois volte aqui.</p>
                    <a href='https://github.com/trending'>Ver repositórios</a>
                </div>
            )}
        </div>
    );
};

export default RepoList;
