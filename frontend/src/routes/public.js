import React from "react";
import { Switch, Route} from "react-router-dom";
import Signup from "../pages/signup";
import { TagsGitHubProvider } from "../hooks/index";

function Public() {
    return (
        <TagsGitHubProvider accessToken = "">
            <Switch>
                <Route path="/" exact component={Signup} />
            </Switch>
        </TagsGitHubProvider>
    )
};

export default Public