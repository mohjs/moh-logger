const winston = require('winston')
const debug = require('debug')

const logColors = {
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red'
}

winston.addColors(logColors)

const genMessage = options => {
  let type = 'NORMAL'

  const TIME_STAMP = options.timestamp()
  const PID = global.process.pid

  const INFO_SYMBLE = () => {
    if (options.meta && options.meta.readable && options.meta.method && options.meta.url && options.meta.headers) {
      // The request stream object
      type = 'REQUEST'
      return '>>>'
    }

    // TODO: Implementation log response object
    // if (options.meta && options.meta.writable) {
    // }

    switch (options.level) {
      case 'debug':
        return '---'
      case 'info':
        return '==='
      case 'warn':
        return '***'
      case 'error':
        return 'XXX'
    }
  }

  const LEVEL = () => {
    switch (options.level) {
      case 'debug':
        return `${options.level.toUpperCase()}`
      case 'info':
        return `${options.level.toUpperCase()}`
      case 'warn':
        return `${options.level.toUpperCase()}`
      case 'error':
        return `${options.level.toUpperCase()}`
    }
  }

  const INFO = () => {
    let message = ''
    let extraInfo = ''
    switch (type) {
      case 'REQUEST':
        message = `${options.meta.method} ${options.meta.url}`
        extraInfo = Object.keys(options.meta.headers).map(key => `\n--> ${key}: ${options.meta.headers[key]}`)
        return `${message}` + extraInfo.join('')
      case 'RESPONSE':
        return ``
      case 'NORMAL':
      default:
        message = options.message || options.meta.message || ''
        extraInfo = Object.keys(options.meta).map(key => `\n--> ${key}: ${options.meta[key]}`)
        return `${message}` + extraInfo.join('')
    }
  }

  return `[${TIME_STAMP}][PID:${PID}][${LEVEL()}]${INFO_SYMBLE()}: ` + INFO()
}

const logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      timestamp: () => new Date().toISOString(),
      formatter: options => winston.config.colorize(options.level, genMessage(options))
    })
  ]
})

exports.debug = namespace => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  ? debug(namespace)
  : logger.debug
exports.info = logger.info
exports.warn = logger.warn
exports.error = logger.error
