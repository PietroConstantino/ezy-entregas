# 📘 Guia Passo-a-Passo: Do Git ao Cloudflare Pages

## 🎯 Objetivo Final
Seu site `Ezy Entregas` atualizado estará em: **https://ezy-entregas.pages.dev**

---

## PASSO 1️⃣ Criar Repositório no GitHub

### Como fazer:

1. **Abra seu navegador** e acesse:
   ```
   https://github.com/new
   ```

2. **Você verá um formulário. Preencha assim:**

   ```
   Repository name:  ezy-entregas
   
   Description:      Sistema de gestão de entregas com captura de etiquetas
   
   Visibility:       ⭕ Public  
   ```

3. **Deixe DESMARCADO (muito importante):**
   - ❌ "Add a README file"
   - ❌ "Add .gitignore"
   - ❌ "Choose a license"

4. **Clique no botão verde:** "Create repository"

5. **Você verá uma página assim (após criar):**
   ```
   ...or push an existing repository from the command line
   
   git remote add origin https://github.com/pietroconstantino/ezy-entregas.git
   git branch -M main
   git push -u origin main
   ```

✅ **GitHub repo criado!**

---

## PASSO 2️⃣ Fazer o Push (Enviar código)

### Como fazer:

1. **Abra o PowerShell** (clique em `Terminal` no VS Code ou abra separado)

2. **Certifique-se que está na pasta certa:**
   ```powershell
   cd "c:\Projetos\EZY ENTREGAS"
   ```

3. **Execute estes comandos na sequência:**

   **Comando 1 - Renomear branch para "main":**
   ```powershell
   git branch -M main
   ```

   **Comando 2 - Fazer push (enviar) para GitHub:**
   ```powershell
   git push -u origin main
   ```

4. **Na primeira vez, pode pedir suas credenciais do GitHub:**
   - Se pedir usuário/senha: digite seu usuário GitHub e token (ou senha)
   - Ou será aberto um navegador para autenticar: apenas clique em "Autorizar"

5. **Resultado esperado:**
   ```
   Enumerating objects: 15, done.
   Counting objects: 100% (15/15), done.
   Delta compression using up to 8 threads
   ...
   * [new branch]      main -> main
   Branch 'main' set up to track remote branch 'main' from 'origin'.
   ```

✅ **Código enviado para GitHub!**

---

## PASSO 3️⃣ Conectar Cloudflare Pages (Deploy Automático)

### Como fazer:

1. **Acesse o Cloudflare:**
   ```
   https://dash.cloudflare.com
   ```
   (Faça login se necessário)

2. **Clique em "Workers & Pages"** (menu esquerdo)

3. **Clique em "Pages"** (no submenu)

4. **Clique no botão azul:** "Create" → "Connect to Git"

5. **Você verá:**
   ```
   Select a Git provider
   ☑️  GitHub
   ☐  GitLab
   ☐  Gitea
   ```
   → Clique em **GitHub**

6. **Autorize o Cloudflare no GitHub:**
   - Você será redirecionado para GitHub
   - Clique em "Authorize cloudflare"
   - Selecione o repositório `ezy-entregas`
   - Clique em "Install and Authorize"

7. **De volta no Cloudflare, configure:**

   ```
   Repository:          pietroconstantino/ezy-entregas
   Production branch:   main
   
   Build configuration:
     Framework preset:        ⭕ None (Static)
     Build command:           (deixar em branco)
     Build output directory:  /
   
   Environment variables:     (não precisa preenchert)
   ```

8. **Clique em "Save and Deploy"**

9. **Aguarde ~2 minutos** enquanto o Cloudflare:
   - Cria seu site
   - Faz o primeiro deploy
   - Ativa o domínio automático

✅ **Site publicado!**

---

## PASSO 4️⃣ Acessar Seu Site

Após o deploy (2-3 minutos), acesse:

```
https://ezy-entregas.pages.dev
```

### Verificar status do deploy:

1. Voltando ao Cloudflare Pages
2. Clique em **ezy-entregas** (seu projeto)
3. Você verá um card com:
   ```
   ✅ Last deployment: Success
   🌐 https://ezy-entregas.pages.dev
   ```

---

## PASSO 5️⃣ (Opcional) Adicionar Domínio Customizado

Se você tiver um domínio (ex: `meudominio.com`):

1. No Cloudflare Pages → seu projeto → **Settings**
2. Clique em "Custom domains"
3. Adicione seu domínio
4. Siga as instruções para apontar no seu registrador

---

## 🔄 Próximas Vezes (Atualizar o Site)

Depois que tudo estiver configurado, **cada mudança é automática:**

```powershell
# 1. Faça suas alterações nos arquivos
# (edite index.html, etc)

# 2. No terminal:
git add .
git commit -m "Descrição da mudança"
git push origin main

# ✨ Pronto! Seu site atualiza automaticamente em 1-2 minutos
```

---

## ✅ Checklist Final

- [ ] Repositório GitHub criado (`pietroconstantino/ezy-entregas`)
- [ ] Git push executado (`git push -u origin main`)
- [ ] Cloudflare Pages conectado ao GitHub
- [ ] Site acessível em `https://ezy-entregas.pages.dev`
- [ ] Teste o site (abra um abas anônima/privada)

---

## 🆘 Troubleshooting

### "Git push pede senha"
→ Use seu **token de acesso pessoal** do GitHub em vez de senha:
- https://github.com/settings/tokens → Gerar novo token → Personal access tokens (classic)

### "Cloudflare não encontra o repositório"
→ Verifique se autorizou o Cloudflare no GitHub:
- https://github.com/settings/applications

### "Deploy falha no Cloudflare"
→ Verifique a aba "Deployments" → Clique no último deployment → veja logs de erro

---

## 📞 URLs Importantes

| O quê | Link |
|-------|------|
| GitHub Novo Repo | https://github.com/new |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Seu Site | https://ezy-entregas.pages.dev |
| GitHub Settings | https://github.com/settings/tokens |

---

**Tudo pronto! 🚀 Você está a 10 minutos de ter seu site ao vivo!**
