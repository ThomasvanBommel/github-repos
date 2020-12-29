/**
 * GitHub repo + profile grabber for Express
 * @author Thomas vanBommel
 * @since 12-29-2020
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
    this.profile = {};

    let interval = options.interval ? options.interval : 3600000;

    // update once, and again every (default 1h)
    this.update();
    setInterval(this.update, interval);

    this.updateProfile();
    setInterval(this.updateProfile, interval);
  }

  /** Update repositories */
  update = () => {
    this.sendRequest(this.options, data => {
      this.repos = JSON.parse(data);
      console.log(`${new Date().toISOString()} Updated GitHub Repositories`);
    });
  };

  /** Update user profile */
  updateProfile = () => {
    this.sendRequest({ ...this.options, path: "/user"}, data => {
      this.profile = JSON.parse(data);
      console.log(`${new Date().toISOString()} Updated GitHub Profile`);
    });
  };

  /**
   * callback
   * @callback
   * @param {string} data - Response data as a string
   */
  /**
   * Send API request
   * @param {Object} options - GitHubRepos options
   * @param {string} options.user - GitHub username (User Agent)
   * @param {string} options.token - GitHub API access token
   * @param {string} [options.sort="updated"] - How to sort repositories
   *  one of (interactions, reactions, author-date, committer-date, updated)
   * @param {string} [options.order="desc"] - How to order repositories
   * @param {integer} [options.interval=3600000] - Update interval (default 1h)
   * @param {callback} callback - Response callback
   */
  sendRequest = (options, callback) => {
    let req = https.request(options, res => {
      let data = "";

      // log headers if they are not "200 OK"
      if(res.headers.status != "200 OK") console.log(res.headers);

      // accumulate data
      res.on("data", d => { data += d; });

      // end of transmission; parse data
      res.on("end", () => {
        callback(data);
      });
    });

    // log errors and send request
    req.on("error", err => { console.error(err); });
    req.end();
  };

  /**
   * Express middleware (adds repos and profile to req.github)
   * @param {Object} req - Express request "req" object
   * @param {Object} res - Express response "res" object
   * @param {Object} next - Express "next" middleware object
   */
  middleware = (req, res, next) => {
    req.github = {
      profile: this.profile,
      repos: this.repos
    };
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
