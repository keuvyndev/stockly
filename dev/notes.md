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

## NewHooks

- usePathName: Permite obter a url atual.

### Dependências

- npx shadcn@2.0.6 init (Default/Slate)
  - npx shadcn@2.0.6 add button
