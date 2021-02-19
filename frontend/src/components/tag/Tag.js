import React, { useState } from 'react';
import { Badge, Toast } from 'react-bootstrap';
import './Tag.css';
import { useAuth } from '../../context/authContext';
import { api } from '../../services/api';

export default props => {

    const { signIn, signed, user } = useAuth();
    const [newTag, setNewTag] = useState('');
    const [showError, setShowError] = useState(false);

    const handleTag = (newTag) => {
        if (newTag.length > 10) {
            newTag = newTag.substring(0, 10);
        }
        setNewTag(newTag);
    }

    const handleSubmit = async (event) => {
        if (!signed) await signIn();
        
        if (event === 'Enter') {
            if (props.tags.find(f => f.text === newTag)) {
                setShowError(true);
                setTimeout(() => setShowError(false), 2000);
            }
            const payload = {
                name: user,
                key: props.cardKey,
                tag: newTag
            };

            api.post('/users/tag/add', payload)
            .then((res) => {
                props.tags.push({variant: '', text: newTag});
                setNewTag('');
            })
            .catch((e) => {
                setShowError(true);
                setTimeout(() => setShowError(false), 2000);
            });
        }
    }

    return (
    <>
    <div>{
        props.tags.map((tag, i) => {
            return (
                <Badge
                className="Tag"
                key={i}
                pill
                variant={tag.variant || "dark"}
                >
                {tag.text}
                </Badge>
            )
        })
    }
    </div>
    {console.log(props.user, user)}
    {props.user === user && 
        <div>
            <Badge className="NewTag" key="new" pill variant="input">
                <input 
                type="text" 
                placeholder="New Tag" 
                size={newTag.length ? newTag.length : 4} 
                value={newTag} 
                onChange={e => handleTag(e.target.value)}  
                onKeyDown={e => handleSubmit(e.key)}
                />
            </Badge>
        </div>
    }
        <Toast show={showError} animation={false}>
            <Toast.Header>
            <strong className="mr-auto">Bootstrap</strong>
            <small>OMG!!</small>
            </Toast.Header>
            <Toast.Body>Woohoo! We don't wanna repeat ourselves, do we?</Toast.Body>
        </Toast>

    </> 
    )
}