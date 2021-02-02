@{%
const lexer = require('./lexer')

const _id = ([token]) => ({
	type: token.type,
	text: token.text,
	offset: token.offset,
})

const collapseText = (tokens) => {
	return {
		type: 'text',
		text: tokens.filter(t => !!t).map(t => t.text).join(''),
		offset: tokens[0].offset,
	}
}

const asDifferentiator = (token) => ({
	type: 'differentiator',
	text: token.text,
	offset: token.offset,
})

const combineAtNotation = (tokens, raw) => ({
	type: 'differentiator',
	text: tokens.filter(t => !!t).map(t => t.text).join(''),
	offset: tokens[0].offset,
	raw,
})

const asSbahnUbahn = ([sU]) => ({
	type: 'sbahnUbahn',
	text: sU.text,
	offset: sU.offset,
})

const asLine = ([line]) => ({
	type: 'line',
	text: line.text,
	offset: line.offset,
})
%}
@lexer lexer

exp ->
  # 900809012 "Decin hl.n."
 		text {%
		([name]) => ({
			name,
		})
	%}
  # 900553095 "Bülow (b Schwerin)"
	# 900557423 "Dambeck (b LWL)"
	# 900180020 "S.-Allende-Str./Wendenschloßstr. (Berlin)"
 	| text _ differentiator {%
		([name, _, diff]) => ({
			name, differentiators: [diff],
		})
	%}
	# 900470000 "Cottbus, Hauptbahnhof"
	| text %comma _ text {%
		([group, _, __, name]) => ({
			name,
			group,
		})
	%}
	# 900559794 "Lauterbach(Rüg) Mole"
	# 900320601 "Eggersdorf (Strausberg), Schule"
	# 900310614 "Buckow (bei Beeskow), Bahnhof"
	| text _ differentiator %comma:? _ text {%
		([group, _, groupDiff, __, ___, name]) => ({
			name,
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# 900171701 "U Elsterwerdaer Platz (Berlin) Bus Köpenicker S."
	| sbahnUbahn _ text _ differentiator _ words {%
		([sbahnUbahn, _, name, __, diff, ___, part]) => ({
			sbahnUbahn,
			name, differentiators: [diff],
			part: [part],
		})
	%}
	# todo: reverse group & name?
	# 900552672 "Niendorf(b PCH), Groß Niendorf (Meckl.)"
	| text _ differentiator %comma _ text _ differentiator {%
		([group, _, groupDiff, __, ___, name, ____, diff]) => ({
			name, differentiators: [diff],
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# todo: reverse group & name?
	# 900552306 "Kölzin (b Hagenow), Kogel b Zarrentin (Meckl)"
	| text _ differentiator %comma _ text _ differentiator _ differentiator {%
		([group, _, groupDiff, __, ___, name, ____, diff1, _____, diff2]) => ({
			name, differentiators: [diff1, diff2],
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# 900310020 "Schöneiche (bei Berlin), Lübecker Str. [Endstelle]"
	| text _ differentiator %comma _ text _ part {%
		([group, _, groupDiff, __, ___, name, ____, part]) => ({
			name,
			part,
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# 900552209 "H.-J.-P. Lemm Str., Boizenburg (Elbe)"
	| text %comma _ text _ differentiator {%
		([name, _, __, group, ___, groupDiff]) => ({
			name,
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# 900552438 "Abzw. n Schossin, Warsow b Schwerin (Meckl"
	| text %comma _ text _ differentiator _ differentiator {%
		([name, _, __, group, ___, groupDiff1, ____, groupDiff2]) => ({
			name,
			group: {...group, differentiators: [groupDiff1, groupDiff2]},
		})
	%}
	# 900003201 "S+U Berlin Hauptbahnhof"
	| sbahnUbahn _ text {%
		([sbahnUbahn, _, name]) => ({
			sbahnUbahn,
			name,
		})
	%}
	# 900048101 "S Grunewald (Berlin)"
	# 900100001 "S+U Friedrichstr. Bhf (Berlin)"
	| sbahnUbahn _ text _ differentiator {%
		([sbahnUbahn, _, name, __, diff]) => ({
			sbahnUbahn,
			name, differentiators: [diff],
		})
	%}
	# 900245027 "S Blankenfelde (TF) Bhf"
	| sbahnUbahn _ text _ differentiator _ bhf {%
		([sbahnUbahn, _, name, __, diff, ___, bhf]) => ({
			sbahnUbahn,
			name, differentiators: [diff],
			bhf,
		})
	%}
	# 900078272 "S+U Neukölln (Berlin) [U7]"
	# 900100722 "S+U Potsdamer Platz (Bln) [Bus Stresemannstr.]"
	| sbahnUbahn _ text _ differentiator _ part {%
		([sbahnUbahn, _, name, __, diff, ___, part]) => ({
			sbahnUbahn,
			name, differentiators: [diff],
			part,
		})
	%}
	# 900110728 "Michelangelostr. (Berlin) [Bushafen]"
	| text _ differentiator _ part {%
		([name, _, diff, __, part]) => ({
			name, differentiators: [diff],
			part,
		})
	%}
	# 900150011 "Hohenschönhauser Str. [1-2] (Berlin)"
	| text _ part _ differentiator {%
		([name, _, part, __, diff]) => ({
			name, differentiators: [diff],
			part,
		})
	%}
	# 900100731 "S+U Alexanderpl/Memhardstr.[4-5]"
	| sbahnUbahn _ text _ part {%
		([sbahnUbahn, _, name, __, part]) => ({
			sbahnUbahn,
			name,
			part,
		})
	%}
	# 900058103 "S+U Yorckstr. S2 S25 S26 U7 (Berlin)"
	| sbahnUbahn _ text _ part _ differentiator {%
		([sbahnUbahn, _, name, __, part, ___, diff]) => ({
			sbahnUbahn,
			name, differentiators: [diff],
			part,
		})
	%}
	# 900552032 "Schwerin Süd (STR/Bus)"
	| text _ part {%
		([name, _, part]) => ({
			name,
			part,
		})
	%}
	# 900553120 "Ausbau (Autobahn), Upahl"
	| text _ part %comma _ text {%
		([name, _, part, __, ___, group]) => ({
			name,
			part,
			group,
		})
	%}
	# 900552158 "Warnitz (Bus), Schwerin (Meckl)"
	| text _ part %comma _ text _ differentiator {%
		([name, _, part, __, ___, group, ____, groupDiff]) => ({
			name,
			part,
			group: {...group, differentiators: [groupDiff]},
		})
	%}
	# 900470161 "Cottbus, Görlitzer Str. (Nord)"
	| text %comma _ text _ part {%
		([group, _, __, name, ___, part]) => ({
			name,
			part,
			group,
		})
	%}
	# 900275330 "Brandenburg, Görden Bhf, EKZ"
	| text %comma _ text %comma _ text {%
		([group, _, __, name, ___, ____, part]) => ({
			name,
			part: [part],
			group,
		})
	%}

differentiator ->
	  %lParen %licensePlate %rParen {%
			([_, licPl]) => asDifferentiator(licPl)
		%}
	| %lParen %differentiator %dot:? %rParen {%
			([_, diff]) => asDifferentiator(diff)
		%}
	| %lParen %differentiator %dot:? {%
			([_, diff]) => asDifferentiator(diff)
		%}
	| %lParen %atNotation _ %licensePlate %rParen {%
			([_, at, space, licPl]) => combineAtNotation([at, space, licPl], _id([licPl]))
		%}
	| %lParen %atNotation _ %differentiator %dot:? %rParen {%
			([_, at, space, diff, dot]) => combineAtNotation([at, space, diff, dot], _id([diff]))
		%}
	| %atNotation _ %differentiator %dot:? {%
			([at, space, diff, dot]) => combineAtNotation([at, space, diff, dot], _id([diff]))
		%}
	| %atNotation _ %word {%
			([at, space, word]) => combineAtNotation([at, space, word], _id([word]))
		%}

# todo: rename to English, but not to "station"
bhf ->
	%station {% _id %}

part ->
		%lBracket %station %rBracket {%
			([_, station]) => [station]
		%}
	| %lBracket line %rBracket {%
			([_, line]) => [line]
		%}
	| (%lBracket | %lParen) words (%rBracket | %rParen) {%
			([_, words]) => [words]
		%}
	| %lBracket words {%
			([_, words]) => [words]
		%}
	| lines {% id %}

lines ->
		line {%
			([line]) => [line]
		%}
	| line %space lines {%
			([line, _, lines]) => [line, ...lines]
		%}
line ->
	  %ubahnLine {% asLine %}
	| %sbahnLine {% asLine %}

text ->
		word _ text {% collapseText %} # space is optional because of `A.-B.`
	| word _ %slash _ text {% collapseText %}
	| word _ %dot _ text {% collapseText %}
	| word _ %lParen _ text {% collapseText %}
	| word _ %lParen {% collapseText %}
	| word _ %lBracket _ text {% collapseText %}
	| word _ %lBracket {% collapseText %}
	| word {% collapseText %}
word ->
		%word {% id %}
	| %differentiator {% id %}
	| %station {% id %}
	| %licensePlate {% id %}

# todo: find a better name, e.g. "modesOfTransport" or "products"
sbahnUbahn ->
	  %sbahnUbahn {% asSbahnUbahn %}
	| %sbahn {% asSbahnUbahn %}
	| %ubahn {% asSbahnUbahn %}

words ->
		%word _ words {% collapseText %}
	| %word _ %slash _ words {% collapseText %}
	| %word _ %dot _ words {% collapseText %}
	| %word {% collapseText %}

_ ->
		%space {% id %}
	| null {% () => ({type: 'text', text: ''}) %}
