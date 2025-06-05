# Site API - Documentação dos Endpoints

Uma API desenvolvida em NestJS para gerenciar posts, projetos, atividades, parceiros, histórico e contatos de um site.

## 🚀 Configuração

### Pré-requisitos
- Node.js
- PostgreSQL
- npm ou yarn

### Instalação
```bash
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

### Executar
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 Endpoints da API

### 🏠 Geral

#### GET /
**Descrição:** Endpoint de boas-vindas  
**Resposta:** Mensagem de hello

```bash
curl -X GET http://localhost:3000/
```

---

## 📞 Contatos (`/contacts`)

### POST /contacts
**Descrição:** Criar um novo contato  

**Corpo da requisição:**
```json
{
  "name": "João Silva",
  "phone": "(11) 99999-9999",
  "subject": "Dúvida sobre serviços",
  "message": "Gostaria de saber mais sobre os serviços oferecidos."
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "phone": "(11) 99999-9999",
    "subject": "Dúvida sobre serviços",
    "message": "Gostaria de saber mais sobre os serviços oferecidos."
  }'
```

### GET /contacts
**Descrição:** Listar todos os contatos  

```bash
curl -X GET http://localhost:3000/contacts
```

### GET /contacts/:id
**Descrição:** Buscar contato por ID  

```bash
curl -X GET http://localhost:3000/contacts/uuid-do-contato
```

### DELETE /contacts/:id
**Descrição:** Deletar contato por ID  

```bash
curl -X DELETE http://localhost:3000/contacts/uuid-do-contato
```

---

## 📝 Posts (`/posts`)

### POST /posts
**Descrição:** Criar um novo post com upload de imagem  

**Corpo da requisição (multipart/form-data):**
- `title`: Título do post
- `slug`: Slug único do post
- `excerpt`: Resumo do post
- `content`: Conteúdo completo
- `author`: Nome do autor
- `authorImage` (opcional): URL da imagem do autor
- `category`: Categoria do post
- `tags`: Array de tags (formato JSON string)
- `image`: Arquivo de imagem

**Exemplo:**
```bash
curl -X POST http://localhost:3000/posts \
  -F "title=Meu Primeiro Post" \
  -F "slug=meu-primeiro-post" \
  -F "excerpt=Este é um resumo do post" \
  -F "content=Conteúdo completo do post aqui..." \
  -F "author=João Silva" \
  -F "category=Tecnologia" \
  -F 'tags=["javascript", "nestjs"]' \
  -F "image=@caminho/para/imagem.jpg"
```

### GET /posts
**Descrição:** Listar posts com paginação e filtros  

**Query parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `category` (opcional): Filtrar por categoria

```bash
# Listar todos os posts
curl -X GET http://localhost:3000/posts

# Com paginação
curl -X GET "http://localhost:3000/posts?page=2&limit=5"

# Filtrar por categoria
curl -X GET "http://localhost:3000/posts?category=Tecnologia"
```

### GET /posts/:id
**Descrição:** Buscar post por ID  

```bash
curl -X GET http://localhost:3000/posts/uuid-do-post
```

### GET /posts/slug/:slug
**Descrição:** Buscar post por slug  

```bash
curl -X GET http://localhost:3000/posts/slug/meu-primeiro-post
```

### PATCH /posts/:id
**Descrição:** Atualizar post  

```bash
curl -X PATCH http://localhost:3000/posts/uuid-do-post \
  -F "title=Título Atualizado" \
  -F "content=Novo conteúdo..."
```

### DELETE /posts/:id
**Descrição:** Deletar post  

```bash
curl -X DELETE http://localhost:3000/posts/uuid-do-post
```

---

## 🚀 Projetos (`/projects`)

### POST /projects
**Descrição:** Criar um novo projeto com upload de imagem  

**Corpo da requisição (multipart/form-data):**
- Campos do projeto (ver DTO)
- `image`: Arquivo de imagem

```bash
curl -X POST http://localhost:3000/projects \
  -F "name=Projeto Exemplo" \
  -F "description=Descrição do projeto" \
  -F "image=@caminho/para/imagem.jpg"
```

### GET /projects
**Descrição:** Listar todos os projetos  

```bash
curl -X GET http://localhost:3000/projects
```

### GET /projects/:id
**Descrição:** Buscar projeto por ID  

```bash
curl -X GET http://localhost:3000/projects/uuid-do-projeto
```

### PATCH /projects/:id
**Descrição:** Atualizar projeto  

```bash
curl -X PATCH http://localhost:3000/projects/uuid-do-projeto \
  -F "name=Nome Atualizado"
