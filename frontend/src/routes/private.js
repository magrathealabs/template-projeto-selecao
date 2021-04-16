import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Main from "../pages/main";
import { TagsGitHubProvider } from "../hooks/index";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../services/api";
import FinishSignUp from "../pages/finishSignup";

function Private() {
    const { getAccessTokenSilently } = useAuth0()
    const [accessToken, setAccessToken] = useState("")
    const history = useHistory()

    useEffect(() => {
        async function load() {
            try {
                const token = await getAccessTokenSilently({
                    audience: process.env.AUTH0_AUDIENCE
                })
                setAccessToken(token)
                await api.get("auth/",
                    { headers: { Authorization: (api.defaults.headers.Authorization = `Bearer ${token}`) } })

            } catch (error) {
                history.push("/finish")
            }
        }
        load()
    }, [getAccessTokenSilently, history])

    return (
        <TagsGitHubProvider accessToken={accessToken}>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/finish" exact component={FinishSignUp} />
            </Switch>
        </TagsGitHubProvider>
    )
};

export default Private

