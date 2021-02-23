import axios from 'axios';
import { HttpStatus } from '@nestjs/common';
import { UserStarred } from '../schemas/users.schema';


export interface IGetStarredRepos {
    repos: UserStarred[],
    etag: string
}

export async function getStarredRepos(name: string, etag: string): Promise<IGetStarredRepos> {

    const results = await axios({
        url: `https://api.github.com/users/${name}/starred?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'If-None-Match': `"${etag}"`
        }
    });

    if (results.status === HttpStatus.OK) {

        const repos = results.data.map(({ id, owner, name, description }) => {
            return {
                id,
                owner: owner.login,
                name,
                description,
                url: `https://github.com/${owner.login}/${name}`
            }
        });

        return {
            repos,
            etag: results.headers['etag']
        };
    }

    if (results.status === HttpStatus.NOT_MODIFIED) {
        return {
            repos: undefined,
            etag: undefined
        }
    }

    throw new Error(`Failed to retrieve github data for user ${name}`);

}

export function filterAndSort(repos: UserStarred[], filter: string) {
    return repos
        .filter(repo =>
            repo.tags.filter(tag =>
                tag?.text?.startsWith(filter)
            ).length
        )
        .sort((r1, r2) => {
            const tag1 = r1.tags.find(t => t?.text.startsWith(filter))?.text || "";
            const tag2 = r2.tags.find(t => t?.text.startsWith(filter))?.text || "";
            return tag1.length - tag2.length;
        });
}