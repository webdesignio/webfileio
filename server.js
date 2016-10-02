'use strict'

const co = require('co')

process.on('unhandledRejection', err => {
  throw err  // Throw unhandledRejection
})

if (process.env.NODE_ENV === 'production') {
  const throng = require('throng')
  throng(co.wrap(boot))
} else {
  co(boot)
}

function * boot () {
  const srv = require('.')
  srv.listen(process.env.PORT || 3000, () => {
    console.log('server listening on port', srv.address().port)
  })
}
