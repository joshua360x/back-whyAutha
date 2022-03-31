const { getGithubProfile, exchangeCodeForToken } = require('../utils/github');
const GithubUser = require('../models/GithubUser');

module.exports = class GitUserService {
  static async create(code) {
    const tokenThatIsNeeded = await exchangeCodeForToken(code);

    const userProfile = await getGithubProfile(tokenThatIsNeeded);
    const { login, avatar_url, email } = userProfile;

    console.log('userProfile :>> ', userProfile);

    let user = await GithubUser.findByUsername(userProfile.username);

    if (!user) {
      user = await GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }
    return user;
  }
};
