'use strict'

const S_U = (offset, text) => ({
	type: 'sbahnUbahn',
	text, offset,
})
const text = (offset, text) => ({
	type: 'text',
	text, offset,
})
const diff = (offset, text, raw) => ({
	type: 'differentiator',
	text, offset,
	...(raw === undefined ? {} : {raw}),
})
const licPl = (offset, text) => ({
	type: 'licensePlate',
	text, offset,
})
const line = (offset, text) => ({
	type: 'line',
	text, offset,
})
const station = (offset, text) => ({
	type: 'station',
	text, offset,
})

const testCases = [
	// basic
	['900809012', 'Decin hl.n.', {
		name: text(0, 'Decin hl.n.'),
	}],

	// differentiator
	['900245070', 'Birkenhain (Heinersdorf)', {
		name: text(0, 'Birkenhain'),
		differentiators: [diff(12, 'Heinersdorf')],
	}],
	[  '8010318', 'Schönebeck(Elbe)', {
		name: text(0, 'Schönebeck'),
		differentiators: [diff(11, 'Elbe')],
	}],
	['900275626', 'Göttin (Brandenburg)', {
		name: text(0, 'Göttin'),
		differentiators: [diff(8, 'Brandenburg')],
	}],
	['900560011', 'Lauterbach(Rügen)', {
		name: text(0, 'Lauterbach'),
		differentiators: [diff(11, 'Rügen')],
	}],
	[  '8000252', 'Minden(Westf)', {
		name: text(0, 'Minden'),
		differentiators: [diff(7, 'Westf')],
	}],
	['900560110', 'Friedrichsruhe(Meck)', {
		name: text(0, 'Friedrichsruhe'),
		differentiators: [diff(15, 'Meck')],
	}],

	// S+U
	['900048101', 'S Grunewald (Berlin)', {
		sbahnUbahn: S_U(0, 'S'),
		name: text(2, 'Grunewald'),
		differentiators: [diff(13, 'Berlin')],
	}],
	['900041102', 'U Blissestr. (Berlin)', {
		sbahnUbahn: S_U(0, 'U'),
		name: text(2, 'Blissestr.'),
		differentiators: [diff(14, 'Berlin')],
	}],
	['900078272', 'S+U Neukölln (Berlin)', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Neukölln'),
		differentiators: [diff(14, 'Berlin')],
	}],

	// part
	['900078272', 'S+U Neukölln (Berlin) [U7]', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Neukölln'),
		differentiators: [diff(14, 'Berlin')],
		part: [line(23, 'U7')],
	}],
	['900110728', 'Michelangelostr. (Berlin) [Bushafen]', {
		name: text(0, 'Michelangelostr.'),
		differentiators: [diff(18, 'Berlin')],
		part: [text(27, 'Bushafen')],
	}],
	['900058103', 'S+U Yorckstr. S2 S25 S26 U7 (Berlin)', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Yorckstr.'),
		differentiators: [diff(29, 'Berlin')],
		part: [
			line(14, 'S2'),
			line(17, 'S25'),
			line(21, 'S26'),
			line(25, 'U7'),
		],
	}],
	['900150011', 'Hohenschönhauser Str. [1-2] (Berlin)', {
		name: text(0, 'Hohenschönhauser Str.'),
		differentiators: [diff(29, 'Berlin')],
		part: [text(23, '1-2')],
	}],
	['900100731', 'S+U Alexanderpl/Memhardstr.[4-5]', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Alexanderpl/Memhardstr.'),
		part: [text(28, '4-5')],
	}],
	['900100722', 'S+U Potsdamer Platz (Bln) [Bus Stresemannstr.]', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Potsdamer Platz'),
		differentiators: [diff(21, 'Bln')],
		part: [text(27, 'Bus Stresemannstr.')],
	}],
	['900160733', 'Münsterlandplatz (Berlin) [Ri.S+U Lichtenberg]', {
		name: text(0, 'Münsterlandplatz'),
		differentiators: [diff(18, 'Berlin')],
		part: [text(27, 'Ri.S+U Lichtenberg')],
	}],
	['900552032', 'Schwerin Süd (STR/Bus)', {
		name: text(0, 'Schwerin Süd'),
		part: [text(14, 'STR/Bus')],
	}],

	// group
	['900552460', 'B5, Redefin', {
		// todo: This is wrong, but do we parse this name properly?
		name: text(4, 'Redefin'),
		group: text(0, 'B5'),
	}],
	['900260421', 'Duben, B 87', {
		name: text(7, 'B 87'),
		group: text(0, 'Duben'),
	}],
	['900215454', 'Karstädt (PR), B 5', {
		name: text(15, 'B 5'),
		group: {
			...text(0, 'Karstädt'),
			differentiators: [diff(10, 'PR')],
		},
	}],
	['900559794', 'Lauterbach(Rüg) Mole', {
		name: text(16, 'Mole'),
		group: {
			...text(0, 'Lauterbach'),
			differentiators: [diff(11, 'Rüg')],
		},
	}],
	['900360015', 'Frankfurt (Oder), Anger', {
		name: text(18, 'Anger'),
		group: {
			...text(0, 'Frankfurt'),
			differentiators: [diff(11, 'Oder')],
		},
	}],
	['900553120', 'Ausbau (Autobahn), Upahl', {
		name: text(0, 'Ausbau'),
		part: [text(8, 'Autobahn')],
		group: text(19, 'Upahl'),
	}],
	['900552158', 'Warnitz (Bus), Schwerin (Meckl)', {
		name: text(0, 'Warnitz'),
		part: [text(9, 'Bus')],
		group: {
			...text(15, 'Schwerin'),
			differentiators: [diff(25, 'Meckl')],
		},
	}],
	['900470000', 'Cottbus, Hauptbahnhof', {
		name: text(9, 'Hauptbahnhof'),
		group: text(0, 'Cottbus'),
	}],
	['900810019', 'Wroclaw (PL), Glowny', {
		name: text(14, 'Glowny'),
		group: {
			...text(0, 'Wroclaw'),
			differentiators: [diff(9, 'PL')],
		},
	}],
	['900550324', 'Coswig (Anhalt), Bahnhof', {
		name: text(17, 'Bahnhof'),
		group: {
			...text(0, 'Coswig'),
			differentiators: [diff(8, 'Anhalt')],
		},
	}],
	['900320601', 'Eggersdorf (Strausberg), Schule', {
		name: text(25, 'Schule'),
		group: {
			...text(0, 'Eggersdorf'),
			differentiators: [diff(12, 'Strausberg')],
		},
	}],
	['900210521', 'Ketzin (Havel), Baumschule', {
		name: text(16, 'Baumschule'),
		group: {
			...text(0, 'Ketzin'),
			differentiators: [diff(8, 'Havel')],
		},
	}],
	['900205663', 'Wusterhausen (Dosse), Bahnhof', {
		name: text(22, 'Bahnhof'),
		group: {
			...text(0, 'Wusterhausen'),
			differentiators: [diff(14, 'Dosse')],
		},
	}],
	['900550235', 'Blankensee(Meckl), Bahnhof', {
		name: text(19, 'Bahnhof'),
		group: {
			...text(0, 'Blankensee'),
			differentiators: [diff(11, 'Meckl')],
		},
	}],
	['900261873', 'Schönwalde (Spreewald), Schule', {
		name: text(24, 'Schule'),
		group: {
			...text(0, 'Schönwalde'),
			differentiators: [diff(12, 'Spreewald')],
		},
	}],
	['900310007', 'Jacobsdorf (Mark), Bahnhof', {
		name: text(19, 'Bahnhof'),
		group: {
			...text(0, 'Jacobsdorf'),
			differentiators: [diff(12, 'Mark')],
		},
	}],
	['900203512', 'Schönfließ (OHV), Bieselheide', {
		name: text(18, 'Bieselheide'),
		group: {
			...text(0, 'Schönfließ'),
			differentiators: [diff(12, 'OHV')],
		},
	}],
	['900310005', 'Berkenbrück (LOS), Bahnhof', {
		name: text(19, 'Bahnhof'),
		group: {
			...text(0, 'Berkenbrück'),
			differentiators: [diff(13, 'LOS')],
		},
	}],
	['900220004', 'Seddin (PM), Bahnhof', {
		name: text(13, 'Bahnhof'),
		group: {
			...text(0, 'Seddin'),
			differentiators: [diff(8, 'PM')],
		},
	}],
	['900215455', 'Karstädt (PR), Bahnhof', {
		name: text(15, 'Bahnhof'),
		group: {
			...text(0, 'Karstädt'),
			differentiators: [diff(10, 'PR')],
		},
	}],
	['900340003', 'Pinnow (UM), Bahnhof', {
		name: text(13, 'Bahnhof'),
		group: {
			...text(0, 'Pinnow'),
			differentiators: [diff(8, 'UM')],
		},
	}],
	['900350529', 'Krummensee (BAR), Dorf', {
		name: text(18, 'Dorf'),
		group: {
			...text(0, 'Krummensee'),
			differentiators: [diff(12, 'BAR')],
		},
	}],
	['900320274', 'Herzfelde (MOL), Kirche', {
		name: text(17, 'Kirche'),
		group: {
			...text(0, 'Herzfelde'),
			differentiators: [diff(11, 'MOL')],
		},
	}],
	['900261082', 'Schulzendorf (LDS), Kita', {
		name: text(20, 'Kita'),
		group: {
			...text(0, 'Schulzendorf'),
			differentiators: [diff(14, 'LDS')],
		},
	}],

	// group + name + part
	['900275330', 'Brandenburg, Görden Bhf, EKZ', {
		name: text(13, 'Görden Bhf'),
		part: [text(25, 'EKZ')],
		group: text(0, 'Brandenburg'),
	}],
	['900470161', 'Cottbus, Görlitzer Str. (Nord)', {
		name: text(9, 'Görlitzer Str.'),
		part: [text(25, 'Nord')],
		group: text(0, 'Cottbus'),
	}],
	['900470193', 'Cottbus, Görlitzer Str. (West)', {
		name: text(9, 'Görlitzer Str.'),
		part: [text(25, 'West')],
		group: text(0, 'Cottbus'),
	}],
	['900470332', 'Cottbus, Görlitzer Str. (Süd)', {
		name: text(9, 'Görlitzer Str.'),
		part: [text(25, 'Süd')],
		group: text(0, 'Cottbus'),
	}],

	// bhf
	['900810023', 'Zielona Gora (PL), Bahnhof', {
		name: text(19, 'Bahnhof'),
		group: {
			...text(0, 'Zielona Gora'),
			differentiators: [diff(14, 'PL')],
		},
	}],
	['900100001', 'S+U Friedrichstr. Bhf (Berlin)', {
		sbahnUbahn: S_U(0, 'S+U'),
		name: text(4, 'Friedrichstr. Bhf'),
		differentiators: [diff(23, 'Berlin')],
	}],
	['900245027', 'S Blankenfelde (TF) Bhf', {
		sbahnUbahn: S_U(0, 'S'),
		name: text(2, 'Blankenfelde'),
		differentiators: [diff(16, 'TF')],
		bhf: station(20, 'Bhf'),
	}],
	['8070003', 'Frankfurt(M) Flughafen Fernbf', {
		name: text(13, 'Flughafen Fernbf'),
		group: {
			...text(0, 'Frankfurt'),
			differentiators: [diff(10, 'M')],
		},
	}],
	['900445956', 'Kunersdorf (SPN), Bahnhof', {
		name: text(18, 'Bahnhof'),
		group: {
			...text(0, 'Kunersdorf'),
			differentiators: [diff(12, 'SPN')],
		},
	}],
	['900550024', 'Weißwasser (Oberlausitz), Bahnhof', {
		name: text(26, 'Bahnhof'),
		group: {
			...text(0, 'Weißwasser'),
			differentiators: [diff(12, 'Oberlausitz')],
		},
	}],
	['900550406', 'Fürth(Bay), Hauptbahnhof', {
		name: text(12, 'Hauptbahnhof'),
		group: {
			...text(0, 'Fürth'),
			differentiators: [diff(6, 'Bay')],
		},
	}],
	['900550430', 'Naumburg(Saale), Hauptbahnhof', {
		name: text(17, 'Hauptbahnhof'),
		group: {
			...text(0, 'Naumburg'),
			differentiators: [diff(9, 'Saale')],
		},
	}],

	// slash
	['900001103', 'Wiebestr./Huttenstr. (Berlin)', {
		name: text(0, 'Wiebestr./Huttenstr.'),
		differentiators: [diff(22, 'Berlin')],
	}],
	['900110713', 'Prenzlauer Allee/ Ostseestr. (Berlin)', {
		name: text(0, 'Prenzlauer Allee/ Ostseestr.'),
		differentiators: [diff(30, 'Berlin')],
	}],
	['900191702', 'Sonnenallee /Baumschulenstr. (Berlin)', {
		name: text(0, 'Sonnenallee /Baumschulenstr.'),
		differentiators: [diff(30, 'Berlin')],
	}],

	// at notation
	['900557423', 'Dambeck (b LWL)', {
		name: text(0, 'Dambeck'),
		differentiators: [diff(9, 'b LWL', licPl(11, 'LWL'))],
	}],
	['900220215', 'Grebs (bei Lehnin)', {
		name: text(0, 'Grebs'),
		differentiators: [diff(7, 'bei Lehnin', diff(11, 'Lehnin'))],
	}],
	['900553095', 'Bülow (b Schwerin)', {
		name: text(0, 'Bülow'),
		differentiators: [diff(7, 'b Schwerin', diff(9, 'Schwerin'))],
	}],
	['900222111', 'Kranepuhl (bei Bad Belzig)', {
		name: text(0, 'Kranepuhl'),
		differentiators: [diff(11, 'bei Bad Belzig', diff(15, 'Bad Belzig'))],
	}],
	['900222139', 'Neuendorf (bei Niemegk)', {
		name: text(0, 'Neuendorf'),
		differentiators: [diff(11, 'bei Niemegk', diff(15, 'Niemegk'))],
	}],

	// at notation + group
	['900552209', 'H.-J.-P. Lemm Str., Boizenburg (Elbe)', {
		name: text(0, 'H.-J.-P. Lemm Str.'),
		group: {
			...text(20, 'Boizenburg'),
			differentiators: [diff(32, 'Elbe')],
		},
	}],
	['900552155', 'Rahlstedter Str./Gadebebuscher Str., Schwerin (Me',
	// todo
	// {
	// 	name: text(0, 'Rahlstedter Str./Gadebebuscher Str.'),
	// 	group: text(20, 'Schwerin (Me'),
	// }
	],
	['900320638', 'Petershagen (b. Berlin), W.-Pieck-Str./Schule', {
		name: text(25, 'W.-Pieck-Str./Schule'),
		group: {
			...text(0, 'Petershagen'),
			differentiators: [diff(13, 'b. Berlin', diff(16, 'Berlin'))],
		},
	}],
	['900261992', 'Waldow (bei Brand), Waldstr.', {
		name: text(20, 'Waldstr.'),
		group: {
			...text(0, 'Waldow'),
			differentiators: [diff(8, 'bei Brand', diff(12, 'Brand'))],
		},
	}],
	['900550062', 'Burg (bei Magdeburg), Bahnhof', {
		name: text(22, 'Bahnhof'),
		group: {
			...text(0, 'Burg'),
			differentiators: [diff(6, 'bei Magdeburg', diff(10, 'Magdeburg'))],
		},
	}],
	['900341270', 'Wilmersdorf (bei Angermünde), Bahnhof', {
		name: text(30, 'Bahnhof'),
		group: {
			...text(0, 'Wilmersdorf'),
			differentiators: [diff(13, 'bei Angermünde', diff(17, 'Angermünde'))],
		},
	}],
	['900220306', 'Buchholz (bei Treuenbrietzen), Bahnhof', {
		name: text(31, 'Bahnhof'),
		group: {
			...text(0, 'Buchholz'),
			differentiators: [diff(10, 'bei Treuenbrietzen', diff(14, 'Treuenbrietzen'))],
		},
	}],
	['900350715', 'Stolzenhagen (bei Wandlitz), Kirche', {
		name: text(29, 'Kirche'),
		group: {
			...text(0, 'Stolzenhagen'),
			differentiators: [diff(14, 'bei Wandlitz', diff(18, 'Wandlitz'))],
		},
	}],
	['900220211', 'Rietz (bei Brandenburg), Dorf', {
		name: text(25, 'Dorf'),
		group: {
			...text(0, 'Rietz'),
			differentiators: [diff(7, 'bei Brandenburg', diff(11, 'Brandenburg'))],
		},
	}],
	['900310980', 'Petersdorf (bei Fürstenwalde), Am Fuchsbau', {
		name: text(31, 'Am Fuchsbau'),
		group: {
			...text(0, 'Petersdorf'),
			differentiators: [diff(12, 'bei Fürstenwalde', diff(16, 'Fürstenwalde'))],
		},
	}],
	['900310614', 'Buckow (bei Beeskow), Bahnhof', {
		name: text(22, 'Bahnhof'),
		group: {
			...text(0, 'Buckow'),
			differentiators: [diff(8, 'bei Beeskow', diff(12, 'Beeskow'))],
		},
	}],
	['900435661', 'Naundorf (bei Vetschau), Ortsmitte', {
		name: text(25, 'Ortsmitte'),
		group: {
			...text(0, 'Naundorf'),
			differentiators: [diff(10, 'bei Vetschau', diff(14, 'Vetschau'))],
		},
	}],
	['900552899', 'Penzlin (b Lübz), Gallin-Kuppentin', {
		name: text(18, 'Gallin-Kuppentin'),
		group: {
			...text(0, 'Penzlin'),
			differentiators: [diff(9, 'b Lübz', diff(11, 'Lübz'))],
		},
	}],

	// 2 differentiators
	['900553093', 'Runow, Bülow b Schwerin (Meckl)', {
		name: text(0, 'Runow'),
		group: {
			...text(7, 'Bülow'),
			differentiators: [
				diff(13, 'b Schwerin', diff(15, 'Schwerin')),
				diff(25, 'Meckl'),
			],
		},
	}],
	['900552438', 'Abzw. n Schossin, Warsow b Schwerin (Meckl)', {
		name: text(0, 'Abzw. n Schossin'),
		group: {
			...text(18, 'Warsow'),
			differentiators: [
				diff(25, 'b Schwerin', diff(27, 'Schwerin')),
				diff(37, 'Meckl'),
			],
		},
	}],
	['900553022', 'Pampow Stralendorfer Str., Pampow b Schwerin (Meck', {
		name: text(0, 'Pampow Stralendorfer Str.'),
		group: {
			...text(27, 'Pampow'),
			differentiators: [
				diff(34, 'b Schwerin', diff(36, 'Schwerin')),
				diff(46, 'Meck'),
			],
		},
	}],

	// 3 differentiators
	['900552306', 'Kölzin (b Hagenow), Kogel b Zarrentin (Meckl)', {
		// todo: is it this way or name/group swapped?
		name: text(20, 'Kogel'),
		differentiators: [
			diff(26, 'b Zarrentin', diff(28, 'Zarrentin')),
			diff(39, 'Meckl'),
		],
		group: {
			...text(0, 'Kölzin'),
			differentiators: [diff(8, 'b Hagenow', diff(10, 'Hagenow'))],
		},
	}],

	// kitchen sink
	['900171701', 'U Elsterwerdaer Platz (Berlin) Bus Köpenicker S.', {
		sbahnUbahn: S_U(0, 'U'),
		name: text(2, 'Elsterwerdaer Platz'),
		part: [text(31, 'Bus Köpenicker S.')],
		differentiators: [diff(23, 'Berlin')],
	}],
	['900552672', 'Niendorf(b PCH), Groß Niendorf (Meckl.)', {
		name: text(17, 'Groß Niendorf'),
		differentiators: [diff(32, 'Meckl.')],
		group: {
			...text(0, 'Niendorf'),
			differentiators: [diff(9, 'b PCH', licPl(11, 'PCH'))],
		},
	}],
]

module.exports = testCases
