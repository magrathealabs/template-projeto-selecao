import React, { createContext, useState, useContext } from "react";
import api from "../services/api"

const TagsGitHubContext = createContext();


function TagsGitHubProvider({ children, accessToken }) {
    if (accessToken !== "") {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`
    }

    const [count, setCount] = useState(0);
    return (
        <TagsGitHubContext.Provider value={{ count, setCount, token: accessToken }}>
            {children}
        </TagsGitHubContext.Provider>
    )
}


function useTagsGitHub(){
    const context = useContext(TagsGitHubContext);
    

    if (!context){
        throw new Error ("useTagsGitHub must be used within a TagsGitHubProvider")
    }

    return context;
}


export { TagsGitHubProvider, useTagsGitHub }