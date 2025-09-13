// Sistema de gerenciamento de usuários usando Airtable
// Funciona perfeitamente no Vercel (estático)
// Gratuito até 1200 registros

const AIRTABLE_API_KEY = 'patu4iJlyDOOgcPvQ.6806060ce7ee2d41000b5ef32c46e57c1d8e823bd0a84f4824037d435c0f6ebc'; // Substitua pela sua API Key
const AIRTABLE_BASE_ID = 'appGc944dg7As6ZbD'; // Substitua pelo ID da sua base
const AIRTABLE_TABLE_NAME = 'Users'; // Nome da tabela no Airtable

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

// Função auxiliar para fazer requisições HTTP
const airtableRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${AIRTABLE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro HTTP ${response.status}:`, errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro na requisição Airtable:`, error);
    throw error;
  }
};

// Salvar usuário
export const saveUser = async (user) => {
  try {
    // Verificar se email já existe
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      return { success: false, error: 'Email já cadastrado' };
    }

    // Debug: ver o que está sendo enviado
    const dataToSend = {
      fields: {
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: new Date().toISOString()
      }
    };
    
    console.log('🔍 Dados sendo enviados para Airtable:', dataToSend);
    
    const result = await airtableRequest('', {
      method: 'POST',
      body: JSON.stringify(dataToSend)
    });

    const savedUser = {
      id: result.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date().toISOString() // Adicionado localmente
    };

    // Salvar também no LocalStorage como backup
    const users = JSON.parse(localStorage.getItem('lumiere_cupcakes_users') || '[]');
    users.push(savedUser);
    localStorage.setItem('lumiere_cupcakes_users', JSON.stringify(users));

    return { success: true, user: savedUser };
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return { success: false, error: error.message };
  }
};

// Buscar todos os usuários
export const getUsers = async () => {
  try {
    const result = await airtableRequest('?maxRecords=100&view=Grid%20view');
    
    const users = result.records.map(record => ({
      id: record.id,
      name: record.fields.name,
      email: record.fields.email,
      password: record.fields.password,
      createdAt: record.fields.createdAt
    }));

    // Salvar no LocalStorage como backup
    localStorage.setItem('lumiere_cupcakes_users', JSON.stringify(users));
    
    return users;
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
    const result = await airtableRequest(`?filterByFormula={email}="${email}"`);
    
    if (result.records.length > 0) {
      const record = result.records[0];
      return {
        id: record.id,
        name: record.fields.name,
        email: record.fields.email,
        password: record.fields.password,
        createdAt: record.fields.createdAt
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
};

// Verificar se email já está cadastrado
export const isEmailRegistered = async (email) => {
  try {
    const user = await getUserByEmail(email);
    return !!user;
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
      // Salvar usuário atual no LocalStorage
      localStorage.setItem('lumiere_cupcakes_current_user', JSON.stringify(user));
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
    const currentUser = localStorage.getItem('lumiere_cupcakes_current_user');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};

// Fazer logout
export const logoutUser = async () => {
  try {
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
    const result = await airtableRequest(`/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields: {
          ...updatedData
        }
      })
    });

    // Atualizar usuário atual se for o mesmo
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedUser = {
        ...currentUser,
        ...updatedData
      };
      localStorage.setItem('lumiere_cupcakes_current_user', JSON.stringify(updatedUser));
    }

    return { success: true, user: result };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, message: 'Erro interno do sistema' };
  }
};

// Deletar usuário
export const deleteUser = async (userId) => {
  try {
    await airtableRequest(`/${userId}`, {
      method: 'DELETE'
    });

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
        createdAt: user.createdAt
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

// Função para debugar dados do Airtable
export const debugAirtableData = async () => {
  try {
    console.log('🔍 === DEBUG AIRTABLE ===');
    
    const users = await getUsers();
    const currentUser = await getCurrentUser();
    
    console.log('📊 Dados do Airtable:');
    console.log('  - Usuários:', users);
    console.log('  - Usuário atual:', currentUser);
    
    return { users, currentUser };
  } catch (error) {
    console.error('Erro ao debugar dados do Airtable:', error);
    return { users: [], currentUser: null };
  }
};
