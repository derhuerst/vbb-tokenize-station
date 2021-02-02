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
	const res = parser.results[0]

	// remove group name from name
	// (not sure if this messes some names up)
	const g = res.group
	const n = res.name
	if (g && g.text && n && n.text && n.text.slice(0, g.text.length + 1) === g.text + ' ') {
		n.text = n.text.slice(g.text.length + 1)
	}
	// this assumes that .value works just like .text
	if (g && g.value && n && n.value && n.value.slice(0, g.value.length + 1) === g.value + ' ') {
		n.value = n.value.slice(g.value.length + 1)
	}

	return res
}

module.exports = parseVbbStationName
