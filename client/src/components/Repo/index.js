import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatableSelect from 'react-select/creatable';

import { Creators as TagActions } from '../../store/ducks/tags';
import './styles.scss';

const Repo = ({ id, name, description, url, language = '' }) => {
    const allTags = useSelector((state) => state.tags.list);
    const repoTags = useSelector((state) => state.tags[id]);

    const [value, setValue] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [activeTags, setActiveTags] = useState([]);
    const dispatch = useDispatch();

    let options = allTags.map((tag) => ({ value: tag, label: tag }));
    const lowerLanguage = language.toLowerCase();
    if (allTags.indexOf(lowerLanguage) === -1 && lowerLanguage) {
        options.unshift({ value: lowerLanguage, label: lowerLanguage });
    }

    const onInputChange = (value) => value.toLowerCase();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const updateTags = (e) => {
        e.preventDefault();

        let selected = [];
        if (value && value.length) {
            selected = value.map((labels) => labels.value.trimEnd());
        }

        setActiveTags(selected);
        dispatch(TagActions.setTags(selected));
        dispatch(TagActions.setRepoTags(id, selected));
        setEditMode(false);
    };

    useEffect(() => {
        if (repoTags != undefined) {
            const formattedTags = repoTags.map((tag) => ({ value: tag, label: tag }));
            setValue(formattedTags);
            setActiveTags(repoTags);
        }
    }, [repoTags]);

    return (
        <div key={id} className='Box mb-4 mt-4 anim-fade-in repo'>
            <div className='Box-header'>
                <span className='Box-title'>{name}</span>
                <span className='Label Label--outline float-right'>id: {id}</span>
            </div>
            <div className='Box-body'>
                <p>{description}</p>
            </div>

            <div className='Box-body'>
                <div className={`tag-list ${!editMode ? 'show' : ''}`}>
                    <div className='col-12'>
                        <span className='Box-title'>Tags</span>
                        <span className='Box-btn-octicon btn-octicon float-right' onClick={() => setEditMode(true)}>
                            <svg className='octicon octicon-pencil' viewBox='0 0 14 16' version='1.1' width='14' height='16' aria-hidden='true'>
                                <path
                                    fillRule='evenodd'
                                    d='M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z'
                                ></path>
                            </svg>
                        </span>
                    </div>
                    <div className='col-12'>
                        {activeTags.map((tag) => (
                            <span key={tag} className='Label Label--outline mr-1' title={tag}>
                                {tag}
                            </span>
                        ))}

                        {activeTags.length === 0 && <span className='text-gray-light'> Nenhuma tag selecionada</span>}
                    </div>
                </div>
                <div className={`tag-actions ${editMode ? 'show' : ''}`}>
                    <div className='form-group'>
                        <div className='form-group-header'>
                            <label htmlFor='tag-select'>Tags</label>
                        </div>
                        <div className='form-group-body'>
                            <CreatableSelect
                                id='tag-select'
                                isMulti
                                onChange={handleChange}
                                onInputChange={onInputChange}
                                placeholder='Digite ou selecione uma tag'
                                noOptionsMessage={() => 'Todas as tag selecionadas'}
                                value={value}
                                options={options}
                            />
                        </div>
                    </div>

                    <div className='form-actions'>
                        <button type='button' className='btn btn-primary' onClick={updateTags}>
                            Save changes
                        </button>
                        <button type='button' className='btn' onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className='Box-footer text-right'>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                    Ver no Github
                </a>
            </div>
        </div>
    );
};

export default Repo;
