'use strict'

const crypto = require('crypto')

module.exports = {
  createSignature,
  createPolicy,
  createCredential
}

function signString (key, str) {
  const hmac = crypto.createHmac('sha256', key)
  return hmac.update(str).digest()
}

function createSignature ({ date, key, secret, region, stringToSign }) {
  const awsLongDate = date.toISOString().replace(/[\-:]/g, '').replace(/\.[0-9]+Z$/, 'Z')
  const awsDate = awsLongDate.slice(0, 8)
  const dateKey = signString(`AWS4${secret}`, awsDate)
  const dateRegionKey = signString(dateKey, region)
  const dateRegionServiceKey = signString(dateRegionKey, 's3')
  const signingKey = signString(dateRegionServiceKey, 'aws4_request')
  return signString(signingKey, stringToSign).toString('hex')
}

function createPolicy ({
  bucket,
  date,
  expires,
  credential,
  algorithm = 'AWS4-HMAC-SHA256',
  conditions = [],
  encode = true
}) {
  const policy = {
    'expiration': expires.toISOString(),
    'conditions': [
      { bucket },
      { 'x-amz-credential': credential },
      { 'x-amz-algorithm': algorithm },
      { 'x-amz-date': date.toISOString().replace(/[\-:]/g, '').replace(/\.[0-9]+Z$/, 'Z') }
    ].concat(conditions)
  }
  return (
    encode
      ? new Buffer(JSON.stringify(policy)).toString('base64')
      : policy
  )
}

function createCredential ({ date, key, region }) {
  const awsLongDate = date.toISOString().replace(/[\-:]/g, '').replace(/\.[0-9]+Z$/, 'Z')
  const awsDate = awsLongDate.split('T')[0]
  return `${key}/${awsDate}/${region}/s3/aws4_request`
}
