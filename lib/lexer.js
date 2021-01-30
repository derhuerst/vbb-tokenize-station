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

const lexer = compile({
	lParenthesis: '(', rParenthesis: ')',
	lBracket: '[', rBracket: ']',
	dot: '.', comma: ',',
	slash: '/',
	// todo: does the `^` anchor work?
	sbahnUbahn: /^S\+U\b/,
	sbahn: /^S\b/,
	ubahn: /^U\b/,
	ubahnLine: {
		match: /\bU[0-9]{1,2}\b/,
		type: keywords,
	},
	sbahnLine: {
		match: /\bS[0-9]{1,2}X?\b/,
		type: keywords,
	},
	atNotation: {
		match: /\bb\.?\b/,
		type: keywords,
	},
	word: {
		match: /[a-zA-Z]+\.?/,
		type: keywords,
	},
	space: / +/,
	sep: /-/,
})

module.exports = lexer
