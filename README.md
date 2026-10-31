# gabrielpecanha-dev

Portfólio da Landing Dollar, em inglês (`/en/`) e espanhol (`/es/`). Vite + React + TypeScript, sem variáveis de ambiente.

## Rodar localmente

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

## Publicação

O projeto está ligado à Vercel: cada push na `main` publica em produção. Configuração em `vercel.json` (Vite, build `npm run build`, saída `dist`, rotas `/en/` e `/es/`).

## Onde mudar o quê

- `src/data/content.ts`: todo o texto visível, os preços (EUA e Panamá), os projetos e os conceitos. Mudou o preço na tabela de preços da LD? Mude aqui também.
- `src/App.tsx`: estrutura da página.
- `src/styles.css`: visual.
- `public/assets`: foto, capturas dos projetos e imagens dos conceitos.
