'use strict'

const { spawn } = require('child_process')

if (process.env.NODE_ENV === 'production') {
  require('../server')
} else {
  spawn('nodemon', [
    '-w', 'server.js',
    '-w', 'index.js',
    '-w', 'services',
    '--',
    '-r', 'dotenv/config', 'server.js'
  ], { stdio: 'inherit' })
}
