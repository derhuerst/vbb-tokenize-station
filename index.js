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
	.replace(/(?:[^\w]|^)b\.(?=\s+\w+)/, 'bei ')
	.split(delim)
	.filter((x) => x.trim().length > 0)
	.map((x) => replace[x] || x)
	.reduce((xs, x, i, all) => {
		// expand suffixes
		if (str.test(x))
			xs.push(x.replace(str, ''), 'strasse')
		else if (strasse.test(x))
			xs.push(x.replace(strasse, ''), 'strasse')
		else if (x === 'b' && all[i + 1] === 'berlin')
			xs.push('bei')
		else xs.push(x)
		return xs
	}, [])

module.exports = tokenize
