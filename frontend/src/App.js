import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from './components/card/Card';


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
            }
        ]
    );

    return (
        <div className="App">
            <Navbar/>
            <div className="Folder-folder">
                <CardDeck className="Card-folder">
                    <Card
                    repository="Test Repo"
                    author="unkown"
                    readme="Little experimental text to check if card is doing ok"
                    tags={tags}/>

                    <Card
                    repository="Test Repo"
                    author="unkown"
                    readme="Little experimental text to check if card is doing ok"
                    tags={tags}/>

                    <Card
                    repository="Test Repo"
                    author="unkown"
                    readme="Little experimental text to check if card is doing ok"
                    tags={tags}/>

                    <Card
                    repository="Test Repo"
                    author="unkown"
                    readme="Little experimental text to check if card is doing ok"
                    tags={tags}/>

                    <Card
                    repository="Test Repo"
                    author="unkown"
                    readme="Little experimental text to check if card is doing ok"
                    tags={tags}/>

                </CardDeck>
            </div>
        </div>
    );
}

export default App;
