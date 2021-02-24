import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import GitCard from '../card/GitCard';
import './Deck.css';

export default props => {

    return (
        <CardDeck className="Card-folder">
            {props.repos.length ? props.repos.map((repo, i) => {
                return (
                    <GitCard
                        key={i}
                        id={repo.rid}
                        repository={repo.name}
                        author={repo.owner}
                        readme={repo.description}
                        tags={repo.tags || []}
                        url={repo.url}
                        user={props.user}
                    />
                )
            }) : (
                    <Card className="Flex-card"  >
                        <Card.Title>Empty</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Search for an user</Card.Subtitle>
                        <Card.Text className="Content mb-2">
                            This card may show up if the user has not starred any repositories :(
                        </Card.Text>
                    </Card>
                )}
        </CardDeck>
    )
}