'use strict'

const co = require('co')
const { createError } = require('micro')

module.exports = createApp

function createApp ({ services: { uploadRequestAPI } }) {
  return co.wrap(function * app (req, res) {
    if (req.url.match(/^\/api\/v1\/websites\/[^/]+\/upload_requests/)) {
      return yield uploadRequestAPI(req, res)
    } else {
      throw createError(404, 'Resource not found')
    }
  })
}
