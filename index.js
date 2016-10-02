'use strict'

const micro = require('micro')

const createUploadRequestAPI = require('./services/upload_request_api.js')
const createApp = require('./services/app')
const createAuth = require('./services/auth')

const aws = {
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
  bucket: process.env.AWS_S3_BUCKET
}

module.exports = micro(
  createAuth({
    secret: process.env.SECRET,
    services: {
      upstream: createApp({
        services: {
          uploadRequestAPI: createUploadRequestAPI({ aws })
        }
      })
    }
  })
)
