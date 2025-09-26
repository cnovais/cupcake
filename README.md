# 🧁 Lumière cupcakes

Uma aplicação web moderna para pedidos de cupcakes personalizados, inspirada em aplicativos de delivery como o iFood.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Cadastro de usuário** com nome, e-mail e senha
- **Login** com e-mail e senha
- **Recuperação de senha** simulada (sem envio de e-mail real)
- **Persistência** no LocalStorage

### 🛍️ Catálogo de Produtos
- **Seleção de massa**: 3 tipos (Baunilha, Chocolate, Morango)
- **Seleção de recheio**: até 5 tipos diferentes
- **Seleção de decoração**: 6 opções variadas
- **Fluxo intuitivo** passo a passo

### 🛒 Carrinho de Compras
- **Adicionar produtos** configurados
- **Gerenciar quantidades**
- **Remover itens**
- **Cálculo automático** de preços

### 📋 Sistema de Pedidos
- **Checkout completo** com endereço de entrega
- **Múltiplas formas de pagamento** (PIX, Cartão, Dinheiro)
- **Resumo detalhado** do pedido
- **Histórico de pedidos** no perfil do usuário
- **Status de pedido** em tempo real

### 👤 Perfil do Usuário
- **Informações pessoais**
- **Histórico completo** de pedidos
- **Estatísticas** de compras
- **Status de pedidos** atualizados

## 🎨 Design

### Paleta de Cores
- **Branco**: Base principal
- **Rosa**: Cor secundária (#ec4899)
- **Dourado**: Detalhes e destaques (#f59e0b)
- **Azul**: Acentos (#3b82f6)

### Características
- **Layout moderno** inspirado em apps de delivery
- **Totalmente responsivo** (mobile e desktop)
- **Interface intuitiva** e amigável
- **Animações suaves** e transições

## 🛠️ Tecnologias

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS
- **React Router** - Roteamento
- **LocalStorage** - Persistência de dados

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd projeto_filha_cupcacke
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 📱 Funcionalidades Principais

### Fluxo de Compra
1. **Escolha a massa** do cupcake
2. **Selecione até 5 recheios**
3. **Escolha a decoração**
4. **Revise o pedido** e adicione ao carrinho
5. **Finalize o pedido** com endereço e pagamento

### Produtos Disponíveis

#### Massas
- **Baunilha** - R$ 15,00
- **Chocolate** - R$ 18,00
- **Morango** - R$ 16,00

#### Coberturas
- **Creme de Baunilha** - R$ 8,00
- **Ganache de Chocolate** - R$ 10,00
- **Geléia de Morango** - R$ 7,00
- **Creme de Limão** - R$ 9,00
- **Doce de Leite** - R$ 8,50
- **Creme de Coco** - R$ 9,50

#### Decorações
- **Buttercream** - R$ 12,00
- **Fondant** - R$ 15,00
- **Drip de Chocolate** - R$ 14,00
- **Frutas Frescas** - R$ 16,00
- **Granulados Coloridos** - R$ 8,00
- **Nozes e Amêndoas** - R$ 11,00

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── Layout/         # Header, Footer, Layout
├── contexts/           # Contextos do React
│   ├── AuthContext.jsx    # Autenticação
│   ├── CartContext.jsx    # Carrinho
│   └── OrderContext.jsx   # Pedidos
├── data/               # Dados estáticos
│   └── products.js     # Produtos disponíveis
├── pages/              # Páginas da aplicação
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   ├── Catalog.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderSuccess.jsx
│   └── Profile.jsx
└── App.jsx             # Componente principal
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 📝 Notas

- Todos os dados são salvos no **LocalStorage** do navegador
- Não há backend ou banco de dados
- A funcionalidade de "esqueci minha senha" é simulada
- Os pedidos são armazenados localmente

## 🎯 Próximos Passos

- [ ] Integração com backend real
- [ ] Sistema de pagamento real
- [ ] Notificações push
- [ ] Avaliações e comentários
- [ ] Sistema de cupons de desconto
- [ ] Chat de suporte

---

Desenvolvido com ❤️ para criar uma experiência deliciosa de pedidos de cupcakes!