import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import CardDeck from './components/deck/Deck';
import './App.css';

function App() {

    const [tags, setTags] = useState(
        [
            {
                variant:'secondary', 
                text: 'Javascript'
            },
            {
                variant:'success',
                text: 'C++'
            },
            {
                variant:'secondary',
                text: "Ana"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "Voce destruiu o meu ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },

            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },
            {
                variant:'light',
                text: "ovo"
            },

        ]
    );

    const [repos, setRepos] = useState([
        {
            repository: 'Repositorio 1',
            author: 'Autor 1',
            readme: 'Um pequeno texto para verificar se a Tag esta funcionando...',
            tags: tags.slice(Math.floor(Math.random()*7), Math.floor(7+Math.random()*7))
        },
        {
            repository: 'Repositorio 1',
            author: 'Autor 1',
            readme: 'Um pequeno texto para verificar se a Tag esta funcionando...',
            tags: tags.slice(Math.floor(Math.random()*7), Math.floor(7+Math.random()*7))
        },
        {
            repository: 'Repositorio 1',
            author: 'Autor 1',
            readme: 'Um pequeno texto para verificar se a Tag esta funcionando...',
            tags: tags.slice(Math.floor(Math.random()*7), Math.floor(7+Math.random()*7))
        },
        {
            repository: 'Repositorio 1',
            author: 'Autor 1',
            readme: 'Um pequeno texto para verificar se a Tag esta funcionando...',
            tags: tags.slice(Math.floor(Math.random()*7), Math.floor(7+Math.random()*7))
        }
        ]
    );

    return (
        <div className="App">
            <Navbar/>
            <div className="Folder-folder">
                <CardDeck repos={repos}/>
            </div>
        </div>
    );
}

export default App;
