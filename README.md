# Middle Earth app

Api do desafio proposto pela PlayerUm. O projeto conta com CRUD de lugares famosos da Terra Média. Usuários podem votar nos 
melhores lugares para se viver. Usuários cadastrados e autenticados podem gerenciar lugares, criando, editando e deletando os mesmos.

Repositório para o front-end https://github.com/filipezz/middle-earth-front

## :information_source: Requisitos

- MySQL
- Node

## Variáveis de ambiente

Crie um arquivo ```.env```, seguindo o template do arquivo ```.env.example``` desse modo

![Sem título](https://user-images.githubusercontent.com/52511902/82506056-2fddd480-9ad5-11ea-8b43-c956f9a2134f.png)

***PS: O nome do banco de dados precisa ser "middle_bnb"***


### Rodando localmente

```bash

# Instale as dependências
$ npm install

# Criando as tabelas do projeto
$ npm run createTables

# Rodando em http://localhost:3333
$ npm run dev
```
### Outros comandos

```bash

# Excluindo banco de dados
$ npm run dropSchema

# Resetando banco de dados
$ npm run resetDatabase

```
## Rotas

Caso opte por usar a aplicação via postman ou insomnia

### Registro de usuário


Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
POST | /users | - | `{ name, email, password }` | 

### Sessões


Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
POST | /sessions | - | `{ email, password }` | A API irá te responder com o seu usuário e um token jwt. Esse token precisa ser enviado nas rotas que precisam de autenticação.


### CRUD Lugares

* Rota apenas para Administradores. <strong>Requer autenticação</strong>

Exemplo de header para autenticação:

```authorization: Bearer {{token}}```

Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
GET | /places | - | - | Resgata todos os lugares registrado pelo usuário logado
POST | /places | - | `{ name, image_id }` | Rota de cadastro de um novo lugar
PUT | /places/:id | place_id | `{ name, image_id }` | Rota para editar um lugar
DELETE | /places/:id | places_id | - | Rota para deletar um lugar

### Likes

Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
PUT | /places/:id/like | places_id | - | Rota que adiciona likes ao lugar referenciado


### Imagens

Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
POST | /files | - | `Multipart form: File` | Rota de upload de imagens para serem referenciadas na criação/edição de Lugares

### Lugares

Método | URI | Parâmetros | Body | Descrição
-------|-----|-----------|------|-----------
POST | /browse | - | - | Rota que busca todos os lugares cadastrados. Não é necessária autenticação
