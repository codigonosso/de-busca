<p align="center">
  <a href="#de-busca">
    <img alt="logo" src="asset/logo/160x175.png">
  </a>
</p>

# de busca

[![build](https://travis-ci.org/codigonosso/de-busca.png)](https://travis-ci.org/codigonosso/de-busca)
[![coverage](https://coveralls.io/repos/codigonosso/de-busca/badge.png?branch=master)](https://coveralls.io/r/codigonosso/de-busca?branch=master)

A [Redis](http://redis.io)-backed Brazilian search engine that [indexes](#indexing) and [searches](#searching) text.

## Indexing

Indexing is performed by the [index module](lib/index.js), it receives an integer `id` (the id of the document/tuple/*whatever* being indexed) and its `text`.

### 1. Extract keywords ([index/extract-keywords](lib/index/extract-keywords.js))

* Normalizes (downcases, replace diacritics and removes non alphanumeric characters) via [normalization package](http://github.com/tallesl/normalization);
* Splits the words (simple [`String.split(' ')`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split) call);
* Removes stop words via [brazilian-stop-words package](https://github.com/tallesl/brazilian-stop-words).

### 2. Locate keywords ([index](lib/index.js#L16-17))

* Locates the index of each keyword in the text via [positions-in-text package](https://github.com/tallesl/positions-in-text).

### 3. Persist ([index/persist](lib/index/persist.js))

* Adds to Redis each keyword as key with the `id` as value;
* Adds to Redis `{id}:{keyword}` key with the keyword's index in text.

## Searching

*Soon!*

