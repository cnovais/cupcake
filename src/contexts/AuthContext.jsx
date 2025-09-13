import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  authenticateUser, 
  saveUser, 
  isEmailRegistered, 
  getUserByEmail,
  updateUser,
  logoutUser,
  getUserStats 
} from '../utils/userStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário do localStorage ao inicializar
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simular delay de API
      setTimeout(() => {
        const result = authenticateUser(email, password);
        
        if (result.success) {
          const { password: _, ...userWithoutPassword } = result.user;
          setUser(userWithoutPassword);
          resolve(userWithoutPassword);
        } else {
          reject(new Error(result.message));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verificar se email já existe
        if (isEmailRegistered(email)) {
          reject(new Error('Email já cadastrado'));
          return;
        }

        const newUser = {
          name,
          email,
          password
        };

        const success = saveUser(newUser);
        
        if (success) {
          const savedUser = getUserByEmail(email);
          const { password: _, ...userWithoutPassword } = savedUser;
          setUser(userWithoutPassword);
          // Salvar usuário atual na sessão
          localStorage.setItem('lumiere_cupcakes_current_user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Erro ao salvar usuário'));
        }
      }, 1000);
    });
  };

  const forgotPassword = (email, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = getUserByEmail(email);
        
        if (!user) {
          reject(new Error('Email não encontrado'));
          return;
        }

        const result = updateUser(user.id, { password: newPassword });
        
        if (result.success) {
          resolve('Senha redefinida com sucesso');
        } else {
          reject(new Error(result.message));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    logoutUser();
  };

  // Função para atualizar dados do usuário
  const updateUserProfile = (userId, updatedData) => {
    const result = updateUser(userId, updatedData);
    
    if (result.success) {
      const { password: _, ...userWithoutPassword } = result.user;
      setUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    
    return result;
  };

  // Função para obter estatísticas dos usuários
  const getStats = () => {
    return getUserStats();
  };

  const value = {
    user,
    login,
    register,
    forgotPassword,
    logout,
    updateUserProfile,
    getStats,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
