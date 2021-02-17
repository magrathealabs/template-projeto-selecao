import React, { useState } from 'react';
import { Badge, Toast } from 'react-bootstrap';
import './Tag.css';
import { useAuth } from '../../context/authContext';
import api from '../../services/api';

export default props => {

    const { signIn, signed, signOut, user, sessionId } = useAuth();
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
        
        if (event == 'Enter') {
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
                setTimeout(() => setShowError(false), 5000);
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
                variant={tag.variant || "light"}
                >
                {tag.text}
                </Badge>
            )
        })
    }
    </div>
    {props.user != user ? <div></div> : 
        <div>
            <Badge className="NewTag" key="new" pill variant="success">
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
    <div style={{
        position: 'absolute',
        right: 0,
        bottom: 0
    }}>
        <Toast show={showError} animation={false}>
            <Toast.Header>
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    </div>
    </> 
    )
}