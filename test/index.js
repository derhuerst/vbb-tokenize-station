'use strict'

const {inspect} = require('util')
const lexer = require('../lib/lexer')
const parse = require('..')
const cases = require('./cases')

for (const [id, name] of cases) {
	console.error('\n\n', id, inspect(name, {colors: true}))

	lexer.reset(name)
	for (const {type, value} of lexer) {
		console.log('  ', type, inspect(value, {colors: true}))
	}

	const res = parse(name)
	console.log(inspect(res, {depth: null, colors: true})) // todo: indent
}
