import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  authenticateUser, 
  saveUser, 
  isEmailRegistered, 
  getUserByEmail,
  updateUser,
  logoutUser,
  getUserStats,
  debugAirtableData
} from '../utils/airtableUserStorage';

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
    // Carregar usuário ao inicializar
    const loadUser = async () => {
      try {
        // Carregar usuário atual
        const savedUser = await getCurrentUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Simular delay de API
        setTimeout(async () => {
          try {
            const result = await authenticateUser(email, password);
            
            if (result.success) {
              const { password: _, ...userWithoutPassword } = result.user;
              setUser(userWithoutPassword);
              resolve(userWithoutPassword);
            } else {
              reject(new Error(result.message));
            }
          } catch (error) {
            reject(error);
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  const register = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        setTimeout(async () => {
          try {
            console.log('🔍 AuthContext: Iniciando registro para:', email);
            
            const newUser = {
              name,
              email,
              password
            };

            console.log('🔍 AuthContext: Chamando saveUser...');
            const result = await saveUser(newUser);
            console.log('🔍 AuthContext: Resultado do saveUser:', result);
            
            if (result.success) {
              const { password: _, ...userWithoutPassword } = result.user;
              setUser(userWithoutPassword);
              // Salvar usuário atual na sessão
              localStorage.setItem('lumiere_cupcakes_current_user', JSON.stringify(userWithoutPassword));
              console.log('✅ AuthContext: Usuário registrado com sucesso');
              resolve(userWithoutPassword);
            } else {
              console.log('❌ AuthContext: Erro no registro:', result.error);
              reject(new Error(result.error || 'Erro ao salvar usuário'));
            }
          } catch (error) {
            console.log('❌ AuthContext: Exceção no registro:', error);
            reject(error);
          }
        }, 1000);
      } catch (error) {
        console.log('❌ AuthContext: Exceção externa:', error);
        reject(error);
      }
    });
  };

  const forgotPassword = (email, newPassword) => {
    return new Promise(async (resolve, reject) => {
      try {
        setTimeout(async () => {
          try {
            const user = await getUserByEmail(email);
            
            if (!user) {
              reject(new Error('Email não encontrado'));
              return;
            }

            const result = await updateUser(user.id, { password: newPassword });
            
            if (result.success) {
              resolve('Senha redefinida com sucesso');
            } else {
              reject(new Error(result.message));
            }
          } catch (error) {
            reject(error);
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async () => {
    setUser(null);
    await logoutUser();
  };

  // Função para atualizar dados do usuário
  const updateUserProfile = async (userId, updatedData) => {
    const result = await updateUser(userId, updatedData);
    
    if (result.success) {
      const { password: _, ...userWithoutPassword } = result.user;
      setUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    
    return result;
  };

  // Função para obter estatísticas dos usuários
  const getStats = async () => {
    return await getUserStats();
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
