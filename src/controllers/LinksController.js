const linksRepository = require("@services/LinksRepository");

class LinksController {

    constructor(linksRepository) {
        this.linksRepository = linksRepository
    }

    async links(req, res) {
        const { path } = req.query;
        
        return path
            ? await this._linksByPath(path, req, res)
            : await this._allLinks(req, res);
    }

    async _allLinks(req, res){
        const links = await this.linksRepository.all();
        return res.status(202).json(links);
    }

    async _linksByPath(path, req, res) {
        const links = await linksRepository.getOneById(path);

        if (!links.length){
            const message = `"${path}" does not exist in the repository`;
            return res.status(404).json({ message });
        }

        return res.status(202).json(links);
    }

}


module.exports = new LinksController(linksRepository);