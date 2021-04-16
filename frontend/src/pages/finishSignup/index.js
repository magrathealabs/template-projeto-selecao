import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Container, Content, Background} from './styles'




function FinishSignUp() {
    const history = useHistory();
    const [githubNickname, setGithubNickname] = useState("");
    async function handleSignUp() {
        const formData = {
            github_nickname: githubNickname,
        };
        try {
            await api.post('/auth/', formData);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Background />
            <Content>
                <input onChange={(e) => setGithubNickname(e.target.value)}
                 placeholder= "Github Nickname"/>
                <button onClick = {() => handleSignUp()}>
                    Set Nickname
                </button>
            </Content>
        </Container>
    );
};
export default FinishSignUp;
