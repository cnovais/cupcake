// Utilitários para gerenciar usuários no LocalStorage

const USERS_KEY = 'lumiere_cupcakes_users';
const CURRENT_USER_KEY = 'lumiere_cupcakes_current_user';

// Salvar usuário no LocalStorage
export const saveUser = (user) => {
  try {
    const users = getUsers();
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex !== -1) {
      // Atualizar usuário existente
      users[existingUserIndex] = { ...users[existingUserIndex], ...user };
    } else {
      // Adicionar novo usuário
      users.push({
        ...user,
        id: Date.now().toString(), // ID único baseado no timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
};

// Buscar todos os usuários
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

// Buscar usuário por email
export const getUserByEmail = (email) => {
  try {
    const users = getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
};

// Buscar usuário por ID
export const getUserById = (id) => {
  try {
    const users = getUsers();
    return users.find(user => user.id === id);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return null;
  }
};

// Verificar se email já está cadastrado
export const isEmailRegistered = (email) => {
  try {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return false;
  }
};

// Autenticar usuário (login)
export const authenticateUser = (email, password) => {
  try {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
      // Salvar usuário atual na sessão
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Email ou senha incorretos' };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { success: false, message: 'Erro interno do sistema' };
  }
};

// Obter usuário atual logado
export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};

// Fazer logout
export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

// Atualizar dados do usuário
export const updateUser = (userId, updatedData) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Atualizar usuário atual se for o mesmo
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
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
export const deleteUser = (userId) => {
  try {
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
    
    // Se for o usuário atual, fazer logout
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      logoutUser();
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return false;
  }
};

// Limpar todos os dados (para testes)
export const clearAllUsers = () => {
  try {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao limpar usuários:', error);
    return false;
  }
};

// Estatísticas dos usuários
export const getUserStats = () => {
  try {
    const users = getUsers();
    const currentUser = getCurrentUser();
    
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
