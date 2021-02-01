'use strict'

const {Parser, Grammar} = require('nearley')
const grammar = require('./lib/grammar')

const parseVbbStationName = (name) => {
	// todo: optimize this
	const parser = new Parser(Grammar.fromCompiled(grammar))
	// parser.restore()
	// parser.save()

	parser.feed(name)
	parser.finish()

	if (parser.results.length === 0) {
		const err = new Error(`no parse results with "${name}"`)
		err.results = parser.results
		throw err
	}
	if (parser.results.length > 1) {
		const err = new Error(`grammar is ambiguous with "${name}"`)
		err.results = parser.results
		throw err
	}

	return parser.results[0]
}

module.exports = parseVbbStationName
