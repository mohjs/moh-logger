'use strict'

const { TYPE, LEVEL } = require('./enums')
const nonNMRegx = /(\/node_modules\/)/
const nonPathRegx = /\([\w\.\:\d\/]*\)/

module.exports = options => {
  let meta = {}
  meta.type = TYPE.NORMAL

  if (options.meta && options.meta.readable && options.meta.method && options.meta.url && options.meta.headers) {
    // The request stream object
    meta.type = TYPE.REQUEST
  }

  if (options.meta && options.meta.message && options.meta.stack) {
    // The Error object
    const betterStack = options.meta.stack.split('\n')
      .filter(info => !nonNMRegx.test(info)) // Remove all node_modules related info
      .filter(info => !nonPathRegx.test(info)) // Remove all non Path exist info
    options.meta.stack = betterStack.join('\n')
  }

  // TODO: Implementation log response object
  // if (options.meta && options.meta.writable) {
  // }

  meta.timeStamp = options.timestamp()
  meta.pid = global.process.pid

  meta.level = (() => {
    switch (options.level) {
      case LEVEL.DEBUG:
        return `${options.level.toUpperCase()}`
      case LEVEL.INFO:
        return `${options.level.toUpperCase()}`
      case LEVEL.WARN:
        return `${options.level.toUpperCase()}`
      case LEVEL.ERROR:
        return `${options.level.toUpperCase()}`
    }
  })()

  meta.message = (() => {
    switch (meta.type) {
      case TYPE.REQUEST:
        return `${options.meta.method} ${options.meta.url}`
      case TYPE.RESPONSE:
        return ``
      case TYPE.NORMAL:
      default:
        return options.message || options.meta.message || ''
    }
  })()

  meta.info = (() => {
    switch (meta.type) {
      case TYPE.REQUEST:
        return Object.keys(options.meta.headers).reduce((pre, cur) => {
          pre[cur] = options.meta.headers[cur]
          return pre
        }, {})
      case TYPE.RESPONSE:
        return {}
      case TYPE.NORMAL:
      default:
        return Object.keys(options.meta).reduce((pre, cur) => {
          pre[cur] = options.meta[cur]
          return pre
        }, {})
    }
  })()

  return meta
}
