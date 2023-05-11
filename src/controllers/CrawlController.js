const crawlUrls = require('@root/crawler');

class CrawlController {

    constructor(crawler) {
        this.crawler = crawler
    }

    async crawl(req, res) {
        const { paths, depth, http = false } = req.body;
        
        if (!depth
            || isNaN(depth)
            || typeof depth === 'string'
            || depth > 5
            || depth < 1
        ) {
            const message = 'Depth is not a valid number, and must be in the range of [1-5]';
            return res.status(400).json({ message });
        }

        await crawlUrls(paths, depth, http);
        return res.status(202).json({ message: 'Success' });
      
    }

}


module.exports = new CrawlController(crawlUrls);