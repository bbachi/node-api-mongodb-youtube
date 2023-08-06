const pino = require('pino');
const transport = pino.transport({
    target: 'pino-pretty',
    options: { destination: 1 } // use 2 for stderr
})
const logger = pino(transport);

class APILogger {

    info(message) {
        logger.info(`API : ${message}`)
    }

    debug(message, data) {
        logger.info(`API : ${message} Details ${JSON.stringify(data)}`)
    }

    error(message) {
        logger.error(`API Error : ${message}`)
    }
}

module.exports = new APILogger();