
class Logger {

    constructor(namespace = '') {
        this.namespace = namespace.trim();
    }

    _log(message, type){
        const baseName  = this.namespace ? `[${this.namespace}]` : ''
        return `${baseName}[${type}] ${message}`
    }

    info(message) {
        console.log(this._log(message, 'info'));
    }

    error(message) {
        console.log(this._log(message, 'error'));
    }
   
}

module.exports = Logger;
