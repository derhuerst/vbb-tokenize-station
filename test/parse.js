'use strict'

const {pipeline} = require('stream')
const split = require('split2')
const {inspect} = require('util')
const lexer = require('../lib/lexer')
const parse = require('..')

process.stdin
.pipe(split())
.on('data', (row) => {
	const [id, name] = JSON.parse(row)

	lexer.reset(name)
	const tokens = Array.from(lexer)

	try {
		const res = parse(name)
	} catch (err) {
		err.id = id
		err.name = name
		err.tokens = tokens
		throw err
	}
})
.once('end', () => {
	console.info('✔︎ all parsed successfully')
})
