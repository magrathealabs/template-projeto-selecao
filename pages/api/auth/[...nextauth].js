import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.DOMAIN || 'http://localhost:3000',
  secret: `iamapotato`,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}

export default (req, res) => NextAuth(req, res, options)
