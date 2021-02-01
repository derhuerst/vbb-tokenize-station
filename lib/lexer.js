'use strict'

const {keywords: withKeywords, compile} = require('moo')
const licensePlates = require('./license-plates')
const diffs = require('./differentiators')

const keywords = withKeywords({
	licensePlate: licensePlates,
	// keywords don't support spaces
	differentiator: diffs.filter(d => !d.includes(' ')),
})

// \b but with Unicode support
const before = '(?<=[^\\p{L}\\p{N}])'
const beforeWStart = '(?<=^|[^\\p{L}\\p{N}])'
const after = '(?=[^\\p{L}\\p{N}])'
const afterWEnd = '(?=$|[^\\p{L}\\p{N}])'

const lexer = compile({
	// differentiators with space, keywords don't support spaces
	differentiator: {
		// todo: escape them
		match: new RegExp(`${beforeWStart}(?:${diffs.filter(d => d.includes(' ')).join('|')})${afterWEnd}`, 'u')
	},
	lParen: '(', rParen: ')',
	lBracket: '[', rBracket: ']',
	// todo: does the `^` anchor work?
	sbahnUbahn: /^S\+U(?=\s)/u,
	sbahn: /^S(?=\s)/u,
	ubahn: /^U(?=\s)/u,
	ubahnLine: {
		match: new RegExp(`${beforeWStart}U[0-9]{1,2}${after}`, 'u'),
		type: keywords,
	},
	sbahnLine: {
		match: new RegExp(`${beforeWStart}S[0-9]{1,2}X?${after}`, 'u'),
		type: keywords,
	},
	station: {
		match: new RegExp(`${before}(?:Bhf\\.?|Bahnhof|Fernbf\\.?)${afterWEnd}`, 'u'),
		type: keywords,
	},
	atNotation: {
		match: new RegExp(`${before}(?:b\\.(?=[\\s\\p{L}\\p{N}])|(?:bei|b)${after})`, 'u'),
		type: keywords,
	},
	word: {
		// todo: more chars
		match: new RegExp(`[\\p{L}\\p{N}\\-_+]+\\.?${afterWEnd}`, 'u'),
		type: keywords,
	},
	dot: '.', comma: ',', slash: '/',
	space: new RegExp(` +`, 'u'),
	end: /(?<=.)$/u,
})

module.exports = lexer
