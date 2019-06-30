'use strict'

const normalize = require('normalize-for-search')

const delim = /[\s\/\(\)\-,\.\+]+/
const specChars = /[^\w\s]|_/g

const replace = {
	  pl:     'polen'
	, bln:    'berlin'
	, s:      'sbahn'
	, u:      'ubahn'
	, str:    'strasse'
	, straße: 'strasse'
	, bhf:    'bahnhof'
	, hbf:    'hauptbahnhof'
}

const str = /(?!^)str$/g
const strasse = /(?!^)stra(ss|ß)e$/

const tokenize = (station) => {
	if ('string' !== typeof station || station.length === 0) return []
	return normalize(station)
	// remove "[" and "]"
	.replace(/[\[\]]/g, ' ')
	// replace "b. " with "bei "
	.replace(/(?:[^\w]|^)b\.(?=\s+\w+)/, 'bei ')
	.split(delim)
	.filter(x => x.trim().length > 0)
	// pre-configured replacements
	.map((t) => {
		return (replace[t] || t).replace(str, 'strasse').replace(strasse, 'strasse')
	})
	// replace "b berlin" with "bei berlin"
	.map((t, i, all) => {
		if (t === 'b' && all[i + 1] === 'berlin') return 'bei'
		return t
	})
}

module.exports = tokenize
