'use strict'

const {keywords: withKeywords, compile} = require('moo')
const licensePlates = require('./license-plates')
const differentiators = require('./differentiators')

const keywords = withKeywords({
	// todo: `S`, `U`, `S+U`?
	licensePlate: licensePlates,
	differentiator: differentiators,
	bei: ['bei'],
})

// \b but with Unicode support
const before = '(?<=^|[^\\p{L}\\p{N}])'
const after = '(?=[^\\p{L}\\p{N}]|$)'

const lexer = compile({
	lParenthesis: '(', rParenthesis: ')',
	lBracket: '[', rBracket: ']',
	dot: '.', comma: ',',
	slash: '/',
	// todo: does the `^` anchor work?
	sbahnUbahn: new RegExp(`^S\\+U${after}`, 'u'),
	sbahn: new RegExp(`^S${after}`, 'u'),
	ubahn: new RegExp(`^U${after}`, 'u'),
	ubahnLine: {
		match: new RegExp(`${before}U[0-9]{1,2}${after}`, 'u'),
		type: keywords,
	},
	sbahnLine: {
		match: new RegExp(`${before}S[0-9]{1,2}X?${after}`, 'u'),
		type: keywords,
	},
	atNotation: {
		match: new RegExp(`${before}b\\.?${after}`, 'u'),
		type: keywords,
	},
	word: {
		match: new RegExp(`[\\p{L}\\p{N}]+\\.?${after}`, 'u'),
		type: keywords,
	},
	space: new RegExp(` +`, 'u'),
	sep: new RegExp(`-`, 'u'),
})

module.exports = lexer
