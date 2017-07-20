const express = require('express');
const router = express.Router();
const axios = require('axios');
const titlify = require('title-case');
const boom = require('boom')

router.get('/', (req, res, next) => {
  let img;

  axios.get('https://gist.githubusercontent.com/brianjleeofcl/3e195fe45a71373f33ba2de1e022893b/raw/projects.txt').then(({data}) => {
    const projects = data.replace(/\$/g, 'brianjleeofcl').split('\n').map(str => str.split(' '));
    img = projects.map(project => project[1])
    const promises = projects.map(project => {
      return axios.get(`https://api.github.com/repos/${project[0]}`, {
        auth: {
          username: 'brianjleeofcl',
          password: process.env.GITHUB_ACCESS
        }
      })
    });

    return Promise.all(promises)
  }).then(results => {
    const projects = results.map(({data}, i) => {
      const { html_url, homepage, name, description } = data
      const title = titlify(name);
      const url = {
        github: html_url,
        site: homepage
      }
      const res = { title, desc: description, url };
      if (img[i]) res.img = img[i];
      return res
    });
    res.set('Access-Control-Allow-Origin', '*')
    res.send(projects);
  }).catch(err => {
    console.error(err)
    res.next(boom.badImplementation(err.message, err))
  });
});

module.exports = router;