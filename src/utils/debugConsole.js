// Funções de debug para usar no console do navegador
// Para usar: import { testRegistration } from './debugConsole.js'

import { testDirectRegistration, debugAirtableData, testAirtableConnection } from './airtableUserStorage';

// Função global para testar cadastro
window.testRegistration = async (email) => {
  console.log('🔍 === TESTE DE CADASTRO VIA CONSOLE ===');
  console.log('🔍 Email:', email);
  
  try {
    const result = await testDirectRegistration(email);
    console.log('🔍 Resultado final:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error: error.message };
  }
};

// Função global para debug completo
window.debugAll = async () => {
  console.log('🔍 === DEBUG COMPLETO ===');
  
  try {
    await testAirtableConnection();
    await debugAirtableData();
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
};

// Função global para limpar tudo
window.clearAll = () => {
  console.log('🧹 === LIMPANDO TUDO ===');
  
  localStorage.removeItem('lumiere_cupcakes_users');
  localStorage.removeItem('lumiere_cupcakes_current_user');
  
  console.log('✅ LocalStorage limpo');
};

console.log('🔧 Funções de debug carregadas:');
console.log('  - testRegistration(email) - Testa cadastro direto');
console.log('  - debugAll() - Debug completo');
console.log('  - clearAll() - Limpa LocalStorage');
