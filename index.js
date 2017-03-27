'use strict'

const normalize = require('normalize-for-search')



const delim     = /[\s\/\(\)\-,\.\+]+/
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



const tokenize = (station) =>
	('string' !== typeof station || station.length === 0)
	? []
	: normalize(station)
	.replace(/[\[\]]/g, ' ')
	.replace(/(?:[^\w]|^)b\.(?=\s+\w+)/, 'bei ')
	.split(delim)
	.filter((x) => x.trim().length > 0)
	.map((t) => {
		return (replace[t] || t).replace(str, 'strasse').replace(strasse, 'strasse')
	})
	.map((t, i, all) => {
		if (t === 'b' && all[i + 1] === 'berlin') return 'bei'
		return t
	})

module.exports = tokenize
