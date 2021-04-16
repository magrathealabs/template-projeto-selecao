import React from "react";
import Public from "./public"
import Private from "./private"
import {useAuth0} from "@auth0/auth0-react"


function Routes() {
    
    const {isAuthenticated, error} = useAuth0()
    console.log(error)
    if (isAuthenticated) {
        return <Private/>
    }
    return (
        <Public/>
    )
};

export default Routes