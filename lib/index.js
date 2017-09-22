const winston = require('winston')
const debug = require('debug')
const debugLog = require('debug')('moh-logger')
const getMeta = require('./meta')

const logColors = {
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red'
}

winston.addColors(logColors)

const consoleFormat = options => {
  const req = options.meta
  debugLog('>>> option: ', req.connection)
  const meta = getMeta(options)
  debugLog('>>> meta: ', meta)

  const message = (() => `[${meta.timeStamp}][PID:${meta.pid}][${meta.level}]: ${meta.message}`)()
  const extraInfo = (() => Object.keys(meta.info).map(key => `\n--> ${key}: ${meta.info[key]}`).join(''))()

  return winston.config.colorize(options.level, message + extraInfo) 
}

const logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      timestamp: () => new Date().toISOString(),
      formatter: options => consoleFormat(options)
    })
  ]
})

exports.debug = namespace => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ? debug(namespace)
  : logger.debug
exports.info = logger.info
exports.warn = logger.warn
exports.error = logger.error
