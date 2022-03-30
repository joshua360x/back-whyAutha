const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // TODO: Implement me!
  const tokenThatWillTakeCodeQuery = await fetch(
    'https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //look into why POST request query param is written this way
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      }),
    }
  );
  const json1 = await tokenThatWillTakeCodeQuery.json();
  const accessTokenThatIsTakenFromToken = json1.access_token;

  return accessTokenThatIsTakenFromToken;
};

const getGithubProfile = async (token) => {
  // TODO: Implement me!
  const storeGitHubUserProfile = await fetch(
    'https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${accessTokenThatIsTakenFromToken}`,
      },
    }
  );
};

module.exports = { exchangeCodeForToken, getGithubProfile };
