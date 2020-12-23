# github-repos

Express middleware to grab repository information from GitHubs REST API.

Uses GitHub API to pull repositories sorted and orders in a specified way.

## Params
```js
/**
 * Grab GitHub repositories
 * @param {Object} options - GitHubRepos options
 * @param {string} options.user - GitHub username (User Agent)
 * @param {string} options.token - GitHub API access token
 * @param {string} [options.sort="updated"] - How to sort repositories
 * @param {string} [options.order="desc"] - How to order repositories
 * @param {integer} [options.interval=3600000] - Update interval (default 1h)
 */
```

## Usage

```js
const GitHub = require("./modules/github-repos/github-repos");
const express = require("express");

let app = express();

app.use(GitHub({
  user: "ThomasvanBommel",
  token: "authentication-token"
}));

app.get("*", (req, res) => {
  console.log(req.github_repos);
});

app.listen(8000);
```
