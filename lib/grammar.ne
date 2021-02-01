@{%
const lexer = require('./lexer')

@lexer lexer

exp ->
  # 900553095 "Bülow (b Schwerin)"
	# 900557423 "Dambeck (b LWL)"
 	text _ differentiator
	# 900470000 "Cottbus, Hauptbahnhof"
	# todo: 900552460 "B5, Redefin"
	| text %comma _ text
	# 900559794 "Lauterbach(Rüg) Mole"
	| text _ differentiator _ text
	# 900320601 "Eggersdorf (Strausberg), Schule"
	# 900310614 "Buckow (bei Beeskow), Bahnhof"
	| text _ differentiator %comma _ text
	# 900552672 "Niendorf(b PCH), Groß Niendorf (Meckl.)"
	| text _ differentiator %comma _ text _ differentiator
	# 900552209 "H.-J.-P. Lemm Str., Boizenburg (Elbe)"
	| text %comma _ differentiator _ differentiator
	# 900552438 "Abzw. n Schossin, Warsow b Schwerin (Meckl"
	| text %comma _ text _ differentiator _ differentiator
	# 900048101 "S Grunewald (Berlin)"
	# 900100001 "S+U Friedrichstr. Bhf (Berlin)"
	| sbahnUbahn _ text _ differentiator
	# 900245027 "S Blankenfelde (TF) Bhf"
	| sbahnUbahn _ text _ differentiator _ bhf
	# 900078272 "S+U Neukölln (Berlin) [U7]"
	# 900100722 "S+U Potsdamer Platz (Bln) [Bus Stresemannstr.]"
	| sbahnUbahn _ text _ differentiator _ part
	# 900058103 "S+U Yorckstr. S2 S25 S26 U7 (Berlin)"
	| sbahnUbahn _ text _ part _ differentiator
	# 900552032 "Schwerin Süd (STR/Bus)"
	| text _ part
	# 900553120 "Ausbau (Autobahn), Upahl"
	| text _ part %comma _ text
	# 900470161 "Cottbus, Görlitzer Str. (Nord)"
	| text %comma _ text _ part

text ->
		word %space text
	| word %slash text
	| word text # e.g. `A.-B.`
	| word
word ->
		%word
	| %differentiator
	| %station
	| %licensePlate

differentiator ->
	  %lParen %licensePlate %rParen
	| %lParen %differentiator %rParen
	| %lParen %differentiator %dot %rParen
	| %lParen %atNotation _ %licensePlate %rParen
	| %lParen %atNotation _ %differentiator %rParen
	| %lParen %atNotation _ %differentiator %dot %rParen
	| %atNotation _ %differentiator
	| %atNotation _ %differentiator %dot

# todo: find a better name, e.g. "modesOfTransport" or "products"
sbahnUbahn ->
	  %sbahnUbahn
	| %sbahn
	| %ubahn

# todo: rename to English, but not to "station"
bhf ->
	%station

part ->
		%lBracket station %rBracket
	| %lParen words %rParen
	| %lBracket words %rBracket
	| %lBracket line %rBracket
	| lines

lines ->
		line
	| line %space lines
line ->
	  %ubahnLine
	| %sbahnLine

words ->
		%word %space words
	| %word %slash words
	| %word

_ ->
		%space
	| null
