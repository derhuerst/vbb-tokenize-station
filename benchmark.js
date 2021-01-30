'use strict'

const {Suite} = require('benchmark')
const parse = require('.')

const names = [
	// todo
]

new Suite()

.add(`parse ${names.length} names`, () => {
	for (let i = 0; i < names.length; i++) {
		const name = names[i]

		const idx = Math.round(Math.random() * name.length)
		const randomStr = Math.random().toString(16).slice(2, 8)
		const spliced = name.slice(0, idx) + randomStr + name.slice(idx)
		parse(spliced)
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
