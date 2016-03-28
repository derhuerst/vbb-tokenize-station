# todo:
# Mühlberg (Elbe)
# Rehfeld (EE), Bahnhof
# Wolfen(Bitterfeld)
# (bln), (berlin), (polen)

tokenize = require './index.js'

module.exports =

	'splits by spaces': (t) ->
		t.strictEqual tokenize('Foo Bar Baz').length, 3
		t.done()

	'returns lower case tokens': (t) ->
		r = tokenize 'Foo BAR baz'
		t.strictEqual r[0], 'foo'
		t.strictEqual r[1], 'bar'
		t.strictEqual r[2], 'baz'
		t.done()

	'replaces `S` by `sbahn`': (t) ->
		t.ok 'sbahn' in tokenize 'S Grunewald'
		t.done()

	'replaces `U` by `ubahn`': (t) ->
		t.ok 'ubahn' in tokenize 'U Blissestraße'
		t.done()

	'replaces `S+U` by `sbahn ubahn`': (t) ->
		r = tokenize 'S+U Blissestraße'
		t.ok 'sbahn' in r
		t.ok 'ubahn' in r
		t.done()

	'replaces `(Berlin)` by `berlin`': (t) ->
		t.ok 'berlin' in tokenize 'Kastanienallee (Berlin)'
		t.done()

	'replaces German umlauts': (t) ->
		r = tokenize('S Südkreuz Bhf (Berlin)').join ''
		t.ok r.match /ue/i
		t.ok not r.match /ü/i
		r = tokenize('S Schöneberg (Berlin)').join ''
		t.ok r.match /oe/i
		t.ok not r.match /ö/i
		r = tokenize('S Plänterwald (Berlin)').join ''
		t.ok r.match /ae/i
		t.ok not r.match /ä/i
		r = tokenize('Großer Stern (Berlin)').join ''
		t.ok r.match /ss/i
		t.ok not r.match /ß/i
		t.done()

	# todo: consider replacing by a single unicode char instead.
	# `strasse` (7 letters) yields in a pretty high relevance.
	# `str` would probably not be collision-free enough.
	'replaces `str.` suffixes by a new token `strasse`': (t) ->
		r = tokenize 'S Beusselstr.'
		t.ok 'beussel' in r
		t.ok 'strasse' in r
		t.done()
	'replaces `str` suffixes by a new token `strasse`': (t) ->
		r = tokenize 'S Beusselstr'
		t.ok 'beussel' in r
		t.ok 'strasse' in r
		t.done()
	'replaces `str` by `strasse`': (t) ->
		r = tokenize 'S+U Warschauer Str.'
		t.ok 'strasse' in r
		t.ok not ('str' in r)
		t.ok not ('str.' in r)
		t.done()
