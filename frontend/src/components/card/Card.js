import React from 'react';
import Card from 'react-bootstrap/Card';
import Tag from '../tag/Tag'
import './Card.css';

export default (props) => {
    return (
    <>
        <Card className="Flex-card" onClick={props.url ? () => window.open(props.url, "_blank") : () => {}}>
            <Card.Body>
                <Card.Title>{props.repository}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
                <Card.Text className="Content">
                    {props.readme}
                </Card.Text>
                <div>
                    <Tag tags={props.tags}/>
                </div>
            </Card.Body>
        </Card>
    </>
    );
}