'use strict'

const {inspect} = require('util')
const {Parser, Grammar} = require('nearley')
const lexer = require('../lib/lexer')
const grammar = require('../lib/grammar')
const cases = require('./cases')

for (const [id, name] of cases) {
	console.error('\n\n', id, inspect(name, {colors: true}))

	lexer.reset(name)
	for (const {type, value} of lexer) {
		console.log('  ', type, inspect(value, {colors: true}))
	}

	const parser = new Parser(Grammar.fromCompiled(grammar))
	parser.feed(name)
	parser.finish()

	if (parser.results.length === 0) {
		const err = new Error(`no parse results with ${id} "${name}"`)
		err.results = parser.results
		throw err
	}
	if (parser.results.length > 1) {
		const err = new Error(`grammar is ambiguous with ${id} "${name}"`)
		err.results = parser.results
		throw err
	}

	console.log(inspect(parser.results[0], {depth: null, colors: true})) // todo: indent
}
