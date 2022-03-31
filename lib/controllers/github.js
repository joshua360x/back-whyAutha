const { Router } = require('express');

const authenticate = require('../middleware/authenticate');
// const GithubUser = require('../models/GithubUser');
const GitUserService = require('../services/GitUserService');
// const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const { signWebToken } = require('../utils/jwt');
const One_Day_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    // TODO: Kick-off the github oauth flow
    // res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user`);

    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })
  .get('/login/callback', async (req, res) => {
    /*
      TODO:
     * get code
     * exchange code for token
     * get info from github about user with token
     * get existing user if there is one
     * if not, create one
     * create jwt
     * set cookie and redirect
     */
    // console.log(req);
    // console.log(req.params);
    // res.redirect('/');
    const codeThatWillbeRetrieved = req.query.code;
    // console.log(req.query);

    const userThatisFromGitHub = await GitUserService.create(
      codeThatWillbeRetrieved
    );
    // console.log('profile should have this --------> ', storeGitHubUserProfile);
    // const { login, avatar, email } = storeGitHubUserProfile;
    const payload = signWebToken(userThatisFromGitHub);
    console.log('payload :>> ', payload);
    res.cookie(process.env.COOKIE_NAME, payload, {
      httpOnly: true,
      maxAge: One_Day_MS,
    }).redirect('/api/v1/github/dashboard');
  })

  .get('/dashboard', authenticate, async (req, res) => {
    // require req.user
    // get data about user and send it as json
    // try {
    //   if (req.user) {
    res.json(req.user);
    //   }
    // } catch (error) {
    //   next(error);
    // }
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
