# tokenize-vbb-station-name

Station names in [VBB](http://www.vbb.de) are terribly inconsistent and user's search queries are not perfect either. This module tries to compensate all the weird edge cases:

- `S Südkreuz Bhf (Berlin)` -> `sbahn suedkreuz bahnhof berlin`
- `S Beusselstr` -> `sbahn beussel strasse`
- `S+U Warschauer Str.` -> `sbahn ubahn warschauer strasse`
- `Charité - Campus Benjamin Franklin (Berlin)` -> `charite campus benjamin franklin berlin`

[![npm version](https://img.shields.io/npm/v/tokenize-vbb-station-name.svg)](https://www.npmjs.com/package/tokenize-vbb-station-name)
[![build status](https://img.shields.io/travis/derhuerst/tokenize-vbb-station-name.svg)](https://travis-ci.org/derhuerst/tokenize-vbb-station-name)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-tokenize-station.svg)](https://david-dm.org/derhuerst/vbb-tokenize-station)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-tokenize-station.svg)](https://david-dm.org/derhuerst/vbb-tokenize-station#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/tokenize-vbb-station-name.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install tokenize-vbb-station-name
```


## Usage

```js
const tokenize = require('tokenize-vbb-station-name')

tokenize('S+U Warschauer Str.')
.join(' ') // -> 'sbahn ubahn warschauer strasse'
```

Called with no arguments or an invalid argument, `tokenize` will return `[]`.


## Contributing

If you have a question, found a bug or want to propose a feature, have a look at [the issues page](https://github.com/derhuerst/tokenize-vbb-station-name/issues).
