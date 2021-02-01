'use strict'

const prefixes = require('german-license-plate-prefixes')

const list = Object.keys(prefixes)
// a 1-letter prefix can easily be confused with other info
.filter(p => p.length >= 2)

module.exports = list
