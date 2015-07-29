<p align="center">
  <a href="#de-busca">
    <img alt="logo" src="asset/logo/160x175.png">
  </a>
</p>

# de busca

[![][build-img]][build]
[![][coverage-img]][coverage]

Máquina de busca brasileira que indexa (escreve) e busca (lê) texto em um banco de dados [redis].

[build]:     https://travis-ci.org/codigonosso/de-busca
[build-img]: https://travis-ci.org/codigonosso/de-busca.png

[coverage]:     https://coveralls.io/r/codigonosso/de-busca?branch=master
[coverage-img]: https://coveralls.io/repos/codigonosso/de-busca/badge.png?branch=master

[Redis]: http://redis.io

## Como funciona

Ao indexar, o cliente provê um `id` e um `texto`.
Ao busca, o cliente provê um `texto` e recebe uma coleção de `ids` encontrados.

Higieniza o texto (ao indexar e buscar) removendo [stop words], [normalizando] e traduzindo números inteiros para
[por extenso]. 

Para buscar, utiliza o [algoritmo de Baeza] e de [Wagner–Fischer].

[stop words]:     https://github.com/tallesl/brazilian-stop-words
[normalizando]:   https://github.com/tallesl/normalization
[por extenso]:    https://github.com/tallesl/por-extenso
[Baeza's bitap]:  https://github.com/tallesl/bitap
[Wagner–Fischer]: https://github.com/tallesl/wagner-fischer

## Utilização

Você pode tanto `npm install de-busca -g`, clonar este repositório e executar `bin/de-busca.js` ou fazer deploy no
Herokuk:

[![][heroku-img]][heroku]

Aqui vai a API (http):

* `PUT /index/{id}`, o texto vai no corpo da requisição (`text/plain`);
 * Retorna [201] se indexado com sucesso;
 * Retorna [204] se (depois de higienizar) não há texto a ser indexado.
* `DELETE /index/{id}`;
 * Retorna [200] se deletado com sucesso; 
* `GET /search/{text}`;
 * Retorna [200] e os `ids` encontrados no corpo da requisição (`application/json`).

Todas operações retornam [401] se a [autenticação] fornecida não casa com a configuração `DEBUSCA_AUTH`..

[200]: https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#200_OK
[201]: https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#201_Criado
[204]: https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#204_Nenhum_conte.C3.BAdo
[401]: https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#401_N.C3.A3o_autorizado

[heroku]:     https://heroku.com/deploy
[heroku-img]: https://www.herokucdn.com/deploy/button.png

[autenticação]: https://en.wikipedia.org/wiki/Basic_access_authentication

## Configuração

Variáveis de ambiente:
 * `DEBUSCA_AUTH`: credencias no formato `user:password`;
 * `DEBUSCA_REDISPASSWORD`: senha do Redis (opcional);
 * `DEBUSCA_REDISURL`:  uma URL no formato `redis://host:porta` (opcional, assume `redis://localhost:6379`).

Chaves no Redis:
 * `vocabulary`: palavras (separadas por espaço, não é um [set]) que são casadas na busca;
 * `errors`: a distância *Levenshtein* tolerada pelo algoritmo de busca (quanto maior mais tolerante).

[set]: http://redis.io/topics/data-types#sets
