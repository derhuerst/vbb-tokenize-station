'use strict'

const {Suite} = require('benchmark')
const testCases = require('./test/cases')
const parse = require('.')

const names = testCases.map(([id, name]) => name)

new Suite()

.add(`parse ${names.length} names`, () => {
	for (let i = 0; i < names.length; i++) {
		parse(names[i])
	}
})

.on('error', (err) => {
	console.error(err)
	process.exitCode = 1
})
.on('cycle', (e) => {
	console.log(e.target.toString())
})
.run()
