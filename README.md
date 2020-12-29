# github-repos

Express middleware to grab repository information from GitHubs REST API.

Uses GitHub API to pull repositories sorted and orders in a specified way.

## JDoc
```js
/**
 * Grab GitHub repositories
 * @param {Object} options - GitHubRepos options
 * @param {string} options.user - GitHub username (User Agent)
 * @param {string} options.token - GitHub API access token
 * @param {string} [options.sort="updated"] - How to sort repositories
 *  one of (interactions, reactions, author-date, committer-date, updated)
 * @param {string} [options.order="desc"] - How to order repositories
 * @param {integer} [options.interval=3600000] - Update interval (default 1h)
 * @throws Missing options.user...
 * @throws Missing options.token...
 */
```

## Usage

```js
const GitHub = require("@cekeh/github-repos");
const express = require("express");

let app = express();

app.use(GitHub({
  user: "ThomasvanBommel",
  token: "authentication-token"
}));

app.get("*", (req, res) => {
  console.log(req.github);
});

app.listen(8000);
```

### Example Output
```js
{
  profile: {
    login: 'ThomasvanBommel',
    id: 39364535,
    node_id: 'MDQ6VXNlcjM5MzY0NTM1',
    avatar_url: 'https://avatars3.githubusercontent.com/u/39364535?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/ThomasvanBommel',
    html_url: 'https://github.com/ThomasvanBommel',
    followers_url: 'https://api.github.com/users/ThomasvanBommel/followers',
    following_url: 'https://api.github.com/users/ThomasvanBommel/following{/other_user}',
    gists_url: 'https://api.github.com/users/ThomasvanBommel/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/ThomasvanBommel/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/ThomasvanBommel/subscriptions',
    organizations_url: 'https://api.github.com/users/ThomasvanBommel/orgs',
    repos_url: 'https://api.github.com/users/ThomasvanBommel/repos',
    events_url: 'https://api.github.com/users/ThomasvanBommel/events{/privacy}',
    received_events_url: 'https://api.github.com/users/ThomasvanBommel/received_events',
    type: 'User',
    site_admin: false,
    name: null,
    company: null,
    blog: 'https://cekeh.com',
    location: 'Nova Scotia',
    email: null,
    hireable: true,
    bio: null,
    twitter_username: 'cekeh_',
    public_repos: 21,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2018-05-17T06:29:16Z',
    updated_at: '2020-12-29T20:37:09Z'
  },
  repos: [
    {
      id: 321590382,
      node_id: 'MDEwOlJlcG9zaXRvcnkzMjE1OTAzODI=',
      name: 'transport-layer-security',
      full_name: 'ThomasvanBommel/transport-layer-security',
      private: false,
      owner: [Object],
      html_url: 'https://github.com/ThomasvanBommel/transport-layer-security',
      description: 'This is a JavaScript module created for use with NodeJS that loads TLS certificates from the filesystem for use with the https module. This module will also generate self signed certificates for "localhost" when no certificates are found in the prescribes location. (uses openssl from the command line)',
      fork: false,
      url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security',
      forks_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/forks',
      keys_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/keys{/key_id}',
      collaborators_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/teams',
      hooks_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/hooks',
      issue_events_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/issues/events{/number}',
      events_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/events',
      assignees_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/assignees{/user}',
      branches_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/branches{/branch}',
      tags_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/tags',
      blobs_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/git/blobs{/sha}',
      git_tags_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/git/tags{/sha}',
      git_refs_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/git/refs{/sha}',
      trees_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/git/trees{/sha}',
      statuses_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/statuses/{sha}',
      languages_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/languages',
      stargazers_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/stargazers',
      contributors_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/contributors',
      subscribers_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/subscribers',
      subscription_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/subscription',
      commits_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/commits{/sha}',
      git_commits_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/git/commits{/sha}',
      comments_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/comments{/number}',
      issue_comment_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/issues/comments{/number}',
      contents_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/contents/{+path}',
      compare_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/merges',
      archive_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/{archive_format}{/ref}',
      downloads_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/downloads',
      issues_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/issues{/number}',
      pulls_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/pulls{/number}',
      milestones_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/milestones{/number}',
      notifications_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/notifications{?since,all,participating}',
      labels_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/labels{/name}',
      releases_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/releases{/id}',
      deployments_url: 'https://api.github.com/repos/ThomasvanBommel/transport-layer-security/deployments',
      created_at: '2020-12-15T07:43:23Z',
      updated_at: '2020-12-29T21:42:16Z',
      pushed_at: '2020-12-29T21:42:14Z',
      git_url: 'git://github.com/ThomasvanBommel/transport-layer-security.git',
      ssh_url: 'git@github.com:ThomasvanBommel/transport-layer-security.git',
      clone_url: 'https://github.com/ThomasvanBommel/transport-layer-security.git',
      svn_url: 'https://github.com/ThomasvanBommel/transport-layer-security',
      homepage: null,
      size: 4,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: [Object],
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'main',
      permissions: [Object],
      type: 'github',
      date: 2020-12-29T21:42:16.000Z
    },
    /* ... */
  ]
}
```
