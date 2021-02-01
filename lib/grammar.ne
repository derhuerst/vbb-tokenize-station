@{%
const lexer = require('./lexer')

const asText = ([token]) => ({
	type: 'text',
	value: token.value,
	text: token.text,
	offset: token.offset,
})

const collapseText = (args) => {
	if (args.length === 1) return args[0]
	const newTokens = args.slice(0, -1)
	const text = args[args.length - 1]
	return {
		type: 'text',
		value: newTokens.map(t => t.value).join('') + text.value,
		text: newTokens.map(t => t.text).join('') + text.text,
		offset: args[0].offset,
	}
}

const combineAtNotation = (tokens, raw) => {
	console.error(tokens)
	return {
	type: 'differentiator',
	value: tokens.map(t => t.value).join(''),
	text: tokens.map(t => t.text).join(''),
	offset: tokens[0].offset,
	raw,
}}
%}
@lexer lexer

exp ->
  # 900553095 "Bülow (b Schwerin)"
	# 900557423 "Dambeck (b LWL)"
 	text _ differentiator {%
		([name, _, diffs]) => ({
			name, differentiators: diffs,
		})
	%}
	# 900470000 "Cottbus, Hauptbahnhof"
	# todo: 900552460 "B5, Redefin"
	| text %comma _ text {%
		([group, _, __, name]) => ({
			name,
			group,
		})
	%}
	# 900559794 "Lauterbach(Rüg) Mole"
	| text _ differentiator _ text {%
		([group, _, groupDiffs, __, name]) => ({
			name,
			group: {...group, differentiators: groupDiffs},
		})
	%}
	# 900320601 "Eggersdorf (Strausberg), Schule"
	# 900310614 "Buckow (bei Beeskow), Bahnhof"
	| text _ differentiator %comma _ text {%
		([group, _, groupDiffs, __, ___, name]) => ({
			name,
			group: {...group, differentiators: groupDiffs},
		})
	%}
	# 900552672 "Niendorf(b PCH), Groß Niendorf (Meckl.)"
	| text _ differentiator %comma _ text _ differentiator {%
		([group, _, groupDiffs, __, ___, name, ____, diffs]) => ({
			name, differentiators: diffs,
			group: {...group, differentiators: groupDiffs},
		})
	%}
	# 900552209 "H.-J.-P. Lemm Str., Boizenburg (Elbe)"
	| text %comma _ differentiator _ differentiator {%
		([name, _, group, __, groupDiff]) => ({
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
	# 900048101 "S Grunewald (Berlin)"
	# 900100001 "S+U Friedrichstr. Bhf (Berlin)"
	| sbahnUbahn _ text _ differentiator {%
		([sbahnUbahn, _, name, __, diffs]) => ({
			sbahnUbahn,
			name, differentiators: diffs,
		})
	%}
	# 900245027 "S Blankenfelde (TF) Bhf"
	| sbahnUbahn _ text _ differentiator _ bhf {%
		([sbahnUbahn, _, name, __, diffs, ___, bhf]) => ({
			sbahnUbahn,
			name, differentiators: diffs,
			bhf,
		})
	%}
	# 900078272 "S+U Neukölln (Berlin) [U7]"
	# 900100722 "S+U Potsdamer Platz (Bln) [Bus Stresemannstr.]"
	| sbahnUbahn _ text _ differentiator _ part {%
		([sbahnUbahn, _, name, __, diffs, ___, part]) => ({
			sbahnUbahn,
			name, differentiators: diffs,
			part,
		})
	%}
	# 900058103 "S+U Yorckstr. S2 S25 S26 U7 (Berlin)"
	| sbahnUbahn _ text _ part _ differentiator {%
		([sbahnUbahn, _, name, __, part, ___, diffs]) => ({
			sbahnUbahn,
			name, differentiators: diffs,
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
	# 900470161 "Cottbus, Görlitzer Str. (Nord)"
	| text %comma _ text _ part {%
		([group, _, __, name, ___, part]) => ({
			name,
			part,
			group,
		})
	%}

text ->
		word %space text {% collapseText %}
	| word %slash text {% collapseText %}
	| word text {% collapseText %} # e.g. `A.-B.`
	| word {% asText %}
word ->
		%word {% id %}
	| %differentiator {% id %}
	| %station {% id %}
	| %licensePlate {% id %}

differentiator ->
	  %lParen %licensePlate %rParen {%
			([_, licPl]) => licPl
		%}
	| %lParen %differentiator %rParen {%
			([_, diff]) => diff
		%}
	| %lParen %differentiator %dot %rParen {%
			([_, diff]) => diff
		%}
	| %lParen %atNotation _ %licensePlate %rParen {%
			([_, at, space, licPl]) => combineAtNotation([at, space, licPl], licPl)
		%}
	| %lParen %atNotation _ %differentiator %rParen {%
			([_, at, space, diff]) => combineAtNotation([at, space, diff], diff)
		%}
	| %lParen %atNotation _ %differentiator %dot %rParen {%
			([_, at, space, diff, dot]) => combineAtNotation([at, space, diff, dot], diff)
		%}
	| %atNotation _ %differentiator {%
			([at, space, diff]) => combineAtNotation([at, space, diff], diff)
		%}
	| %atNotation _ %differentiator %dot {%
			([at, space, diff, dot]) => combineAtNotation([at, space, diff, dot], diff)
		%}

# todo: find a better name, e.g. "modesOfTransport" or "products"
sbahnUbahn ->
	  %sbahnUbahn {% id %}
	| %sbahn {% id %}
	| %ubahn {% id %}

# todo: rename to English, but not to "station"
bhf ->
	%station {% id %}

part ->
		%lBracket station %rBracket {%
			([_, station]) => [station]
		%}
	| %lParen words %rParen {%
			([_, words]) => words
		%}
	| %lBracket words %rBracket {%
			([_, words]) => words
		%}
	| %lBracket line %rBracket {%
			([_, line]) => [line]
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
	  %ubahnLine {% id %}
	| %sbahnLine {% id %}

words ->
		%word %space words {% collapseText %}
	| %word %slash words {% collapseText %}
	| %word {% asText %}

_ ->
		%space {% id %}
	| null {% () => ({type: 'text', value: '', text: ''}) %}
