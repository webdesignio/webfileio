'use strict'

const url = require('url')
const co = require('co')
const { createError } = require('micro')

const { createSignature, createCredential, createPolicy } = require('../lib/s3_policy')

module.exports = createUploadRequestAPI

function createUploadRequestAPI ({ aws: { key, secret, region, bucket } }) {
  return co.wrap(function * uploadRequestAPI (req, res) {
    if (req.method === 'POST') {
      const { query } = url.parse(req.url, true)
      const contentLength = Number(query.contentLength)
      if (Number.isNaN(contentLength)) throw createError(400, 'Invalid content-length')
      const algorithm = 'AWS4-HMAC-SHA256'
      const date = new Date()
      const expires = new Date(new Date().getTime() + (5 * 60 * 1000))
      const credential = createCredential({
        date,
        key: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_S3_REGION
      })
      const policy = createPolicy({
        bucket,
        date,
        expires,
        credential,
        algorithm,
        conditions: [
          ['starts-with', '$key', `${req.headers['x-website']}/`],
          ['content-length-range', contentLength, contentLength],
          { 'acl': 'public-read' }
        ]
      })
      const signature = createSignature({ date, key, secret, region, stringToSign: policy })
      return {
        algorithm,
        policy,
        signature,
        date: date.toISOString().replace(/[\-:]/g, '').replace(/\.[0-9]+Z$/, 'Z'),
        credential
      }
    } else {
      throw createError(405)
    }
  })
}
