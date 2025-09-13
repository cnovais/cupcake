// Sistema de gerenciamento de usuários usando arquivos JSON
// Funciona tanto localmente quanto no Vercel

const USERS_FILE = '/data/users.json';
const CURRENT_USER_FILE = '/data/current-user.json';

// Função auxiliar para fazer requisições para os arquivos
const fetchFile = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erro ao carregar arquivo: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar arquivo ${filePath}:`, error);
    return null;
  }
};

// Função auxiliar para salvar dados (simulada, pois não podemos escrever arquivos do frontend)
const saveToFile = async (filePath, data) => {
  // Como não podemos escrever arquivos do frontend, vamos usar LocalStorage como backup
  // e simular o salvamento
  console.log(`Simulando salvamento em ${filePath}:`, data);
  
  // Salvar no LocalStorage como backup
  const storageKey = filePath.replace('/data/', 'lumiere_cupcakes_').replace('.json', '');
  localStorage.setItem(storageKey, JSON.stringify(data));
  
  return true;
};

// Salvar usuário
export const saveUser = async (user) => {
  try {
    const users = await getUsers();
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex !== -1) {
      // Atualizar usuário existente
      users[existingUserIndex] = { 
        ...users[existingUserIndex], 
        ...user,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Adicionar novo usuário
      users.push({
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    await saveToFile(USERS_FILE, users);
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
};

// Buscar todos os usuários
export const getUsers = async () => {
  try {
    // Primeiro tenta carregar do arquivo
    let users = await fetchFile(USERS_FILE);
    
    // Se não conseguir, tenta do LocalStorage
    if (!users) {
      const localStorageUsers = localStorage.getItem('lumiere_cupcakes_users');
      users = localStorageUsers ? JSON.parse(localStorageUsers) : [];
    }
    
    return users || [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    // Fallback para LocalStorage
    const localStorageUsers = localStorage.getItem('lumiere_cupcakes_users');
    return localStorageUsers ? JSON.parse(localStorageUsers) : [];
  }
};

// Buscar usuário por email
export const getUserByEmail = async (email) => {
  try {
    const users = await getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
};

// Buscar usuário por ID
export const getUserById = async (id) => {
  try {
    const users = await getUsers();
    return users.find(user => user.id === id);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return null;
  }
};

// Verificar se email já está cadastrado
export const isEmailRegistered = async (email) => {
  try {
    const users = await getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return false;
  }
};

// Autenticar usuário (login)
export const authenticateUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (user && user.password === password) {
      // Salvar usuário atual
      await saveToFile(CURRENT_USER_FILE, user);
      return { success: true, user };
    }
    return { success: false, message: 'Email ou senha incorretos' };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { success: false, message: 'Erro interno do sistema' };
  }
};

// Obter usuário atual logado
export const getCurrentUser = async () => {
  try {
    // Primeiro tenta carregar do arquivo
    let currentUser = await fetchFile(CURRENT_USER_FILE);
    
    // Se não conseguir, tenta do LocalStorage
    if (!currentUser) {
      const localStorageUser = localStorage.getItem('lumiere_cupcakes_current_user');
      currentUser = localStorageUser ? JSON.parse(localStorageUser) : null;
    }
    
    return currentUser;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    // Fallback para LocalStorage
    const localStorageUser = localStorage.getItem('lumiere_cupcakes_current_user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
  }
};

// Fazer logout
export const logoutUser = async () => {
  try {
    await saveToFile(CURRENT_USER_FILE, null);
    localStorage.removeItem('lumiere_cupcakes_current_user');
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

// Atualizar dados do usuário
export const updateUser = async (userId, updatedData) => {
  try {
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      
      await saveToFile(USERS_FILE, users);
      
      // Atualizar usuário atual se for o mesmo
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await saveToFile(CURRENT_USER_FILE, users[userIndex]);
      }
      
      return { success: true, user: users[userIndex] };
    }
    
    return { success: false, message: 'Usuário não encontrado' };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, message: 'Erro interno do sistema' };
  }
};

// Deletar usuário
export const deleteUser = async (userId) => {
  try {
    const users = await getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    await saveToFile(USERS_FILE, filteredUsers);
    
    // Se for o usuário atual, fazer logout
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      await logoutUser();
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return false;
  }
};

// Limpar todos os dados
export const clearAllUsers = async () => {
  try {
    await saveToFile(USERS_FILE, []);
    await saveToFile(CURRENT_USER_FILE, null);
    localStorage.removeItem('lumiere_cupcakes_users');
    localStorage.removeItem('lumiere_cupcakes_current_user');
    return true;
  } catch (error) {
    console.error('Erro ao limpar usuários:', error);
    return false;
  }
};

// Estatísticas dos usuários
export const getUserStats = async () => {
  try {
    const users = await getUsers();
    const currentUser = await getCurrentUser();
    
    return {
      totalUsers: users.length,
      isLoggedIn: !!currentUser,
      currentUserId: currentUser?.id || null,
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }))
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return {
      totalUsers: 0,
      isLoggedIn: false,
      currentUserId: null,
      users: []
    };
  }
};

// Função para sincronizar dados do LocalStorage com arquivos (para desenvolvimento)
export const syncLocalStorageWithFiles = async () => {
  try {
    console.log('🔄 Sincronizando dados do LocalStorage com arquivos...');
    
    // Carregar dados do LocalStorage
    const localStorageUsers = localStorage.getItem('lumiere_cupcakes_users');
    const localStorageCurrentUser = localStorage.getItem('lumiere_cupcakes_current_user');
    
    if (localStorageUsers) {
      const users = JSON.parse(localStorageUsers);
      await saveToFile(USERS_FILE, users);
      console.log(`✅ Sincronizados ${users.length} usuários`);
    }
    
    if (localStorageCurrentUser) {
      const currentUser = JSON.parse(localStorageCurrentUser);
      await saveToFile(CURRENT_USER_FILE, currentUser);
      console.log('✅ Usuário atual sincronizado');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao sincronizar dados:', error);
    return false;
  }
};
