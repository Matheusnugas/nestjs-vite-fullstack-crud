# 🚀 Taskify - Sistema de Gerenciamento de Tarefas

Uma aplicação completa de gerenciamento de tarefas construída com **NestJS** (backend), **React** (frontend), **PostgreSQL** e **Docker**, usando **Turborepo** para gerenciamento de monorepo e **Vite** para ferramentas de build do frontend.

## ⚠️ Aviso Legal

**Este projeto NÃO está pronto para produção e é destinado apenas para fins de desenvolvimento/teste.** Foi desenvolvido como parte de um desafio técnico e não deve ser usado em ambientes de produção sem revisões de segurança adequadas, configurações de ambiente e hardening adicional.

## 🎯 Funcionalidades

### ✅ Autenticação
- **Registro de usuário** com validação
- **Login** com JWT
- **Rotas protegidas** com autenticação
- **Logout seguro**

### ✅ Gerenciamento de Tarefas (CRUD Completo)
- **Criar** novas tarefas (título e descrição obrigatórios)
- **Listar** todas as tarefas do usuário
- **Editar** título e descrição da tarefa
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
- **[NestJS](https://nestjs.com/)** - Framework Node.js
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Prisma](https://www.prisma.io/)** - ORM PostgreSQL
- **[JWT](https://jwt.io/)** - Autenticação
- **[class-validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Swagger](https://swagger.io/)** - Documentação da API

### Frontend
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[Vite](https://vitejs.dev/)** - Ferramenta de build e servidor de desenvolvimento
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[TanStack Query](https://tanstack.com/query/latest)** - Gerenciamento de estado
- **[React Router DOM](https://reactrouter.com/)** - Navegação
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Axios](https://axios-http.com/)** - Cliente HTTP

### Testes
- **[Cypress](https://www.cypress.io/)** - Testes E2E completos

### Infraestrutura
- **[Docker](https://www.docker.com/)** - Containerização
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração

### Gerenciamento de Monorepo
- **[Turborepo](https://turbo.build/repo)** - Sistema de build de monorepo

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### 1. Clone o repositório
```bash
git clone <url-do-repositório>
cd taskify
```

### 2. Configure as variáveis de ambiente

#### Raiz do projeto (para Docker Compose)
Renomeie `env.example` para `.env` no diretório raiz:
```bash
cp env.example .env
```

#### Backend
Renomeie `apps/backend/.env.example` para `apps/backend/.env`:
```bash
cd apps/backend
cp .env.example .env
```

> **Nota**: O backend possui dois arquivos de ambiente:
> - `.env.dev` - Usado para configuração de desenvolvimento com Docker Compose
> - `.env` - Usado para desenvolvimento local e testes E2E que rodam apenas na máquina host

#### Frontend
Renomeie `apps/frontend/.env.example` para `apps/frontend/.env`:
```bash
cd apps/frontend
cp .env.example .env
```

### 3. Instale as dependências
```bash
# Certifique-se de estar no diretório raiz do projeto
cd taskify

# Instale todas as dependências (root, backend e frontend)
npm run install:all
```

### 4. Execute com Docker Compose
```bash
# Desenvolvimento
npm run dev:docker

# Ou diretamente com Docker Compose
docker-compose --env-file .env up --build
```

### 5. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api

## 🧪 Testes

### Testes E2E do Frontend (Cypress)

#### Execute todos os testes
```bash
# Do diretório frontend
cd apps/frontend
npx cypress run

# Ou da raiz do projeto
npm run cypress:open
```

#### Execute testes específicos
```bash
# Do diretório frontend
cd apps/frontend

# Testes de autenticação
npx cypress run --spec "cypress/e2e/login.cy.ts"
npx cypress run --spec "cypress/e2e/register.cy.ts"

# Testes de gerenciamento de tarefas
npx cypress run --spec "cypress/e2e/tasks.cy.ts"
```

#### Abra o Cypress no modo interativo
```bash
# Do diretório frontend
cd apps/frontend
npx cypress open

# Ou da raiz do projeto
npm run cypress:open
```

### Testes do Backend

#### Testes Unitários
```bash
cd apps/backend
npm run test
```

#### Testes E2E
```bash
cd apps/backend
npm run test:e2e
```

#### Cobertura de Testes
```bash
cd apps/backend
npm run test:cov
```

#### Execute Todos os Testes do Backend
```bash
cd apps/backend
npm run test:all
```

## 📋 Cenários de Teste Cobertos

### ✅ Autenticação
- [x] Registro de usuário com sucesso
- [x] Login com credenciais válidas
- [x] Logout com confirmação
- [x] Verificação do estado de autenticação

### ✅ Gerenciamento de Tarefas
- [x] Criação de tarefas (título e descrição obrigatórios)
- [x] Validação de formulário (campos obrigatórios)
- [x] Marcar tarefa como concluída
- [x] Marcar tarefa como pendente
- [x] Editar tarefas existentes
- [x] Excluir tarefas com confirmação
- [x] Filtrar por status (Todas, Pendentes, Concluídas)
- [x] Estado vazio quando não há tarefas

### ✅ Casos Extremos
- [x] Caracteres especiais em títulos e descrições
- [x] Textos longos
- [x] Cancelar criação/edição
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

## 📚 Endpoints da API

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
- **Filtros intuitivos** para organização de tarefas

## 🔒 Segurança

- **Autenticação JWT** com expiração
- **Proteção de rotas** no frontend e backend
- **Validação de dados** em todas as entradas
- **Políticas de acesso** para recursos
- **Hash de senha** com bcrypt

## 📊 Status dos Testes

### Frontend
- **✅ 18 testes E2E** executando com sucesso com Cypress
- **✅ Cobertura completa** dos fluxos principais
- **✅ Testes de validação** implementados
- **✅ Testes de casos extremos** incluídos

### Backend
- **✅ Testes unitários** para todos os serviços e controladores
- **✅ Testes E2E** para endpoints da API
- **✅ Relatórios de cobertura de testes** disponíveis
- **✅ Testes de autenticação e autorização**
- **✅ Testes de operações CRUD**

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

---

**Construído com ❤️ usando NestJS, React, Vite, TypeScript, Docker e Turborepo**

---

**2025, Matheus Luz Nugas**  
https://www.linkedin.com/in/matheusluznugas 