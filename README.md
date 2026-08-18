# Ezy Entregas

Sistema de gestão de entregas com captura de etiquetas, organização de coletas, montagem de rotas e relatórios operacionais.

## 📋 Recentes Atualizações

- ✅ Rebranding completo: `pitico-entregas` → `ezy-entregas`
- ✅ Layout atualizado (dark mode aprimorado)
- ✅ Repositório Git inicializado
- ✅ Configuração Wrangler para Cloudflare Pages

## 🚀 Setup e Deployment

### 1. Criar Repositório no GitHub (5 min)

1. Acesse [github.com/new](https://github.com/new)
2. **Repository name:** `ezy-entregas`
3. **Description:** Sistema de gestão de entregas com captura de etiquetas
4. **Visibility:** Public (ou Private conforme necessário)
5. ❌ NÃO inicialize com README, .gitignore ou licença
6. Clique em **Create repository**

### 2. Fazer Push Inicial

```bash
cd "c:\Projetos\EZY ENTREGAS"

# Renomear branch padrão (opcional, mas recomendado)
git branch -M main

# Fazer push para GitHub
git push -u origin main
```

### 3. Conectar ao Cloudflare Pages

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecione **Workers & Pages** → **Pages**
3. Clique em **Create → Connect to Git**
4. Selecione sua conta GitHub e o repositório `ezy-entregas`
5. **Framework:** Nenhum (Static)
6. **Build command:** (deixar em branco)
7. **Build output directory:** `/` (raiz do projeto)
8. Clique em **Save and Deploy**

### 4. Configurar Domínio Customizado

Após o primeiro deploy ser concluído:

1. Vá para **Settings** do seu site no Cloudflare Pages
2. Adicione um domínio customizado (ex: `ezy-entregas.com`)
3. Ou use a URL padrão: `https://ezy-entregas.pages.dev`

## 🔄 Fluxo de Desenvolvimento

```bash
# Fazer alterações localmente
# ...editar arquivos...

# Commit
git add .
git commit -m "Descrição da mudança"

# Push para GitHub (deploya automaticamente)
git push origin main
```

## 📁 Estrutura do Projeto

```
ezy-entregas/
├── index.html                          # App principal
├── manual-atual-ezy-entregas.html      # Manual detalhado
├── estimativa-custos-5000-etiquetas.html
├── plano-seguranca-biometria-playstore.html
├── assets/                             # Logos e recursos
├── functions/                          # API functions (se usado)
├── wrangler.toml                       # Configuração Wrangler
├── .gitignore
└── README.md
```

## 🔑 Chaves de Storage (Atualizadas)

O localStorage e sessionStorage agora usam prefixo `ezy-` ao invés de `pitico-`:

- `ezy-entregas-v1` - Dados principais de entregas
- `ezy-label-profiles-v1` - Perfis de etiquetas
- `ezy-rota-ceps` - CEPs da rota
- `ezy-rota-itens` - Itens da rota
- `ezy-sidebar` - Estado do sidebar
- `ezy-rota-ordem` - Ordem dos CEPs
- `ezy-rota-sentido` - Sentido de proximidade

## ⚙️ Configuração Git

Usuário já configurado:
```
Name: EZY Entregas
Email: dev@ezy-entregas.com
Remote: https://github.com/pietrocostantino/ezy-entregas.git
```

## 📞 Próximos Passos

1. ✅ Criar repositório no GitHub
2. ✅ Fazer `git push -u origin main`
3. ✅ Conectar no Cloudflare Pages
4. ✅ Aguardar primeiro deploy (geralmente ~2 min)
5. ✅ Acessar em `https://ezy-entregas.pages.dev`

---

**Nota:** Todos os dados locais (etiquetas, rotas, etc.) serão preservados usando localStorage com as novas chaves `ezy-`.
