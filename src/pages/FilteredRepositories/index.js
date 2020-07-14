import React, { useContext, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import apiDB from '../../services/apiDB';

import { AuthContext } from "../../App";
import Header from '../../components/Header';
import { Wrapper } from './styles';

const FilteredRepositories = () => {

  const history = useHistory();
  const {state, dispatch} = useContext(AuthContext);
  const [repositoryWithTags, setRepositoryWithTags] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [inputFilter, setInputFilter] = useState([]);

  let currentID = '';

  useEffect(() => {
    const id = state.user.id;
    if(inputFilter.length > 0) {

      async function loadFilteredRepositories() {
        const { data } = await apiDB.get(`starred-repositories/${inputFilter}/${id}/`);
        setFilteredRepositories(data)
      }

      loadFilteredRepositories();
      setInputFilter([])
    }

  }, [filteredRepositories, inputFilter, state.user.id])

  async function handleAddTag(event) { 
    try {
      let user_id = String(state.user.id);
      let repo_id = event.target.parentNode.parentNode.id;
      let description = event.target.parentNode.parentNode.dataset.description;
      let name = event.target.parentNode.parentNode.dataset.name;
      let url = event.target.parentNode.parentNode.dataset.url;
      let tags = prompt(`insert tag name`);

      if(tags) {
        tags = tags.toUpperCase();
        let data = {
          user_id,
          repo_id,
          tags,
          description,
          name,
          url
        }
        
        const response = await apiDB.post('/starred-repositories', data);
        let { id, repo_id: repo, tags: tagRepo } = response.data;
        
        const newTags = {
          id,
          repo,
          tagRepo
      }

      const filter = document.querySelector('form input').value;
      setInputFilter(filter);
      setRepositoryWithTags([...repositoryWithTags, newTags]);
    }
    } catch (error) {
      alert('this tag already exists!')
    }
    
    
  }

  async function handleEditTag() {
    try {
      let tags = document.querySelector('.modal-edit-delete input').value
      tags = tags.toUpperCase();

      if(!tags) {
        alert('Enter a tag name')
        return
      }
      let data = {
        id: currentID,
        tags
      }
      
      const response = await apiDB.put(`/starred-repositories`, data )
      let { id, repo_id: repo, tags: tagRepo } = response.data

      const newTags = {
        id,
        repo,
        tagRepo
      }

      if(response.status === 200) {
        handleCloseModal()
      }

      setRepositoryWithTags([...repositoryWithTags, newTags])
    } catch (error) {
      alert('this tag already exists!')
    }

    
  }

  async function handleRemoveTag() {

    let id = currentID 
    const response = await apiDB.delete(`/starred-repositories/${id}`)

    if(response.status === 200) {
      handleCloseModal()
      const filter = document.querySelector('form input').value;
      setInputFilter(filter);
      
    }
  }

  function handleOpenModal(event) {

    currentID = event.target.dataset.id

    let wrapper = document.querySelector('.wrapper')
    let divModal = document.createElement('div');
    let div = document.createElement('div');
    let input = document.createElement('input');
    let btnEdit = document.createElement('button');
    let btnDelete = document.createElement('button');
    let btnExit = document.createElement('button');
    
    divModal.classList = 'modal-edit-delete';
    input.placeholder = 'Tag name';

    btnEdit.innerHTML = 'Edit';
    btnEdit.onclick = () => handleEditTag();

    btnDelete.innerHTML = 'Delete';
    btnDelete.onclick = () => handleRemoveTag();

    btnExit.innerHTML = 'x';
    btnExit.classList = 'close-modal'
    btnExit.onclick = () => handleCloseModal();

    div.appendChild(input)
    div.appendChild(btnEdit)
    div.appendChild(btnDelete)
    div.appendChild(btnExit)
    divModal.appendChild(div)
    wrapper.appendChild(divModal)
  }

  function handleCloseModal() {
    let modal = document.querySelector('.modal-edit-delete')
    modal.remove();
  }

  function handleFilter(event) {
    event.preventDefault()

    const filter = document.querySelector('form input').value;
    setInputFilter(filter);

    if(filter) {
      history.push('/filtered')
    } else {
      history.push('/starred-repositories')
    }

    setInputFilter(filter);
    
  }
  
  return (
    <Wrapper className='wrapper'>
      <Header />

      <div className='title-and-seach'>
        <h2 className='title'>Filtered Repositories</h2>
        
        <form onSubmit={handleFilter}>    
          <input 
            type='text'
            name='filter'
            placeholder='Search tags'  
          />
        </form>    
      </div>
 
      { filteredRepositories.length > 0 ? filteredRepositories.map(repository => (   
    
        <div 
          key={repository.tags} 
          className='box-repositories' 
          id={repository.repo_id} 
          data-description={repository.description}
          data-name={repository.name}
          data-url={repository.url}>
          <p><span>ID:</span> {repository.repo_id}</p>
          <p><span>Name:</span> {repository.name}</p>
          <p><span>Description:</span> {repository.description}</p>
          <p><span>Link:</span> <a href={repository.url} target='_blank' rel="noopener noreferrer">{repository.name}</a> </p>

          <div className='box-btn-tags'>
            <button onClick={handleAddTag}>add tag</button>
            <div data-test={repository.id} className='box-tags'>
                
              <span 
                key={repository.id} 
                data-id={repository.id}
                data-user_id={state.user.id}
                data-repo_id={repository.id}
                data-tags={repository.tags}
                onClick={handleOpenModal}
                >
                  {repository.tags}
              </span>  

            </div>
          </div>
        </div>
      ))
    
    : <div className='box-repositories'>No repository found!</div>}
    </Wrapper>
  )
}

export default FilteredRepositories;