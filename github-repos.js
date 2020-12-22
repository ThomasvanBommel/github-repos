/**
 * GitHub repo grabber
 * @author Thomas vanBommel
 * @since 12-21-2020
 */
const https = require("https");

class GitHubRepos {
  constructor(options){
    this.options = options;
    this.repos = [];

    this.update();
    setInterval(this.update, options.interval ? options.interval : 3600000);
  }

  update = () => {
    let req = https.request(this.options, res => {
      let data = "";
      let remaining = res.headers["x-ratelimit-remaining"];

      if(res.headers.status != "200 OK") console.log(res.headers);

      res.on("data", d => { data += d; });
      res.on("end", () => {
        this.repos = JSON.parse(data);
        console.log(`${new Date().toISOString()} Updated GitHub Repositories (remaining: ${remaining})`);
      });
    });

    req.on("error", err => { console.error(err); });

    req.end();
  };

  middleware = (req, res, next) => {
    req.github_repos = this.repos;
    next();
  };
}


module.exports = options => {
  return new GitHubRepos(options).middleware;
};
