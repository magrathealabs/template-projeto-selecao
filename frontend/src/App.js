import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import CardDeck from './components/deck/Deck';
import './App.css';

function App() {

    const [repos, setRepos] = useState({cards: [], user: undefined});
    
    return (
        <div className="App">
            <Navbar setRepos={setRepos}/>
            <div className="Folder-folder">
                <CardDeck repos={repos.cards} user={repos.user} />
            </div>
        </div>
    );
}

export default App;
