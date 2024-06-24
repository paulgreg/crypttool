const { TextEncoder, TextDecoder } = require('util')
const { webcrypto } = require('crypto')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

Object.defineProperty(global.self, 'crypto', {
  value: webcrypto,
})
