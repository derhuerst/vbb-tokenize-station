'use strict'

const {inspect} = require('util')
const {deepStrictEqual} = require('assert')
const lexer = require('../lib/lexer')
const parse = require('..')
const cases = require('./cases')

for (const [id, name, expected] of cases) {
	console.error('\n\n', id, inspect(name, {colors: true}))

	lexer.reset(name)
	for (const {type, value} of lexer) {
		console.log('  ', type, inspect(value, {colors: true}))
	}

	const res = parse(name)
	console.log(inspect(res, {depth: null, colors: true})) // todo: indent
	if (expected) deepStrictEqual(res, expected)
}

console.info('\n✔︎ all test cases passed')
