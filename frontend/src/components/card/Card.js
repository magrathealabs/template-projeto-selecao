import React from 'react';
import Card from 'react-bootstrap/Card';
import Tag from '../tag/Tag'
import './Card.css';

export default (props) => {

    return (
    <>
        <Card className="Flex-card"  >
            <Card.Body onClick={props.url ? () => window.open(props.url, "_blank") : () => {}} >
                <Card.Title>{props.repository}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
                <Card.Text className="Content">
                    {props.readme}
                </Card.Text>
            </Card.Body>
            <div className="tags">
                <Tag tags={props.tags} user={props.user} cardKey={props.author + '/' + props.id} />
            </div>
        </Card>
    </>
    );
}