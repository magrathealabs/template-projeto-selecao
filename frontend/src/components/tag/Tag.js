import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './Tag.css';

export default props => {
    return (
    <>{
        props.tags.map((tag, i) => {
            return (
                <Badge
                className="Tag"
                index={i}
                pill
                variant={tag.variant}
                >
                {tag.text}
                </Badge>
            )
        })
    }</>
    )
}