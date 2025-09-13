# 🚀 Configurando Airtable para Lumière Cupcakes

## **🎯 O que é o Airtable?**
**Airtable** é uma planilha online com API REST que funciona como banco de dados. É **gratuito** até 1200 registros e funciona perfeitamente no **Vercel**.

## **📋 Passo a Passo:**

### **1. Criar Conta no Airtable:**
1. **Acesse**: https://airtable.com
2. **Clique** em "Sign up for free"
3. **Crie** sua conta (gratuita)

### **2. Criar Base de Dados:**
1. **Clique** em "Add a base"
2. **Escolha** "Start from scratch"
3. **Nome**: "Lumière Cupcakes Users"
4. **Clique** em "Create base"

### **3. Configurar Tabela:**
1. **Renomeie** a tabela para "users"
2. **Configure** os campos:
   - `name` (Single line text)
   - `email` (Single line text) 
   - `password` (Single line text)
   - `createdAt` (Single line text)
   - `updatedAt` (Single line text)

### **4. Obter API Key:**
1. **Clique** no seu avatar (canto superior direito)
2. **Selecione** "Developer hub"
3. **Clique** em "Create new token"
4. **Nome**: "Lumière Cupcakes API"
5. **Permissões**: "data.records:read, data.records:write"
6. **Copie** a API Key (começa com `key...`)

### **5. Obter Base ID:**
1. **Volte** para sua base
2. **Clique** em "Help" (canto superior direito)
3. **Selecione** "API documentation"
4. **Copie** o Base ID (começa com `app...`)

### **6. Configurar no Código:**
1. **Abra** o arquivo `src/utils/airtableUserStorage.js`
2. **Substitua** as linhas:
   ```javascript
   const AIRTABLE_API_KEY = 'sua_api_key_aqui';
   const AIRTABLE_BASE_ID = 'seu_base_id_aqui';
   ```

### **7. Testar:**
1. **Rode** o projeto: `npm run dev`
2. **Cadastre** um usuário
3. **Verifique** no Airtable se apareceu
4. **Faça** login com o usuário

## **✅ Como Funciona:**

### **Cadastro:**
```
Usuário preenche formulário
    ↓
Verifica se email já existe no Airtable
    ↓
Se não existe: Salva no Airtable
    ↓
Salva também no LocalStorage (backup)
    ↓
Usuário logado automaticamente
```

### **Login:**
```
Usuário digita email/senha
    ↓
Consulta no Airtable
    ↓
Se encontrou: Verifica senha
    ↓
Se senha correta: Salva no LocalStorage
    ↓
Usuário logado
```

## ** Vantagens:**

- ✅ **Gratuito** até 1200 registros
- ✅ **Interface visual** - veja dados em planilha
- ✅ **API REST** automática
- ✅ **Funciona** perfeitamente no Vercel
- ✅ **Backup** automático
- ✅ **Sincronização** em tempo real

## ** Deploy no Vercel:**

### **1. Fazer Commit:**
```bash
git add .
git commit -m "Add Airtable integration"
git push
```

### **2. Vercel Deploy:**
- **Vercel** faz deploy automático
- **Funciona** perfeitamente
- **Dados** persistem

## ** Verificar Funcionamento:**

### **1. Cadastrar Usuário:**
- **Preencha** formulário de cadastro
- **Clique** em "Criar conta"
- **Verifique** no Airtable se apareceu

### **2. Fazer Login:**
- **Digite** email/senha
- **Clique** em "Entrar"
- **Login** deve funcionar

### **3. Ver Dados:**
- **Acesse** página Admin
- **Clique** em "Debug Airtable"
- **Verifique** console do navegador

## **🚨 Troubleshooting:**

### **Erro de API Key:**
- **Verifique** se a API Key está correta
- **Confirme** as permissões (read/write)

### **Erro de Base ID:**
- **Verifique** se o Base ID está correto
- **Confirme** se a base existe

### **Erro de Tabela:**
- **Verifique** se a tabela se chama "users"
- **Confirme** se os campos existem

### **Dados não aparecem:**
- **Verifique** console do navegador
- **Confirme** se não há erros de CORS
- **Teste** com "Debug Airtable"

## **🎉 Pronto!**

**Agora você tem:**
- ✅ **Cadastro** funcionando
- ✅ **Login** funcionando  
- ✅ **Dados** persistindo no Airtable
- ✅ **Interface** visual para ver usuários
- ✅ **Deploy** funcionando no Vercel

**Seus usuários estão seguros no Airtable!** 🧁✨
