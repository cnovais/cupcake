// Vercel Serverless Function para fazer proxy das requisições do Airtable
// Isso resolve problemas de CORS em dispositivos móveis

const AIRTABLE_API_KEY = 'patu4iJlyDOOgcPvQ.6806060ce7ee2d41000b5ef32c46e57c1d8e823bd0a84f4824037d435c0f6ebc';
const AIRTABLE_BASE_ID = 'appGc944dg7As6ZbD';
const AIRTABLE_TABLE_NAME = 'Users';
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { method, endpoint = '', data } = req.body || {};

    // Construir URL completa
    const url = `${AIRTABLE_URL}${endpoint}`;

    // Preparar headers
    const headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };

    // Preparar opções da requisição
    const options = {
      method: method || req.method,
      headers
    };

    // Adicionar body se houver dados
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    console.log('🔄 Proxy Airtable:', {
      method: options.method,
      url,
      hasData: !!data,
      endpoint: endpoint,
      dataKeys: data ? Object.keys(data) : null
    });

    // Fazer requisição para Airtable
    const response = await fetch(url, options);
    
    // Verificar se a resposta é ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro HTTP ${response.status}:`, errorText);
      
      return res.status(response.status).json({
        error: `HTTP error! status: ${response.status}`,
        details: errorText
      });
    }

    // Retornar dados
    const result = await response.json();
    
    console.log('✅ Sucesso no proxy Airtable:', {
      status: response.status,
      resultKeys: Object.keys(result),
      recordsCount: result.records ? result.records.length : 'N/A'
    });
    return res.status(200).json(result);

  } catch (error) {
    console.error('❌ Erro no proxy Airtable:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
}
