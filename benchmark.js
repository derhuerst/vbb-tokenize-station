'use strict'

const {Suite} = require('benchmark')
const tokenize = require('.')

const names = [
	'S Grunewald (Berlin)', // 900048101
	'U Blissestr. (Berlin)', // 900041102
	'S+U Neukölln (Berlin)', // 900078272

	'S+U Neukölln (Berlin) [U7]', // 900078272
	'S+U Yorckstr. S2 S25 S26 U7 (Berlin)', // 900058103

	'S+U Potsdamer Platz (Bln) [Bus Stresemannstr.]', // 900100722
	'Schwerin Süd (STR/Bus)', // 900552032
	'Ausbau (Autobahn), Upahl', // 900553120

	'Cottbus, Hauptbahnhof', // 900470000
	'Wroclaw (PL), Glowny', // 900810019
	'Zielona Gora (PL), Bahnhof', // 900810023
	'S+U Friedrichstr. Bhf (Berlin)', // 900100001

	'Wiebestr./Huttenstr. (Berlin)', // 900001103

	'H.-J.-P. Lemm Str., Boizenburg (Elbe)', // 900552209

	'Petershagen (b. Berlin), W.-Pieck-Str./Schule', // 900320638
	'Waldow (bei Brand), Waldstr.', // 900261992
	'Burg (bei Magdeburg), Bahnhof', // 900550062
	'Wilmersdorf (bei Angermünde), Bahnhof', // 900341270
	'Buchholz (bei Treuenbrietzen), Bahnhof', // 900220306
	'Stolzenhagen (bei Wandlitz), Kirche', // 900350715
	'Birkenhain (Heinersdorf)', // 900245070
	'Schönebeck(Elbe)', // 8010318
	'Göttin (Brandenburg)', // 900275626
	'Rietz (bei Brandenburg), Dorf', // 900220211
	'Grebs (bei Lehnin)', // 900220215
	'Petersdorf (bei Fürstenwalde), Am Fuchsbau', // 900310980
	'Frankfurt (Oder), Anger', // 900360015
	'Buckow (bei Beeskow), Bahnhof', // 900310614
	'Eggersdorf (Strausberg), Schule', // 900320601
	'Coswig (Anhalt), Bahnhof', // 900550324
	'Neuendorf (bei Niemegk)', // 900222139
	'Bülow (b Schwerin)', // 900553095
	'Runow, Bülow b Schwerin (Meckl)', // 900553093
	'Dambeck (b LWL)', // 900557423
	'Naundorf (bei Vetschau), Ortsmitte', // 900435661
	'Cottbus, Görlitzer Str. (Nord)', // 900470161
	'Cottbus, Görlitzer Str. (West)', // 900470193
	'Cottbus, Görlitzer Str. (Süd)', // 900470332
	'Naumburg(Saale), Hauptbahnhof', // 900550430
	'Lauterbach(Rügen)', // 900560011
	'Lauterbach(Rüg) Mole', // 900559794
	'Penzlin (b Lübz), Gallin-Kuppentin', // 900552899

	'B5, Redefin', // 900552460
	'Karstädt (PR), B 5', // 900215454
	'Duben, B 87', // 900260421

	'Ketzin (Havel), Baumschule', // 900210521
	'Wusterhausen (Dosse), Bahnhof', // 900205663
	'Blankensee(Meckl), Bahnhof', // 900550235
	'Schönwalde (Spreewald), Schule', // 900261873
	'Schönfließ (OHV), Bieselheide', // 900203512
	'S Blankenfelde (TF) Bhf', // 900245027
	'Berkenbrück (LOS), Bahnhof', // 900310005
	'Jacobsdorf (Mark), Bahnhof', // 900310007
	'Seddin (PM), Bahnhof', // 900220004
	'Karstädt (PR), Bahnhof', // 900215455
	'Minden(Westf)', // 8000252
	'Pinnow (UM), Bahnhof', // 900340003
	'Krummensee (BAR), Dorf', // 900350529
	'Herzfelde (MOL), Kirche', // 900320274
	'Schulzendorf (LDS), Kita', // 900261082
	'Kunersdorf (SPN), Bahnhof', // 900445956
	'Friedrichsruhe(Meck)', // 900560110
	'Niendorf(b PCH), Groß Niendorf (Meckl.)', // 900552672
	'Rahlstedter Str./Gadebebuscher Str., Schwerin (Me', // 900552155
	'Abzw. n Schossin, Warsow b Schwerin (Meckl)', // 900552438
	'Weißwasser (Oberlausitz), Bahnhof', // 900550024
	'Fürth(Bay), Hauptbahnhof', // 900550406
]

new Suite()

.add(`tokenize ${names.length} names`, () => {
	for (let i = 0; i < names.length; i++) {
		const name = names[i]

		const idx = Math.round(Math.random() * name.length)
		const randomStr = Math.random().toString(16).slice(2, 8)
		const spliced = name.slice(0, idx) + randomStr + name.slice(idx)
		tokenize(spliced)
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