```

### DELETE /projects/:id
**Descrição:** Deletar projeto  

```bash
curl -X DELETE http://localhost:3000/projects/uuid-do-projeto
```

---

## 🎯 Atividades (`/activities`)

### POST /activities
**Descrição:** Criar uma nova atividade com upload de imagem  

```bash
curl -X POST http://localhost:3000/activities \
  -F "title=Nova Atividade" \
  -F "description=Descrição da atividade" \
  -F "image=@caminho/para/imagem.jpg"
```

### GET /activities
**Descrição:** Listar todas as atividades  

```bash
curl -X GET http://localhost:3000/activities
```

### GET /activities/:id
**Descrição:** Buscar atividade por ID  

```bash
curl -X GET http://localhost:3000/activities/uuid-da-atividade
```

### PATCH /activities/:id
**Descrição:** Atualizar atividade  

```bash
curl -X PATCH http://localhost:3000/activities/uuid-da-atividade \
  -F "title=Título Atualizado"
```

### DELETE /activities/:id
**Descrição:** Deletar atividade  

```bash
curl -X DELETE http://localhost:3000/activities/uuid-da-atividade
```

---

## 🤝 Parceiros (`/partners`)

### POST /partners
**Descrição:** Criar um novo parceiro com upload de logo  

```bash
curl -X POST http://localhost:3000/partners \
  -F "name=Empresa Parceira" \
  -F "description=Descrição da empresa" \
  -F "logo=@caminho/para/logo.jpg"
```

### GET /partners
**Descrição:** Listar todos os parceiros  

```bash
curl -X GET http://localhost:3000/partners
```

### GET /partners/:id
**Descrição:** Buscar parceiro por ID  

```bash
curl -X GET http://localhost:3000/partners/uuid-do-parceiro
```

### PATCH /partners/:id
**Descrição:** Atualizar parceiro  

```bash
curl -X PATCH http://localhost:3000/partners/uuid-do-parceiro \
  -F "name=Nome Atualizado"
```

### DELETE /partners/:id
**Descrição:** Deletar parceiro  

```bash
curl -X DELETE http://localhost:3000/partners/uuid-do-parceiro
```

---

## 📖 Histórico (`/history`)

### POST /history
**Descrição:** Criar um novo item de histórico  

```bash
curl -X POST http://localhost:3000/history \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Marco importante",
    "description": "Descrição do evento histórico",
    "date": "2024-01-01"
  }'
```

### GET /history
**Descrição:** Listar todo o histórico  

```bash
curl -X GET http://localhost:3000/history
```

### GET /history/:id
**Descrição:** Buscar item do histórico por ID  

```bash
curl -X GET http://localhost:3000/history/uuid-do-historico
```

### PATCH /history/:id
**Descrição:** Atualizar item do histórico  

```bash
curl -X PATCH http://localhost:3000/history/uuid-do-historico \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado"
  }'
```

### DELETE /history/:id
**Descrição:** Deletar item do histórico  

```bash
curl -X DELETE http://localhost:3000/history/uuid-do-historico
```

---

## 🔧 Códigos de Status HTTP

- `200` - OK: Operação realizada com sucesso
- `201` - Created: Recurso criado com sucesso
- `400` - Bad Request: Dados inválidos na requisição
- `404` - Not Found: Recurso não encontrado
- `500` - Internal Server Error: Erro interno do servidor

## 📝 Notas Importantes

1. **UUIDs**: Todos os IDs são UUIDs v4
2. **Upload de Arquivos**: Endpoints com upload usam `multipart/form-data`
3. **Validação**: Todos os endpoints validam os dados de entrada
4. **Paginação**: Posts suportam paginação via query parameters
5. **CORS**: Configurado através da variável de ambiente `CORS_ORIGIN`. Por padrão aceita requisições de `http://localhost:3000`. Para produção, configure com a URL do seu frontend (ex: `https://meusite.com`)

## 🔍 Testando a API

### Com Postman
Importe a collection Postman usando os exemplos cURL acima.

### Com Insomnia
Use os exemplos cURL fornecidos para criar requests no Insomnia.

### Com JavaScript/Fetch
```javascript
// Exemplo: Listar posts
fetch('http://localhost:3000/posts')
  .then(response => response.json())
  .then(data => console.log(data));

// Exemplo: Criar contato
fetch('http://localhost:3000/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'João Silva',
    phone: '(11) 99999-9999',
    subject: 'Teste',
    message: 'Mensagem de teste'
  })
});
```

---

**Desenvolvido com NestJS + TypeORM + PostgreSQL**
