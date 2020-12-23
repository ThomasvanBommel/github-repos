/**
 * GitHub repo grabber
 * @author Thomas vanBommel
 * @since 12-21-2020
 */
const https = require("https");

class GitHubRepos {
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
  constructor(options){
    // ensure proper options object
    if(!options.user) throw "Missing options.user...";
    if(!options.token) throw "Missing options.token...";

    // add sort + order if required
    if(!options.sort) options.sort = "updated";
    if(!options.order) options.order = "desc";

    // set up github api options
    options.hostname = "api.github.com";
    options.port = 443;
    options.path = `/user/repos?sort=${options.sort}&order=${options.order}`;
    options.method = "GET";
    options.headers = {
      "User-Agent": options.user,
      "Authorization": `token ${options.token}`
    };

    // add options to this object + set repos to empty list
    this.options = options;
    this.repos = [];

    // update once, and again every (default 1h)
    this.update();
    setInterval(this.update, options.interval ? options.interval : 3600000);
  }

  /** Update repositories */
  update = () => {
    // create request
    let req = https.request(this.options, res => {
      // get number of remaining api calls
      let remaining = res.headers["x-ratelimit-remaining"];
      let data = ""; // accumulative data

      // log headers if they are not "200 OK"
      if(res.headers.status != "200 OK") console.log(res.headers);

      // accumulate data
      res.on("data", d => { data += d; });

      // end of transmission; parse data
      res.on("end", () => {
        this.repos = JSON.parse(data);
        console.log(`${new Date().toISOString()} Updated GitHub Repositories (remaining: ${remaining})`);
      });
    });

    // log errors and send request
    req.on("error", err => { console.error(err); });
    req.end();
  };

  /**
   * Express middleware (adds repos to req.github_repos)
   * @param {Object} req - Express request "req" object
   * @param {Object} res - Express response "res" object
   * @param {Object} next - Express "next" middleware object
   */
  middleware = (req, res, next) => {
    req.github_repos = this.repos;
    next();
  };
}

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
module.exports = options => {
  return new GitHubRepos(options).middleware;
};
