
const Logger = require("@services/Logger");

class LinksRepository {
    data = {}

    constructor(logger) {
        this.logger = logger
    }
    
    async upsert(newData) {
        // Simple validation, better to do deep check that new data
        // is defined as expected, else we encounter data integrity.
        if (typeof newData !== 'object' && newData !== null) {
            this.logger.error(`data is not valid`)
        }

        this.data = {...this.data, ...newData};
    }

    async all() {
        return this.data;
    }

    async getOneById(path) {
        return this.data[path] ?? [];
    }
}

module.exports = new LinksRepository(
    new Logger(LinksRepository.name)
);
