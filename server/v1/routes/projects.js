const express = require('express');
const router = express.Router();
const axios = require('axios');
const titlify = require('title-case');
const boom = require('boom')

router.get('/', (req, res, next) => {
  let img;
  let projectsJSON;

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
    const imgPromises = [];

    projectsJSON = results.map(({data}, i) => {
      const { html_url, homepage, name, description, updated_at } = data
      const title = titlify(name);
      const url = {
        github: html_url,
        site: homepage
      }
      const res = { title, desc: description, url, updated_at };

      if (img[i]) imgPromises[i] = img[i];
      else imgPromises[i] = getMetaTagPromise(homepage);

      return res
    });

    return Promise.all(imgPromises)
  }).then(imgURLs => {
    const resultJSON = projectsJSON.map((obj, i) => {
      if (imgURLs[i] !== null) obj.img = imgURLs[i];
      return obj;
    });

    res.send(resultJSON);
  }).catch(err => {
    console.error(err)
    res.next(boom.badImplementation(err.message, err))
  });
});

function getMetaTagPromise(url) {
  return axios.get(url).then(({data}) => {
    const metaTag = data.match(new RegExp('<meta property="og:image" content="(.+?)"'))[1];
    return metaTag;
  }).catch(() => {
    return null;
  })
}



module.exports = router;