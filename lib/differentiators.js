'use strict'

// Some phrases are commonly used in signage to tell two identically
// named (but geographically distinct places) apart. We'll call them
// "differentiator" here.
// Example: "Frankfurt" & "Frankfurt (Oder)".

// Note: This list should only contain those differentiators that are
// used in public transportation signage.

// todo: are some of them duplicates of German license plate prefixes?
const publicTransportDifferentiators = [
	// rivers/lakes
	'Aller', // https://de.wikipedia.org/wiki/Aller
	'Dahme',
	'Dosse',
	'Elbe',
	'Elster', // https://de.wikipedia.org/wiki/Elster_(Begriffsklärung)
	'Havel',
	'Main',
	'Oder',
	'Müritz',
	'Nuthe Urstromtal', 'Nuthe-Urstromtal', // https://de.wikipedia.org/wiki/Nuthe
	'Saale',
	'Weser',

	// regions/cities
	'Altmark',
	'Angermünde',
	'Anhalt',
	'Bad Belzig',
	'Bad Dob', 'Bad Dob.', 'Bad Doberan',
	'Bay', 'Bay.', 'Bayern',
	'Beeskow',
	'Bln', 'Bln.', 'Berlin',
	'Boizenbg', 'Boizenbg.', 'Boizenburg',
	'Brand', // https://de.wikipedia.org/wiki/Brand_(Begriffsklärung)
	'Brandenburg', // https://de.wikipedia.org/wiki/Brandenburg_(Begriffsklärung)
	'Brenitz',
	'Brück',
	'Buckow',
	'Dahlwitz-Hoppegarten',
	'Dahme', // https://de.wikipedia.org/wiki/Dahme/Mark
	'Drebkau',
	'Dresden',
	'Döbern',
	'Fichtwald',
	'Forst', // https://de.wikipedia.org/wiki/Forst_(Begriffsklärung)
	'Fürstenwalde',
	'Gadebusch',
	'Golßen',
	'Gransee',
	'Groß Köris',
	'Großwudicke',
	'Görlsdorf',
	'Götz',
	'Hagenow',
	'Heinersdorf', // https://de.wikipedia.org/wiki/Heinersdorf
	'Herzberg',
	'Holst', // Holstein
	'Jeserig',
	'Jüterbog',
	'Jüterbog',
	'Kleinow',
	'Klinge',
	'Klockow',
	'Kr Rostock',
	'Kyritz',
	'Lehnin',
	'Leipzig',
	'Luckau',
	'Luckenwalde',
	'Ludwigsfelde',
	'Ludwigslust',
	'Lübben',
	'Lübtheen',
	'Lübz',
	'Magdeburg',
	'Mark',
	'Meck', 'Meck.', 'Meckl', 'Meckl.', 'Mecklenburg', // wtf
	'Märkische Schweiz',
	'Münchehofe',
	'Nauen',
	'Neuruppin',
	'Niedergörsdorf',
	'Niemegk', // https://de.wikipedia.org/wiki/Niemegk_(Kreis_Bitterfeld)
	'Oberlausitz',
	'Oderberg',
	'Oldb', 'Oldb.', 'Oldenburg',
	'Oppelhain',
	'Osterburg',
	'Ostfriesl', 'Ostfriesl.', 'Ostfriesland',
	'Parchim',
	'Pasewalk',
	'Passow',
	'Poel',
	'Premnitz',
	'Prenzlau',
	'Pritzwalk',
	'Pritzwalk',
	'Putlitz',
	'Riesa',
	'Rietzneuendorf',
	'Rostock',
	'Ruppin',
	'Rüg', 'Rüg.', 'Rügen', // wtf
	'Sachs', 'Sachs.', 'Sachsen',
	'Schwedt',
	'Schwerin',
	'Spreewald',
	'Sternberg',
	'Storkow',
	'Strausberg',
	'Sylt',
	'Tantow',
	'Templin',
	'Teupitz',
	'Treuenbrietzen',
	'Vetschau',
	'Waltersdorf',
	'Wandlitz',
	'Westf', 'Westf.', 'Westfalen',
	'Wiesenburg',
	'Wismar',
	'Wittenberge',
	'Wittstock',
	'Wriezen',
	'Wusterwitz',
	'Zarrentin', // wtf
	'Ziesar',
	'Zippendorf', // wtf
	'Zossen',
]

// todo: 900553121 Ausbau (Holz-Lange), Upahl

// todo: https://query.wikidata.org/#SELECT%20%3Fitem%20%3FitemLabel%0AWHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ82794%20.%0A%20%20%3Fitem%20wdt%3AP17%20wd%3AQ183%20.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22de%22%20%7D%0A%7D

module.exports = publicTransportDifferentiators
