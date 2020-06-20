import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

const SearchBox = (props) => {
    const allTags = useSelector((state) => state.tags.list);
    const allRepos = useSelector((state) => state.tags.repoTags);
    const [noResult, setNoResult] = useState(false);

    const handleChange = (tags) => {
        setNoResult(false);

        // Format tags
        let searchTags = tags !== null ? tags.map((item) => item.value) : [];

        let repoIds = [];
        for (let repoId in allRepos) {
            let currentRepo = allRepos[repoId];

            let ids = searchTags.map((tag) => {
                // Search by exact tag
                if (currentRepo.indexOf(tag) !== -1) {
                    return repoId;
                }

                //Search for partial tag
                let hasPartialOccurrence = currentRepo.map((repoTag) => repoTag.includes(tag));
                if (hasPartialOccurrence.indexOf(true) !== -1) {
                    return repoId;
                }
            });

            repoIds = [...repoIds, ...ids];
        }

        // Remove undefined
        var validIds = repoIds.filter(function (id) {
            return id != undefined;
        });

        if (!validIds.length && tags !== null && tags.length) {
            setNoResult(true);
        }

        props.onSearch(validIds);
    };

    const onInputChange = (value) => value.toLowerCase();

    const options = allTags.map((tag) => ({ value: tag, label: tag }));

    return (
        <div id='search-box'>
            <div className='Box mb-4 mt-4 anim-fade-in'>
                <div className='Box-header'>
                    <span className='Box-title'>Filtrar por tag</span>
                </div>

                <div className='Box-body'>
                    <div className='form-group'>
                        <div className='form-group-body'>
                            <CreatableSelect
                                id='tag-search'
                                isMulti
                                onChange={handleChange}
                                onInputChange={onInputChange}
                                placeholder='Digite ou selecione uma tag'
                                noOptionsMessage={() => 'Todas as tags selecionadas'}
                                formatCreateLabel={(value) => 'Pesquisar por ' + value}
                                options={options}
                            />
                            {noResult && <span className='text-orange-light'>Nenhum repositório encontrado</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
