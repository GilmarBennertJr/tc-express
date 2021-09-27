const moment = require('moment');

module.exports = () => {
    this.message = (message, method = undefined, route = undefined) => {
        console.error(`[${moment().format('DD-MM-YYYY HH:MM:SS')}]: Method: ${method} | Route: "${route}" | Message: "${message}"`)
        return {
            message: message
        }
    }

    return this;
}