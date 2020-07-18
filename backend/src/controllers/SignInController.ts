import axios from 'axios';

import { Request, Response } from 'express';

export default class SignInController {
  public async auth(request: Request, response: Response) {
    const { code } = request.params;

    if (!code) {
      return response.status(404).json({
        message: 'Não foi possível recuperar o código de acesso.',
      });
    }

    try {
      const responseToken = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const token = responseToken.data.access_token;

      const responseUser = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      const user = {
        id: responseUser.data.id,
        avatarUrl: responseUser.data.avatar_url,
        name: responseUser.data.name,
        login: responseUser.data.login,
        followers: responseUser.data.followers,
        following: responseUser.data.following,
      };

      return response.status(200).json({ token, user });
    } catch (error) {
      return response.status(404).json({ error });
    }
  }
}
