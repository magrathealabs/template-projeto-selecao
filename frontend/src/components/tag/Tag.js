import React, { useEffect, useState } from 'react';
import { Badge, Toast } from 'react-bootstrap';
import './Tag.css';
import { useAuth } from '../../context/authContext';
import { api } from '../../services/api';

export default props => {

    const { signIn, signed, user } = useAuth();
    const [newTag, setNewTag] = useState('');
    const [showError, setShowError] = useState(false)

    const [disabled, setDisabled] = useState(props.tags.map(() => true));
    const [tagText, setTagText] = useState(props.tags.map(tag => tag.text));
    const [count, setCount] = useState(0);

    const handleTag = (newTag) => {
        if (newTag.length > 10) {
            newTag = newTag.substring(0, 10);
        }
        setNewTag(newTag);
    }
    const handleSubmit = async (event) => {
        if (!signed) await signIn();

        if (event === 'Enter') {
            // Prevent from calling Backend
            if (props.tags.find(f => f.text === newTag) !== undefined) {
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
                return;
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
                setTimeout(() => setShowError(false), 5000);
            });
        }
    }
    const handleDelete = async (oldTag) => {
        const payload = {
            name: user,
            key: props.cardKey,
            oldTag
        }

        api.post('/users/tag/delete', payload)
            .then((res) => {
                const tagIdx = props.tags.findIndex(f => f.text === oldTag);
                props.tags[tagIdx].text = '';
            })
    }
    const handleEdit = async (event, oldTag, newTag) => {
        if (event === 'Enter') {
            if (newTag.length === 0) return handleDelete(oldTag);

            // Prevent from calling Backend
            if (props.tags.find(f => f.text === newTag) !== undefined) {
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
                return;
            }
            const payload = {
                name: user,
                key: props.cardKey,
                oldTag,
                newTag
            };
            api.post('/users/tag/edit', payload)
            .then((res) => {
                const tagIdx = props.tags.findIndex(f => f.text === oldTag);
                props.tags[tagIdx].text = newTag;
            })
            .catch((e) => {
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
            });
        }
    }
    const handleTagText = async (text, key) => {
        let texts = tagText;
        texts[key] = text;
        setTagText(texts);
    }

    useEffect(() => {
    }, [count]);

    const handleDisabled = async (state, key) => {
        let d = disabled;
        d[key] = state;
        setDisabled(d);
        setCount(count+1);
    }

    return (
    <>
    <div>{
        props.tags
        .map((tag, i) => {
            if (tag.text.length !== 0)
            return (
                <Badge
                className="Tag"
                key={i}
                pill
                variant={tag.variant || "dark"}
                onClick={() => {handleDisabled(false, i)}}
                onMouseLeave={() => {handleDisabled(true, i)}}
                >
                <input 
                type="text"
                size={tag.text.length} 
                defaultValue={tag.text} 
                disabled={disabled[i]}
                onChange={e => {handleTagText(e.target.value, i)}}
                onKeyDown={e => {handleEdit(e.key, tag.text, tagText[i])}}
                />
                </Badge>
            )
        })
    }
    </div>
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
            <strong className="mr-auto">Error :O</strong>
            <small>OMG!!</small>
            </Toast.Header>
            <Toast.Body>Woohoo! We don't wanna repeat ourselves, do we?</Toast.Body>
        </Toast>

    </> 
    )
}