# 🛒 E-commerce API - Pedidos, Pagamentos e Reembolso

API desenvolvida em Node.js com fluxo completo de pedidos:

* 🧾 Criação de pedidos
* 🛍️ Checkout
* 💳 Pagamento
* ❌ Cancelamento
* 💰 Reembolso
* 🔐 Autenticação via JWT
* 📄 Documentação com Swagger
* 🧪 Testes automatizados (Cypress + Contract Test)

---

# 🚀 Tecnologias utilizadas

* Node.js + Express
* JWT (autenticação)
* Swagger (OpenAPI 3.0)
* Cypress (testes E2E/API)

---

<img width="680" height="622" alt="image" src="https://github.com/user-attachments/assets/90979258-e386-4da1-9a31-be627a58c37e" />


# 📁 Estrutura do Projeto

```
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── db/
 ├── config/
 ├── middleware/
 ├── app.js

cypress/
tests/
```



---

# ⚙️ Instalação

```bash
npm install
```

---

# ▶️ Rodando a aplicação

```bash
node server.js
```

API disponível em:

```
http://localhost:3000
```

---

# 📄 Swagger (Documentação da API)

Acesse:

```
http://localhost:3000/docs
```

---

# 🔐 Autenticação

### Endpoint:

```
POST /auth/login
```

### Body:

```json
{
  "username": "admin",
  "password": "123"
}
```

### Resposta:

```json
{
  "token": "JWT_TOKEN"
}
```

Use o token:

```
Authorization: Bearer {token}
```

---

# 🛒 Fluxo de Pedido

## 1. Criar pedido

```
POST /orders
```

## 2. Checkout

```
POST /orders/checkout/{id}
```

## 3. Pagamento

```
POST /orders/payments/{id}
```

## 4. Cancelamento

```
POST /orders/{id}/cancel
```

## 5. Reembolso

```
POST /refunds/{id}
```

---

# 🔄 Estados do Pedido

```
CREATED → CHECKOUT → PAID → CANCELLED → REFUNDED
```

---

# 🧪 Testes Automatizados

## Cypress (E2E / API)

Rodar:

```bash
npx cypress open
```

Testa:

* Login
* Criação de pedido
* Checkout
* Pagamento
* Cancelamento

---

# ⚠️ Problemas comuns resolvidos

### ❌ Swagger não gera endpoints

✔ Corrigido com:

```javascript
apis: [path.join(__dirname, "../routes/*.js")]
```

---

### ❌ Cannot convert undefined or null to object

✔ Causa:

* Swagger não gerou `responses`

✔ Solução:

* Garantir `responses` em todos endpoints

---

### ❌ Pedido inválido / fluxo quebrado

✔ Corrigido com:

```javascript
getOrderById(parseInt(req.params.id))
```

---

# 🧠 Boas práticas aplicadas

* Separação de camadas (Controller / Service / DB)
* Uso de middleware de autenticação
* Contract testing baseado em OpenAPI
* Testes automatizados desacoplados
* Documentação viva (Swagger)

---

# 🚀 Próximos passos (evolução)

* 🔄 Integração com banco real (MongoDB / PostgreSQL)
* 🧪 Testes com CI/CD (GitHub Actions)
* 📊 Testes de performance (k6)
* 🧠 Validação de schema com Zod
* 🔐 Refresh Token / OAuth2

---

# 👨‍💻 Autor

Projeto criado por Antonio G. Martins para desenvolvimento do portfolio pessoal no curso do Julio de Lima

Foram desenvolvidos:
* Api de um E-commerce
* Automação de Testes com a cobertura de Contract Testing

---

# ⭐ Se esse projeto te ajudou

Deixe uma estrela no repositório 🚀
