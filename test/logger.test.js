const test = require('ava')
const debug = require('../').debug('logger-test')
const { info, warn, error } = require('../')

// Log string info
test('can log debug into', t => {
  debug('Debug Info')
  t.pass()
})

test('can log info into', t => {
  info('Info Info')
  t.pass()
})

test('can log warn into', t => {
  warn('Warn Info')
  t.pass()
})

test('can log error into', t => {
  error('Error Info')
  t.pass()
})

test('can log with extra info', t => {
  info('Info info', {
    key1: 'extra info data',
    k2: 'extra info data2'
  })
  t.pass()
})

// Log non-string info
test('can log error object', t => {
  error(new Error('some error'))
  t.pass()
})

test.skip('can log request stream', t => {})

test.skip('can log response stream', t => {})

// Log to other target
test.skip('can log to file', t => {})

test.skip('can log to Elastic', t => {})
