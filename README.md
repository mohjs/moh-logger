# moh-logger
Logger for moh


## Features

* Simple method to log info
    * `debug`: with blue colors used to `debug` infos
    * `info`: with green colors used to log `info` level messages
    * `warn`: with yellow colors used to log `warn` level messages
    * `error`: with red colors used to log `error` level messages
* Easy add extra infos into logs and beautifully managed
    * pass extra object as the second paramter eg: `info('Info message', { someKey: 'someData' })`
* Same method for `debug` and log debug info in non-`development` environment
    * `debug` module is used only in `development` / null environment
    * log with `debug` level used in non-development environment
* Easy log errors with directly pass the error object
    * eg: `error(new Error('An Error'))`
* Remove redundancy stack info in error logs
    * remove all infos from `node_modules`
    * remove all infos with out path info eg: `emitOne`, `process.emit`

## Usage:
```js
const debug = require('moh-logger').debug('namespace')
const { info, warn, error } = require('moh-logger')

debug('Debug message')
info('Info message')
info('Info message', { someKey: 'someData' })
warn('Warn message')
error('Error message')
error(new Error('My Error'))
```

## Output

### development Env
![Image1](https://user-images.githubusercontent.com/2676686/30752547-2e959c9a-9fef-11e7-992f-e28f7803ccc0.png)

### staging Env
![Image1](https://user-images.githubusercontent.com/2676686/30752553-328d7a2a-9fef-11e7-92d7-e22da2813fd3.png)

## TODO:
- [ ] Easy log request steam with directly pass the stream
    * eg: `info(req)`
- [ ] Easy log response steam with directly pass the stream
    * eg: `info(res)`
- [ ] Add feature save logs into files
- [ ] Add feature save logs into Elastic DB
- [ ] Add configuration to customize
    * Target to save the logs
    * Level to log 
    * Infos to log