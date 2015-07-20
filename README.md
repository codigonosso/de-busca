<p align="center">
  <a href="#de-busca">
    <img alt="logo" src="asset/logo/160x175.png">
  </a>
</p>

# de busca

[![][build-img]][build]
[![][coverage-img]][coverage]

A [Redis]-backed Brazilian search engine that indexes (write) and searches (read) text.

[build]:     https://travis-ci.org/codigonosso/de-busca
[build-img]: https://travis-ci.org/codigonosso/de-busca.png

[coverage]:     https://coveralls.io/r/codigonosso/de-busca?branch=master
[coverage-img]: https://coveralls.io/repos/codigonosso/de-busca/badge.png?branch=master

[Redis]: http://redis.io

## How it works

When indexing, the client provides an `id` and a `text`.
When searching, the client provides a `text` and receives a set of `ids` of the matches.

It sanitizes the text (on both indexing and searching) by removing Brazilian [stop words], [normalizing] and translating integers to [in full].

For searching, it uses [Baeza's bitap] to find the matches and [Wagner–Fischer algorithm] to pick the best word match.

[stop words]:               https://github.com/tallesl/brazilian-stop-words
[normalizing]:              https://github.com/tallesl/normalization
[in full]:                  https://github.com/tallesl/por-extenso
[Baeza's bitap]:            https://github.com/tallesl/bitap
[Wagner–Fischer algorithm]: https://github.com/tallesl/wagner-fischer

## Usage

You can either `npm install de-busca -g`, clone this repository and run `bin/de-busca.js` or deploy to Heroku:

[![][heroku-img]][heroku]

Here's the API (http):

* `PUT /index/{id}`, the text goes in the request body (`text/plain`);
 * Returns [201] if indexed successfully;
 * Returns [204] if (after sanitizing) there's no text to index.
* `DELETE /index/{id}`;
 * Returns [200] if deleted successfully; 
* `GET /search/{text}`;
 * Returns [200] and the matched `ids` in the response body (`application/json`).

All operations returns [401] if the provided [authentication] doesn't match `DEBUSCA_AUTH` configuration.

[200]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200
[201]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#201
[204]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#204
[401]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400

[heroku]:     https://heroku.com/deploy
[heroku-img]: https://www.herokucdn.com/deploy/button.png

[authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication

## Configuration

Environment variables:
 * `DEBUSCA_AUTH`: an `user:password` checked when the API is used;
 * `DEBUSCA_REDISPASSWORD`: Redis database password (optional);
 * `DEBUSCA_REDISURL`:  an `redis://host:port` URL (optional, assumes `redis://localhost:6379`).

Redis keys:
 * `vocabulary`: words (string separated by spaces, not a [set]) that are checked agaisnt when searching;
 * `errors`: the *Levenshtein distance* tolerance of the search algorithm (the higher the more tolerant it is).

[set]: http://redis.io/topics/data-types#sets
