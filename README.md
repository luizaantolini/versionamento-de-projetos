Versionamento de projetos
# API com três exercícios

Projeto Express criado em TypeScript, com validação de dados e respostas em JSON.

## POST /mensagem

Recebe `nome`, `idade` e `timeFavorito` no body:

```json
{
  "nome": "Carlos",
  "idade": 18,
  "timeFavorito": "Real Madrid"
}
```

Resposta:

```json
{
  "mensagem": "Olá, Carlos! Você tem 18 anos e torce para o Real Madrid!"
}
```

Também aceita `time_favorito` ou `time` como nome do campo do time.

## POST /soma

Recebe três números no body. Os exemplos seguintes são equivalentes:

```json
{
  "numero1": 10,
  "numero2": 20,
  "numero3": 30
}
```

Também são aceitos os nomes `n1`, `n2`, `n3` ou `a`, `b`, `c`.

Resposta:

```json
{
  "resultado": 60
}
```

Quando algum campo não é numérico, a API informa quais campos estão inválidos e retorna status `400`.

## POST /login

Dados de acesso definidos no exercício:

```json
{
  "usuario": "admin",
  "senha": "1234"
}
```

Login correto retorna status `200`. Usuário ou senha incorretos retornam status `401` em JSON.

## Erros

- `400`: dados ausentes, inválidos ou JSON malformado.
- `401`: usuário ou senha incorretos.
- `404`: rota não encontrada.
- `500`: erro interno do servidor.