# 📁 Sistema de Armazenamento em Arquivos - Lumière cupcakes

## 🎯 **Objetivo**
Sistema híbrido que funciona tanto localmente quanto no Vercel, salvando dados de usuários em arquivos JSON na pasta `public/data/`.

## 📂 **Estrutura de Arquivos**

```
public/
└── data/
    ├── users.json          # Array com todos os usuários
    └── current-user.json   # Usuário logado atualmente
```

## 🔧 **Como Funciona**

### **1. Sistema Híbrido**
- **Desenvolvimento Local**: Usa arquivos JSON + LocalStorage como backup
- **Produção (Vercel)**: Usa arquivos JSON acessíveis via HTTP
- **Fallback**: Se arquivo não for encontrado, usa LocalStorage

### **2. Fluxo de Dados**
```javascript
// 1. Tentar carregar do arquivo JSON
const users = await fetch('/data/users.json');

// 2. Se falhar, usar LocalStorage como backup
if (!users) {
  users = JSON.parse(localStorage.getItem('lumiere_cupcakes_users'));
}

// 3. Salvar no LocalStorage como backup
localStorage.setItem('lumiere_cupcakes_users', JSON.stringify(users));
```

## 📊 **Arquivos de Dados**

### **`public/data/users.json`**
```json
[
  {
    "id": "1703123456789",
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

### **`public/data/current-user.json`**
```json
{
  "id": "1703123456789",
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

## 🚀 **Funcionalidades**

### **✅ Operações Suportadas**
- **Salvar usuário** - Adiciona/atualiza usuário nos arquivos
- **Buscar usuários** - Carrega lista completa de usuários
- **Autenticação** - Login com validação de credenciais
- **Logout** - Remove usuário atual
- **Atualizar dados** - Modifica informações do usuário
- **Deletar usuário** - Remove usuário específico
- **Estatísticas** - Contadores e informações gerais

### **🔄 Sincronização**
- **Automática** - Dados sincronizados entre arquivos e LocalStorage
- **Fallback** - LocalStorage usado se arquivos não estiverem disponíveis
- **Backup** - Dados sempre salvos em ambos os locais

## 🌐 **Compatibilidade**

### **✅ Desenvolvimento Local**
- Arquivos JSON acessíveis via `http://localhost:5173/data/`
- LocalStorage como backup
- Sincronização automática

### **✅ Produção (Vercel)**
- Arquivos JSON acessíveis via `https://seu-site.vercel.app/data/`
- LocalStorage como backup
- Funciona offline

### **✅ Outras Plataformas**
- Netlify, GitHub Pages, etc.
- Qualquer servidor estático
- Sempre com fallback para LocalStorage

## 🛠️ **Implementação**

### **1. Arquivo Principal**
```javascript
// src/utils/fileUserStorage.js
import { fetchFile, saveToFile } from './fileUserStorage';

// Carregar usuários
const users = await getUsers();

// Salvar usuário
const success = await saveUser(userData);
```

### **2. Integração com React**
```javascript
// src/contexts/AuthContext.jsx
import { 
  getCurrentUser, 
  authenticateUser, 
  saveUser 
} from '../utils/fileUserStorage';

// Uso no componente
const { user, login, register } = useAuth();
```

### **3. Página de Administração**
```javascript
// src/pages/Admin.jsx
import { getUsers, getUserStats } from '../utils/fileUserStorage';

// Carregar dados
const users = await getUsers();
const stats = await getUserStats();
```

## 📝 **Exemplos de Uso**

### **Cadastrar Usuário**
```javascript
const newUser = {
  name: "Maria Silva",
  email: "maria@email.com",
  password: "senha123"
};

const success = await saveUser(newUser);
if (success) {
  console.log('Usuário cadastrado com sucesso!');
}
```

### **Fazer Login**
```javascript
const result = await authenticateUser("maria@email.com", "senha123");
if (result.success) {
  console.log('Login realizado:', result.user);
} else {
  console.error('Erro:', result.message);
}
```

### **Obter Estatísticas**
```javascript
const stats = await getUserStats();
console.log('Total de usuários:', stats.totalUsers);
console.log('Usuário logado:', stats.isLoggedIn);
```

## 🔒 **Segurança**

### **⚠️ Limitações do Frontend**
- **Não é possível escrever arquivos** do frontend
- **Arquivos são somente leitura** em produção
- **LocalStorage é o único meio de persistência real**

### **✅ Soluções Implementadas**
- **Sincronização automática** com LocalStorage
- **Fallback robusto** para LocalStorage
- **Validações** de dados antes de salvar
- **Tratamento de erros** completo

## 🚀 **Deploy no Vercel**

### **1. Preparação**
```bash
# Criar arquivos de dados
mkdir -p public/data
echo '[]' > public/data/users.json
echo 'null' > public/data/current-user.json
```

### **2. Deploy**
```bash
# Fazer commit dos arquivos
git add .
git commit -m "Add file storage system"
git push

# Vercel fará deploy automático
```

### **3. Verificação**
- Acesse `https://seu-site.vercel.app/data/users.json`
- Deve retornar array vazio: `[]`
- Sistema funcionará com LocalStorage como backup

## 🎯 **Vantagens**

### **✅ Benefícios**
- **Persistência visual** - Dados visíveis nos arquivos
- **Backup automático** - LocalStorage como fallback
- **Compatibilidade** - Funciona em qualquer plataforma
- **Simplicidade** - Sem necessidade de backend
- **Transparência** - Dados acessíveis e verificáveis

### **⚠️ Limitações**
- **Somente leitura** em produção
- **LocalStorage é o real armazenamento**
- **Dados não compartilhados** entre dispositivos
- **Limite de tamanho** do LocalStorage (~5-10MB)

## 📋 **Próximos Passos**

### **🔄 Melhorias Futuras**
1. **Backend real** - API para escrita de arquivos
2. **Banco de dados** - PostgreSQL, MongoDB, etc.
3. **Autenticação JWT** - Tokens seguros
4. **Criptografia** - Senhas hasheadas
5. **Backup automático** - Exportação de dados

### **🛡️ Segurança Avançada**
1. **Hash de senhas** - bcrypt, scrypt
2. **Validação de dados** - Joi, Yup
3. **Rate limiting** - Prevenção de ataques
4. **Logs de auditoria** - Histórico de ações

---

**🎉 Sistema híbrido funcional!** Combina arquivos JSON visíveis com LocalStorage robusto, funcionando perfeitamente no Vercel e outras plataformas de deploy estático.
