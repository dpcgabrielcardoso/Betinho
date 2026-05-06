# Publicação no GitHub Pages

Este projeto foi ajustado para publicação gratuita no GitHub Pages.

## O que foi alterado

1. `vite.config.ts`
   - Adicionado `base: '/Betinho/'`, necessário porque o site será publicado em `https://dpcgabrielcardoso.github.io/Betinho/`.

2. `src/App.tsx`
   - Alterado de `BrowserRouter` para `HashRouter`, evitando erro 404 ao recarregar páginas internas no GitHub Pages.

3. `.github/workflows/deploy.yml`
   - Criado workflow automático para instalar dependências, gerar o build e publicar a pasta `dist` no GitHub Pages.

## Como publicar

1. Envie estes arquivos para o repositório `Betinho`.
2. No GitHub, acesse:

   `Settings > Pages > Build and deployment > Source`

3. Selecione:

   `GitHub Actions`

4. Depois acesse a aba `Actions` e aguarde o workflow ficar verde.

5. O site deverá ficar disponível em:

   `https://dpcgabrielcardoso.github.io/Betinho/`

## Atenção sobre chave Gemini/API

Não coloque uma chave real do Gemini diretamente no frontend público do GitHub Pages. Para uma apresentação visual, publique sem chave real. Para uma versão funcional com IA, use um backend/proxy para proteger a chave.
