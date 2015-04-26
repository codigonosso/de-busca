# de busca

A [Redis](http://redis.io)-backed Brazilian search engine that [indexes](#indexing) and [searches](#searching) text.

## Indexing

Indexing is performed by the [`lib/index`](lib/index.js) module, it receives an `id` (the id of the document/tuple/*whatever* being indexed) and its `text`.

### 1. Extract keywords ([`lib/index/extract-keywords`](lib/index/extract-keywords.js))

* Normalizes (downcases, replace diacritics and removes non alphanumeric characters) via [normalization package](http://github.com/tallesl/normalization);
* Splits the words (simple [`String.split(' ')`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/split) call);
* Removes stop words via [brazilian-stop-words package](https://github.com/tallesl/brazilian-stop-words).

### 2. Locate keywords ([`lib/index/locate-keywords`](lib/index/locate-keywords.js))

* Locates the index of each keyword in the text via [positions-in-text package](https://github.com/tallesl/positions-in-text).

### 3. Persist ([`lib/index/persist`](lib/index/persist.js))

* Adds to Redis each keyword as key with the `id` as value;
* Adds to Redis `{id}:{keyword}` key with the keyword's index in text.

## Searching

*Soon!*
