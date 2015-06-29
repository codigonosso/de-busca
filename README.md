<p align="center">
  <a href="#de-busca">
    <img alt="logo" src="asset/logo/160x175.png">
  </a>
</p>

# de busca

[![][build-img]][build]
[![][coverage-img]][coverage]

A [Redis]-backed Brazilian search engine.

[build]:     https://travis-ci.org/codigonosso/de-busca
[build-img]: https://travis-ci.org/codigonosso/de-busca.png

[coverage]:     https://coveralls.io/r/codigonosso/de-busca?branch=master
[coverage-img]: https://coveralls.io/repos/codigonosso/de-busca/badge.png?branch=master

[redis]: http://redis.io

## Indexes

There are two types of indexes: *WORD-ONLY* and *WORD-AND-ID*:
 * WORD-ONLY indexes has a word as key and a set of ids as value (ids of documents that the word appears).
 * WORD-AND-ID indexes has `word:id` as key and a set of the positions (indexes) that word appears in the document as value.

## Indexing

Indexing is performed by the [indexing module][indexing], it receives an `id` and a `text`:
  1. Extract keywords ([keyword module][keywords]).
  1. Locate keywords ([positions-in-text package][positions]).
  1. Persist the values ([persistence module][persistence]).

[indexing]:    lib/indexing.js
[keywords]:    lib/keywords.js
[positions]:   https://github.com/tallesl/positions-in-text
[persistence]: lib/persistence.js

## Searching

*Soon!*

