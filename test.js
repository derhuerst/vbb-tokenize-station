'use strict'

const test = require('tape')
const tokenize = require('.')

test('splits by spaces', (t) => {
	t.plan(2)
	t.ok(Array.isArray(tokenize('Foo Bar Baz')))
	t.equal(tokenize('Foo Bar Baz').length, 3)
})

test('removes brackets', (t) => {
	t.plan(2)
	t.equal(tokenize('Foo Bar [Baz]').length, 3)
	t.equal(tokenize('Foo Bar [Baz]')[2], 'baz')
})

test('returns lower case tokens', (t) => {
	t.plan(3)
	const r = tokenize('Foo BAR baz')
	t.equal(r[0], 'foo')
	t.equal(r[1], 'bar')
	t.equal(r[2], 'baz')
})

test('replaces `S` by `sbahn`', (t) => {
	t.plan(1)
	t.ok(tokenize('S Grunewald').includes('sbahn'))
})

test('replaces `U` by `ubahn`', (t) => {
	t.plan(1)
	t.ok(tokenize('U Blissestraße').includes('ubahn'))
})

test('replaces `S+U` by `sbahn ubahn`', (t) => {
	t.plan(2)
	const r = tokenize('S+U Blissestraße')
	t.ok(r.includes('sbahn'))
	t.ok(r.includes('ubahn'))
})

test('replaces `(Berlin)` by `berlin`', (t) => {
	t.plan(1)
	t.ok(tokenize('Kastanienallee (Berlin)').includes('berlin'))
})

test('replaces `Bhf.` by `bahnhof`', (t) => {
	t.plan(1)
	t.ok(tokenize('Bhf. Zoo').includes('bahnhof'))
})

test('replaces `Hbf.` by `hauptbahnhof`', (t) => {
	t.plan(1)
	t.ok(tokenize('Cottbus Hbf.').includes('hauptbahnhof'))
})

test('replaces German umlauts', (t) => {
	t.plan(4 * 2)

	const a = tokenize('S Südkreuz Bhf (Berlin)')
	t.ok(a.includes('suedkreuz'))
	t.notOk(a.join('').includes('ü'))

	const b = tokenize('S Schöneberg (Berlin)')
	t.ok(b.includes('schoeneberg'))
	t.notOk(b.join('').includes('ö'))

	const c = tokenize('S Plänterwald (Berlin)')
	t.ok(c.includes('plaenterwald'))
	t.notOk(c.join('').includes('ä'))

	const d = tokenize('Großer Stern (Berlin)')
	t.ok(d.includes('grosser'))
	t.notOk(d.join('').includes('ß'))
})

test('replaces `str.` suffixes by `strasse`', (t) => {
	t.plan(3)
	const r = tokenize('Wiebestr./Huttenstr. (Berlin)')
	t.ok(r.includes('wiebestrasse'))
	t.ok(r.includes('huttenstrasse'))
	t.notOk(r.includes('strasse'))
})

test('replaces `straße` suffixes by `strasse`', (t) => {
	t.plan(1)
	const r = tokenize('Seestraße')
	t.ok(r.includes('seestrasse'))
})

test('replaces `str` suffixes by a new token `strasse`', (t) => {
	t.plan(3)
	const r = tokenize('Wiebestr/Huttenstr (Berlin)')
	t.ok(r.includes('wiebestrasse'))
	t.ok(r.includes('huttenstrasse'))
	t.notOk(r.includes('strasse'))
})

test('replaces `str` by `strasse`', (t) => {
	t.plan(3)
	const r = tokenize('S+U Warschauer Str.')
	t.ok(r.includes('strasse'))
	t.notOk(r.includes('str'))
	t.notOk(r.includes('str.'))
})

test('replaces `b.` with `bei` if followed by a owrd', (t) => {
	t.plan(3)
	const r = tokenize('Petershagen (b. Berlin), Elbestr.')
	t.ok(r.includes('bei'))
	t.notOk(r.includes('b'))
	t.notOk(r.includes('b.'))
})

test('keeps plain `b`', (t) => {
	t.plan(2)
	const r = tokenize('Wehrhain, B 87')
	t.ok(r.includes('b'))
	t.notOk(r.includes('bei'))
})
