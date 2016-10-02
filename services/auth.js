'use strict'

const co = require('co')
const { createError } = require('micro')
const { verify } = require('jsonwebtoken')

module.exports = createAuth

function createAuth ({ secret, services: { upstream } }) {
  return co.wrap(function * auth (req, res) {
    const token = getToken(req)
    if (!token) throw createError(401, 'No token present')
    try {
      var { website, role, user: { email, _id } } = verify(token, secret)
    } catch (e) {
      if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
        throw createError(401, e.name)
      } else {
        throw e
      }
    }
    req.headers['x-website'] = website
    req.headers['x-user-role'] = role
    req.headers['x-user-email'] = email
    req.headers['x-user-id'] = _id
    return yield upstream(req, res)
  })
}

function getToken (req) {
  if (!req.headers['authorization']) return null
  const [type, token] = req.headers['authorization'].split(' ')
  if (type !== 'Bearer') return null
  return token
}
