import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './Card.css';

export default (props) => {

    const renderTag = (tag, i) => {
        return (
            <Badge
            className="Tag"
            pill
            variant={tag.variant}
            index={i}>
                {tag.text}
            </Badge>
        );
    };

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
                    {props.tags.map((tag, i) => renderTag(tag, i))}
                </div>
            </Card.Body>
        </Card>
    </>
    );
}