# PDVs
A API foi desenvolvida para:
* Cadastro de distribuidoras parceiras com sua localidade e suas áreas geográficas de atendimento;
* Obter dados da distribuidora por identificação de registro;
* Através das informações de logitude e latitude, encontrar a distribuidora parceira mas próxima dentro da sua área de atendimento.

## Para preparar ambiente ##
Necessário ter o Node.js instalado.

Instalar as dependências da aplicação com *yarn* ou *npm*. No diretório raiz da aplicação digitar:

```shell
$ yarn
```
ou

```shell
$ npm install
```

## Para executar os testes ##
Execute o comando no diretório raiz da aplicação para executar os testes:

```shell
$ yarn test
```
Para ambiente Windows
```shell
$ yarn test-win
```
ou

```shell
$ npm test
```
Para ambiente Windows
```shell
$ npm test-win
```

## Para executar a API ##
Execute o comando no diretório raiz da aplicação para executar a API:

```shell
$ yarn start
```
ou

```shell
$ npm start
```

Pode ser utilizado o *Docker*. Execute o comando no diretório raíz da aplicação:

```shell
$ docker build -t pdvs .

$ docker run --name api-pdvs -p 9000:9000 -d pdvs
```
## Endpoints ##

Exemplos:

* Cadastro PDV

POST: http://localhost:9000/v1/pdvs

```javascript
{
  "tradingName": "Adega da Cerveja - Aquarius",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
	"coverageArea": [
				[
          [
            [
              -45.90405464172363,
              -23.222180385790367
            ],
            [
              -45.903239250183105,
              -23.220050691871048
            ],
            [
              -45.9058141708374,
              -23.21768432546238
            ],
            [
              -45.91019153594971,
              -23.21902527157495
            ],
            [
              -45.91006278991699,
              -23.22107610429399
            ],
            [
              -45.90405464172363,
              -23.222180385790367
            ]
          ]
        ],
        [
          [
            [
              -45.9058141708374,
              -23.217211047149544
            ],
            [
              -45.90276718139648,
              -23.217763205018137
            ],
            [
              -45.90208053588867,
              -23.214331901283597
            ],
            [
              -45.906758308410645,
              -23.21377972923133
            ],
            [
              -45.9058141708374,
              -23.217211047149544
            ]
          ]
        ]
									],
		"address": [
          -45.906543731689446,
          -23.22107610429399
        ]
}
```

* Consulta PDV por id

GET: http://localhost:9000/v1/pdvs/e03b4330-4611-11ea-89e2-27c5fe1a76a1

* Busca PDV mais próximo por localidade dentro da área atendida (logitude e latitude)

GET: http://localhost:9000/v1/search?lng=-45.90641498565674&lat=-23.214134697241214
