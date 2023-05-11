
require('module-alias/register')
const config = require('config');
const crawlUrls = require('@root/crawler');
const Logger = require("@services/Logger");
const { crawlerEventEmitter, eventsTypes } = require("@services/CrawlerEventEmitter");

const logger = new Logger();

async function crawl(paths, http) {
  const {
    depth,
    minDepth,
    maxDepth
  } = config.get('crawler');

  // Set the depth value to always be in the range of [2-5].
  sanitizedDepth = depth > maxDepth
    ? maxDepth
    : depth >= minDepth && depth || minDepth;

    links = await crawlUrls(paths, sanitizedDepth, http);
    return links;
  }
  
  (async () => {
  crawlerEventEmitter.on(
    eventsTypes.crawlerProcessEnded,
    (links) => logger.info(links)
  );
  await crawl(['htmls/1.html'], false);
  await crawl(['htmls/2.html', 'htmls/3.html'], false);
})();