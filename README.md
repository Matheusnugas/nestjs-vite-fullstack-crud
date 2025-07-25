# 🚀 Taskify - Sistema de Gerenciamento de Tarefas

Uma aplicação completa para gerenciamento de tarefas desenvolvida com **NestJS** (backend), **React** (frontend), **PostgreSQL** e **Docker**.

## 🎯 Funcionalidades

### ✅ Autenticação
- **Registro de usuário** com validação
- **Login** com JWT
- **Proteção de rotas** autenticadas
- **Logout** seguro

### ✅ Gerenciamento de Tarefas (CRUD Completo)
- **Criar** novas tarefas (título e descrição obrigatórios)
- **Listar** todas as tarefas do usuário
- **Editar** título e descrição das tarefas
- **Marcar como concluída/pendente**
- **Excluir** tarefas com confirmação
- **Filtrar** por status (Todas, Pendentes, Concluídas)

### ✅ Interface Responsiva
- Design moderno com **Tailwind CSS**
- Animações suaves com **Framer Motion**
- Modais interativos
- Feedback visual com toasts

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticação
- **class-validator** - Validação de dados
- **Swagger** - Documentação da API

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **TanStack Query** - Gerenciamento de estado
- **React Router DOM** - Navegação
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Axios** - Cliente HTTP

### Testes
- **Cypress** - Testes E2E completos

### Infraestrutura
- **Docker** - Containerização
- **PostgreSQL** - Banco de dados
- **Docker Compose** - Orquestração

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd taskify
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
POSTGRES_USER=taskify_user
POSTGRES_PASSWORD=taskify_password
POSTGRES_DB=taskify_db
JWT_SECRET=sua_chave_jwt_super_secreta
```

### 3. Execute com Docker Compose
```bash
# Desenvolvimento
npm run dev:docker

# Ou diretamente com Docker Compose
docker-compose --env-file .env up --build
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

## 🧪 Testes E2E

### Executar todos os testes
```bash
cd apps/frontend
npx cypress run
```

### Executar testes específicos
```bash
# Testes de autenticação
npx cypress run --spec "cypress/e2e/login.cy.ts"
npx cypress run --spec "cypress/e2e/register.cy.ts"

# Testes de tarefas
npx cypress run --spec "cypress/e2e/tasks.cy.ts"
```

### Abrir Cypress em modo interativo
```bash
npx cypress open
```

## 📋 Cenários de Teste Cobertos

### ✅ Autenticação
- [x] Registro de usuário com sucesso
- [x] Login com credenciais válidas
- [x] Logout com confirmação
- [x] Verificação de estado de autenticação

### ✅ Gerenciamento de Tarefas
- [x] Criação de tarefas (título e descrição obrigatórios)
- [x] Validação de formulários (campos obrigatórios)
- [x] Marcar tarefa como concluída
- [x] Marcar tarefa como pendente
- [x] Edição de tarefas existentes
- [x] Exclusão de tarefas com confirmação
- [x] Filtro por status (Todas, Pendentes, Concluídas)
- [x] Estado vazio quando não há tarefas

### ✅ Casos Extremos
- [x] Caracteres especiais em títulos e descrições
- [x] Textos longos
- [x] Cancelamento de criação/edição
- [x] Validações de formulário

## 🏗️ Estrutura do Projeto

```
taskify/
├── apps/
│   ├── backend/                 # API NestJS
│   │   ├── src/
│   │   │   ├── auth/           # Autenticação
│   │   │   ├── tasks/          # CRUD de tarefas
│   │   │   ├── users/          # Gerenciamento de usuários
│   │   │   └── common/         # Utilitários compartilhados
│   │   └── prisma/             # Schema e migrações
│   └── frontend/               # Aplicação React
│       ├── src/
│       │   ├── components/     # Componentes reutilizáveis
│       │   ├── pages/          # Páginas da aplicação
│       │   ├── hooks/          # Hooks customizados
│       │   ├── context/        # Contexto de autenticação
│       │   └── api/            # Cliente HTTP
│       └── cypress/            # Testes E2E
├── packages/                   # Pacotes compartilhados
└── docker-compose.yml         # Orquestração Docker
```

## 🔧 Desenvolvimento Local

### Backend
```bash
cd apps/backend
npm install
npm run start:dev
```

### Frontend
```bash
cd apps/frontend
npm install
npm run dev
```

### Banco de Dados
```bash
cd apps/backend
npx prisma migrate dev
npx prisma generate
```

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login

### Tarefas (Autenticado)
- `GET /tasks` - Listar tarefas
- `POST /tasks` - Criar tarefa
- `PATCH /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Excluir tarefa

### Usuários (Autenticado)
- `GET /users/me` - Obter dados do usuário
- `PATCH /users/me` - Atualizar dados do usuário
- `DELETE /users/me` - Excluir conta

## 🎨 Interface

- **Design responsivo** que funciona em desktop e mobile
- **Animações suaves** para melhor experiência do usuário
- **Feedback visual** com toasts para todas as ações
- **Modais interativos** para confirmações
- **Filtros intuitivos** para organização das tarefas

## 🔒 Segurança

- **Autenticação JWT** com expiração
- **Proteção de rotas** no frontend e backend
- **Validação de dados** em todas as entradas
- **Políticas de acesso** para recursos
- **Hash de senhas** com bcrypt

## 📊 Status dos Testes

- **✅ 18 testes E2E** executando com sucesso
- **✅ Cobertura completa** dos fluxos principais
- **✅ Testes de validação** implementados
- **✅ Testes de casos extremos** incluídos

## 🚀 Deploy

O projeto está configurado para deploy com Docker:

```bash
# Build de produção
docker-compose -f docker-compose.prod.yml up --build
```

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

---

**Desenvolvido com ❤️ usando NestJS, React, TypeScript e Docker**
