'use strict'

const normalize = require('normalize-for-search')

const delim = /[\s\/\(\)\-,\.\+]+/
const specChars = /[^\w\s]|_/g

const str = /(?!^)str$/g
const strasse = /(?!^)stra(ss|ß)e$/

const metaExpansions = {
	pl:  'polen',
	bln: 'berlin',
	s:   'sbahn',
	u:   'ubahn',
	bhf: 'bahnhof'
}
const metaRemovals = {
	pl:  '',
	bln: '',
	s:   '',
	u:   '',
	bhf: ''
}

const inherentExpansions = {
	str:    'strasse',
	straße: 'strasse',
	hbf:    'hauptbahnhof'
}

const defaults = {
	meta: 'expand',
	expansions: null
}

const tokenize = (station, opt = {}) => {
	if ('string' !== typeof station || station.length === 0) return []

	opt = {...defaults, ...opt}
	const meta = opt.meta === 'expand'
		? metaExpansions
		: (opt.meta === 'remove' ? metaRemovals : {})
	const expansions = opt.expansions || {...meta, ...inherentExpansions}
	const expand = Object.assign(Object.create(null), expansions)

	return normalize(station)
	// remove "[" and "]"
	.replace(/[\[\]]/g, ' ')
	// replace "b. " with "bei "
	.replace(/(?:[^\w]|^)b\.(?=\s+\w+)/, 'bei ')
	.split(delim)
	// replace "str." and "straße" with "strasse"
	.map(t => t.replace(str, 'strasse').replace(strasse, 'strasse'))
	// pre-configured replacements/expansions
	.map(t => t in expand ? expand[t] : t)
	.filter(x => x && x.trim().length > 0)
	// replace "b berlin" with "bei berlin"
	.map((t, i, all) => {
		if (t === 'b' && all[i + 1] === 'berlin') return 'bei'
		return t
	})
}

module.exports = tokenize
