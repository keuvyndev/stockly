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
- Uso de fetch no Next.js podem ser realizadas com Static, ISR ou SSR (Só funciona em Server Componente). tal como:
  - Exemplo de fetch com SSR:
    const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    cache: "no-cache", // Define se será SSR ou STATIC
    });
  - Exemplo de ISR com fetch:
    const responseWithISR = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    next: {
    revalidate: 5,
    },
    });
  - Exemplo de ISR duplo com fetch:
    const responseWithISR = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    next: {
    revalidate: 5,
    },
    });
    const responseWithISR2 = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    next: {
    revalidate: 10,
    },
    });
    Obs: Não é possível usar STATIC e ISR ao mesmo tempo no mesmo componente.
- OBS: Se usar fetch com static, para buildar a aplicação é necessário que o ambiente de desenvolvimento esteja rodando!
- OBS2: Por padrão ra :
  const nextConfig = {
  logging: {
  fetches: {
  fullUrl: true,
  },
  },
  };
  Isto permite que ele mostre as requisições mais detalhadas no terminal.
- Request Memoization: é um ro next renderizará as páginas em desenvolvimento como SSR, já em produção como STATIC.
- É possível alterar o "next.config" paecurso que otimiza requisições em aplicações, especialmente quando se está utilizando Server Components. A ideia principal é evitar chamadas duplicadas para a mesma URL e com os mesmos parâmetros.
- Function memoization: é uma técnica que permite armazenar os resultados de chamadas de funções para que, quando a mesma função for chamada novamente com os mesmos parâmetros, o resultado já armazenado possa ser retornado, em vez de recalcular o resultado. Isso melhora a eficiência e reduz o tempo de execução, especialmente em funções que realizam operações pesadas ou chamadas a bancos de dados.
- "cache({function})": Permite memorizar o resultado de qualquer função, seu uso é muito comum em banco de dados.
- A idéia é usar sempre que possível Server Components, e a partir deles usar Client Components
- Tanto no método de Data Caching ou de Route Handler (Fetch), é possível configurar a consulta para ser realizada com ISR, ou SSR (Cache/no-cache)
- SSR force na página: É possível forçar o uso de SSR usando o comando abaixo desde que seja página (pagina.tsx). Basta inserir o comando abaixo:
  - export const dynamic = "force-dynamic"; // Força o comportamento SSR no Database Caching
- unstable_cache: Permite usar o modelo ISR com consultas Database Caching
- OBS: Se usar "cookies()" ou "headers()" a pagina é definida automaticamente como SSR.
- ISR na página: É possível usar desde que seja uma página (page.tsx) e seja STATIC. Basta inserir o comando abaixo:
  - export const revalidate = 10
- Server Actions: São funções assíncronas que são executadas no servidor. Podem ser chamados em client e server components para lhe dar com envio de formulários e mutação de dados.
  - As rotinas devem ser colocadas dentro de "\_actions"
- Data Transactions & ACID: Garante segurança e confiabilidade nas transações sensíveis com o banco de dados.
- Composition Pattern: Aprendi a modularizar meus componentes seguinto o modelo de composition pattern.
- Uso de Suspense e Stream para otimização de busca de dados.

## Tips

- Fix problema Decimal with prisma: JSON.parse(JSON.stringify(variabel))

### Dependências

- npx shadcn@2.0.6 init (Default/Slate)

  - npx shadcn@2.0.6 add button
    - npx shadcn@2.0.6 add table
    - npm install @tanstack/react-table
  - npx shadcn@2.0.6 add dialog
  - npx shadcn@2.0.6 add badge
  - npx shadcn@2.0.6 add input
  - npx shadcn@2.0.6 add form
  - npx shadcn@2.0.6 add dropdown-menu
  - npx shadcn@2.0.6 add alert-dialog
  - npx shadcn@2.0.6 add sonner
  - npx shadcn@2.0.6 add sheet
  - npx shadcn@2.0.6 add command popover
  - npx shadcn@2.0.6 add chart
  - npx shadcn@2.0.6 add skeleton
  - npm install react-number-format@5.4.2
  - npm install next-safe-action@7.9.3
  - npx sst@3.1.49 (To uplobad to AWS)
    - npm install sst (CLI)
    - Para Windows (1º Opção):
      - npm install sst-win32-x64@3.1.49 --save-dev
      - npm install sst@3.1.49 --save-dev
      - npx sst init
    - Para Windows (2º Opção):
      - No cmd (Instala o wsl com ubuntu): wsl --install
      - No terminal wsl (Instala o Node.js): sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      - No terminal wsl: source ~/.bashrc
      - No terminal wsl: nvm install 18
      - No terminal wsl: nvm use 18
      - No terminal wsl: npx sst@3.1.49 init
      - No terminal wsl: npm install

- server-only (Resolve o problema de server actions não serem executadas em clienct components)

  - npm install server-only@0.0.1

- npm i dayjs@1.11.3 (Usado para formatar datas, mais leve que date-fns)

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
