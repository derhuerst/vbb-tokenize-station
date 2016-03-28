'use strict'



const g = { // global patterns
	  ß:      /ß/g
	, ä:      /ä/g
	, ö:      /ö/g
	, ü:      /ü/g
	, pl:     /\(pl\)/g
	, berlin: /\((berlin|bln)\)/g
	, S:      /^s\s/
	, U:      /^u\s/
	, SU:     /^s\+u\s/
	, str:    /str([^\w]|$)/
	, bhf:    /bhf([^\w]]$)/
	, hbf:    /hbf\./
}

const l = { // local patterns
	  str: /str\.?$/
	, bhf: /bhf\.?$/
	, hbf: /hbf\.?$/
}

const delimiter = /[\s\/\(\)\-,\.]+/
const specialChars = /[^\w\s]|_/g
const isNotEmpty = (x) => x.length > 0

const tokenize = (station) => station
	.toLowerCase()

	// German umlauts
	.replace(g.ß, 'ss')
	.replace(g.ä, 'ae')
	.replace(g.ö, 'oe')
	.replace(g.ü, 'ue')

	// expand abbreviations
	.replace(g.pl,     'polen')
	.replace(g.berlin, 'berlin')
	.replace(g.S,      'sbahn ')
	.replace(g.U,      'ubahn ')
	.replace(g.SU,     'sbahn ubahn ')
	.replace(g.hbf,    'hauptbahnhof')

	// People often separate station names differently than the canoical title.
	// Because of this, we create a new token here.
	.replace(g.str,    ' strasse ')
	.replace(g.bhf,    ' bahnhof ')

	.split(delimiter)
	.filter(isNotEmpty)

	.map((token) => token
		.trim()

		// expand abbreviations
		.replace(l.str, 'strasse')
		.replace(l.bhf, 'bahnhof')
		.replace(l.hbf, 'hauptbahnhof')

		.replace(specialChars, '')
	)

module.exports = tokenize