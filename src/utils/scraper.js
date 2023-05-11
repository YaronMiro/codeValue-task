const fs = require('fs').promises;
const axios = require('axios');
const url = require('url');
const cheerio = require('cheerio');

function log(p) {
  console.log(p);
}

function fetchUrl(siteUrl) {
  log(`Downloading: ${siteUrl}`);

  const promise = axios.get(siteUrl).then(r => r.data);
  promise.then(() => log(`Download completed: ${siteUrl}`))

  return promise;
}

async function scrapeLinks(pathUrl, http) {
  const html = await (http ? fetchUrl(pathUrl) : fs.readFile(pathUrl));
  const $ = cheerio.load(html);

  let baseHref = $('base').attr('href');
  if (!baseHref) baseHref = pathUrl;

  return $('a').map((i, a) => {
    const href = a.attribs.href;
    return !!href ? url.resolve(baseHref, href) : null;
  }).toArray()
  .filter(o => !!o);
}

module.exports = scrapeLinks;
