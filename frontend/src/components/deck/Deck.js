import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from '../card/Card';
import './Deck.css';

export default props => {
    return (
        <CardDeck className="Card-folder">
            {props.repos.map((repo, i) => {
                return (
                    <Card
                    index={i}
                    repository={repo.repository}
                    author={repo.author}
                    readme={repo.readme}
                    tags={repo.tags}
                    />
                )
            })}
        </CardDeck>
    )
}