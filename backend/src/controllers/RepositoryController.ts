import axios from 'axios';

import { Request, Response } from 'express';

import Repository from '../models/Repository';

import parseStringAsArray from '../utils/parseStringAsArray';

interface RepositoryStarred {
  id: number;
  user: number;
  name: string;
  description: string;
  html_url: string;
  tags: [string];
}

export default class RepositoryController {
  public async listRepositories(request: Request, response: Response) {
    const { authorization, id, login } = request.headers;
    const { filter } = request.query;

    if (!authorization) {
      return response.status(401).json({
        message: 'Token de acesso inválido.',
      });
    }

    if (filter) {
      try {
        const repositories = await Repository.find({
          user: id,
          tags: new RegExp(filter.toString(), 'i'),
        });

        return response.status(200).json(repositories);
      } catch (error) {
        return response.status(404).json(error);
      }
    }

    const repositories = await Repository.find({ user: id });

    if (repositories.length === 0) {
      try {
        const starred = await axios.get(
          `https://api.github.com/users/${login}/starred`,
        );

        const repositoriesStarred = starred.data.map(
          (repository: RepositoryStarred) => ({
            id: repository.id,
            user: Number(id),
            name: repository.name,
            description: repository.description,
            url: repository.html_url,
            tags: [],
          }),
        );

        const repositories = await Repository.insertMany(repositoriesStarred);

        return response.status(200).json(repositories);
      } catch (error) {
        return response.status(404).json(error);
      }
    }

    return response.status(200).json(repositories);
  }

  public async updateTagsAtRepository(request: Request, response: Response) {
    const { authorization } = request.headers;
    const { id } = request.params;
    const { tags } = request.body;

    if (!authorization) {
      return response.status(404).json({
        message: 'Token de acesso inválido.',
      });
    }

    try {
      const parsedTagsAsArray = parseStringAsArray(tags);

      const repositoryUpdated = await Repository.updateOne(
        { _id: id },
        { $set: { tags: parsedTagsAsArray } },
      );

      return response.status(200).json(repositoryUpdated);
    } catch (error) {
      return response.status(404).json(error);
    }
  }
}
