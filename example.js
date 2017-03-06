'use strict'

require('dotenv').config();
const {send} = require('micro')
const post = require('micro-post')

console.log(process.env.FOO)

module.exports = post(async (req, res) => {
  return send(res, 200, `It's a POST request!`)
})
