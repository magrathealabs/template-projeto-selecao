const axios = require('axios');

export interface userStarred {
    id: string,
    owner: string;
    name: string;
    description: string;
    url: string;
    tags: [{
        variant: string,
        text: string
    }]
};

export async function getStarredRepos(name: string): Promise<userStarred[]> {
    // const opts = { headers: { Authorization: `bearer  ${_token}` } };
    const results = await axios.get(`https://api.github.com/users/${name}/starred`);
    
    return results.data.map(({ id, owner, name, description }) => { 
        return { 
            id, 
            owner: owner.login, 
            name, 
            description, 
            url: `https://github.com/${owner.login}/${name}` 
        }
    });
}