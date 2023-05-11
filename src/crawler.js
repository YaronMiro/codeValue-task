const scrapeLinks = require('@utils/scraper');
const linksRepository = require("@services/LinksRepository");
const { crawlerEventEmitter, eventsTypes } = require("@services/CrawlerEventEmitter");

module.exports = async function crawlUrls(paths, depth, http) {
  async function deepScrapeLinks(paths, depth, http, data = {}) {
    if (depth === 0) {
      return data;
    }

    for(let path of paths) {
      const links = await scrapeLinks(path, http);
      data[path] = links;
      await deepScrapeLinks(links, depth - 1, http, data);
    }

    return data;
  }
  const linksMappedData = await deepScrapeLinks(paths, depth, http);
  await linksRepository.upsert(linksMappedData);

  const rawLinksList = [];
  for (const path in linksMappedData) {
    rawLinksList.push(...linksMappedData[path])
  }

  crawlerEventEmitter.emit(eventsTypes.crawlerProcessEnded, rawLinksList);
  return rawLinksList;
}
