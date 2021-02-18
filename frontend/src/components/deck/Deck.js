import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from '../card/Card';
import './Deck.css';

export default props => {

    return (
        <CardDeck className="Card-folder">
            {props.repos.length ? props.repos.map((repo, i) => {
                return (
                    <Card
                    key={i}
                    id={repo.id}
                    repository={repo.name}
                    author={repo.owner}
                    readme={repo.description}
                    tags={repo.tags || [""]}
                    url={repo.url}
                    user={props.user}
                    />
                )
            }) : (<Card
                key={0}
                repository={"Oops"}
                author={"Not found"}
                readme={"This user has not starred any repositories :/"}
                tags={[{text: 'No'}, {text: 'Stars'}, {text:'*'}, {text: ':('}]}
            />)} 
        </CardDeck>
    )
}