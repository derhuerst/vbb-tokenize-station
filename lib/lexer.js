'use strict'

const {keywords: withKeywords, compile} = require('moo')
const licensePlates = require('./license-plates')
const differentiators = require('./differentiators')

const keywords = withKeywords({
	licensePlate: licensePlates,
	differentiator: differentiators,
})

// \b but with Unicode support
const before = '(?<=^|[^\\p{L}\\p{N}])'
const after = '(?=[^\\p{L}\\p{N}]|$)'

const lexer = compile({
	lParen: '(', rParen: ')',
	lBracket: '[', rBracket: ']',
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
	station: {
		match: new RegExp(`${before}(?:Bhf\\.?|Bahnhof)${after}`, 'u'),
		type: keywords,
	},
	atNotation: {
		match: new RegExp(`${before}(?:b\\.?|bei)${after}`, 'u'),
		type: keywords,
	},
	word: {
		match: new RegExp(`[\\p{L}\\p{N}\\-]+\\.?${after}`, 'u'),
		type: keywords,
	},
	dot: '.', comma: ',', slash: '/',
	space: new RegExp(` +`, 'u'),
})

module.exports = lexer
