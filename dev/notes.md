# Orientações de Desenvolvimento

- **Layout.tsx:** Pode-se colocar qualquer coisa que deva aparecer em todas as páginas.
  - Obs: É possível criar um layout para uma página apenas também com a utilização de CHILDREN.
- **page.tsx**: É a página principal da aplicação.

### Configurações Inicias

- Inicialmente altera-se o globa.css para obter 100% da altura no body. Bem como aplicar o bg da aplicação.
- Aplicação da font do Google (Inter) em toda aplicação alterando o layout.tsx
- Instalação do plugin prettier-tailwind-css para ordenar as classes: [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).
  - **Obs:** Foi necessário fazer uma configuração adicional no settings.json
- Instalação de shacen/ui
- Alterado components.json para mudar o aliases, caminho da pasta components e outras:
  "aliases": {
  "components": "@/app/\_components",
  "utils": "@/app/\_lib/utils",
  "ui": "@/app/\_components/ui",
  "lib": "@/app/\_lib",
  "hooks": "@/app/\_hooks"
  }
- Movida a pasta lib para app.

### Fonts customizadas

- Guia de instalação da Inter Font: [inter-font-guide](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts).

## News Next.js

- usePathName: Permite obter a url atual.
- Router Handler: Permite fazer requisições utilizando a rota. [Acesse a documentação aqui.](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- Criar rotas HTTP, só faz sentido quando:
  1. Quando está trabalhando com algum Webhook (Exemplo: Integrando com Stripe, que precisa chamar uma rota da sua aplicação após o pagamento ser realizado com sucesso ou com falha)
  2. Quando você tem outra aplicação (Exemplo: Exportar dados da sua aplicação para um app mobile)
     Obs: As rotas não podem ter o retorno tipado, por isso a preferencia é sempre usar Server Components para tal.

## Tips

- Fix problema Decimal with prisma: JSON.parse(JSON.stringify(variabel))

### Dependências

- npx shadcn@2.0.6 init (Default/Slate)
  - npx shadcn@2.0.6 add button
    - npx shadcn@2.0.6 add table
    - npm install @tanstack/react-table
  - npx shadcn@2.0.6 add badge
- server-only (Resolve o problema de server actions não serem executadas em clienct components)

  - npm install server-only@0.0.1

- ## Docker
- ## Postgres
- Prisma & ORMS
  - npm install prisma
  - npx prisma init
  - Criação do banco de dados (Cloud ou Docker)
  - Criação do schema
  - npx prisma format
  - npx prisma migrate dev --name init
  - npx prisma studio
  - npx prisma db push (Caso suba um container no docker, migrará os dados)
  - npx prisma generate
