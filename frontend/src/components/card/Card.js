import React from 'react';
import Card from 'react-bootstrap/Card';
import Tag from '../tag/Tag'
import './Card.css';

export default (props) => {
    return (
    <>
        <Card className="Flex-card">
            <Card.Body>
                <Card.Title>{props.repository}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
                <Card.Text className="Content">
                    {props.readme}
                </Card.Text>
                <div>
                    <Tag tags={props.tags}/>
                    {/* {props.tags.map((tag, i) => renderTag(tag, i))} */}
                </div>
            </Card.Body>
        </Card>
    </>
    );
}