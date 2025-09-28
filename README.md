# AssetX DApp

> Real-World Asset (RWA) Launchpad & DeFi Trading Platform


## 🌟 Project Overview

AssetX revolutionizes the DeFi space by introducing the **RWA Launchpad**. Our platform enables the tokenization and trading of real-world assets, allowing users to invest in and trade assets that have traditionally been confined to centralized financial institutions.

### 🎯 Mission
To enhance **liquidity**, **transparency**, and **accessibility** in the RWA market through innovative blockchain technology.

### 📋 Detailed Documentation
📖 [**Complete Project Documentation**](https://docs.google.com/document/d/1p2uinBX4mU_k44AfnWcFjAXly7GI5CZvJKVJ3tusEYo/edit?usp=sharing) - Details of our project idea flow and workflow with project workflow graph.

### 🏗️ Core Functionality

#### **RWA Tokenization & Trading**
- **Wrapped ERC20 (WERC20)** token creation for real-world assets
- **Fractionalized ownership** of high-value assets (real estate, commodities, securities)
- **Custodial security** with third-party asset protection
- **Self-custody** wallet integration for complete user control

#### **DeFi Trading Platform**
- **Multi-chain swapping** (USDC ↔ WERC20)
- **Automated liquidity pools** with volatility protection
- **Arbitrage detection** for optimal trading rates
- **Real-time market analysis** and risk mitigation

#### **Launchpad System**
- **Project onboarding** with compliance verification
- **Automated token minting** and liquidity bootstrapping
- **Investor dashboard** with comprehensive project analytics
- **Lifecycle management** for token trading and redemption

---

## 🛠️ Technical Architecture

### **Frontend Stack**
```
React 18.2.0          → Modern UI framework
Vite 4.5.5            → Lightning-fast build tool
Tailwind CSS 3.x      → Utility-first styling
Redux Toolkit         → State management
React Router v6       → Client-side routing
```

### **Blockchain Integration**
```
RainbowKit 2.1.7      → Multi-wallet connectivity
Wagmi 2.12.17         → React hooks for Ethereum
Viem 2.21.21          → TypeScript Ethereum library
WalletConnect         → Cross-platform wallet support
```

### **Supported Networks**
| Network | Chain ID | Type | Status |
|---------|----------|------|--------|
| **Ethereum Sepolia** | 11155111 | Testnet | ✅ Active |
| **Base Mainnet** | 8453 | L2 | ✅ Active |
| **Kadena Chain 20** | 5920 | EVM Testnet | ✅ Active |
| **Kadena Chain 21** | 5921 | EVM Testnet | ✅ Active |

### **Custom Chain Configuration**

#### **Kadena EVM Chains**
AssetX integrates with Kadena's EVM-compatible testnet chains:

```javascript
// Kadena Chain 20
{
  id: 5920,
  name: 'Kadena Chain 20',
  rpcUrl: 'https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc',
  nativeCurrency: { name: 'Kadena', symbol: 'KDA', decimals: 18 },
  blockExplorer: 'https://explorer.chainweb.com'
}

// Kadena Chain 21  
{
  id: 5921,
  name: 'Kadena Chain 21',
  rpcUrl: 'https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc',
  nativeCurrency: { name: 'Kadena', symbol: 'KDA', decimals: 18 },
  blockExplorer: 'https://explorer.chainweb.com'
}
```

**Features:**
- ✅ **EVM Compatible** - Full Ethereum tooling support
- ✅ **RainbowKit Integration** - Native wallet switching

### **Smart Contract Architecture**
```
Factory Contracts     → Pool creation and management
Pair Contracts        → Token pair liquidity handling  
Custodian Contracts   → Secure asset custody
Compliance Modules    → Regulatory enforcement
ERC20 Wrappers        → RWA tokenization
```

---

## � Project Structure

```
AssetX-dapp/
├── 📁 public/                    # Static assets
├── 📁 src/
│   ├── 📁 components/           # UI components (17 total)
│   ├── 📁 features/             # Domain logic
│   │   ├── kyc/                # KYC verification
│   │   ├── securityTokens/     # STO management
│   │   ├── swap/               # Token swapping
│   │   └── popularMarkets/     # Market discovery
│   ├── 📁 pages/                # Route components  
│   ├── 📁 services/             # API & blockchain (7 services)
│   ├── 📁 providers/            # Context providers
│   ├── 📁 redux/                # State management
│   ├── 📁 styles/               # Global styles
│   └── 📁 utils/                # Helper functions
├── package.json                # Dependencies
├── vite.config.js              # Build configuration
└── README.md                   # Documentation
```



### **Architecture Patterns**

```
📦 Feature-Based Organization
├── 🎯 Pages → User-facing routes
├── 🔧 Services → External integrations
├── 🎨 Components → Reusable UI elements
├── 🪝 Hooks → Business logic abstraction
├── 🗃️ Redux → Global state management
└── 🛠️ Utils → Pure utility functions
```

---

## �🔄 Core Workflows

### **1. RWA Tokenization Flow**
```
Asset Deposit → Custodial Security → wrapSecurityToken() → ERC20 Conversion → Self-Custody
```

### **2. Trading & Swap Process**
```
User Request → Token Approval → Liquidity Pool → Volatility Check → Arbitrage Analysis → Swap Execution
```

### **3. Launchpad Onboarding**
```
Project Creation → Compliance Check → Token Minting → Pool Creation → Investor Access
```
---

## 🚀 Getting Started

### **Prerequisites**
```bash
Node.js 18+
npm or yarn
MetaMask or compatible wallet
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/virugamacoder/AssetX-dapp.git

# Navigate to project directory
cd AssetX-dapp

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Configure your API keys and RPC URLs

# Start development server
npm start
```

### **Environment Configuration**
```bash
# .env file
VITE_APP_API_URL=http://localhost:3000
VITE_APP_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_APP_STO_FACTORY_ADDRESS=0x...
VITE_APP_UNISWAP_ROUTER_ADDRESS=0x...
VITE_APP_LAUNCHPAD_CONTRACT_ADDRESS=0x...
```

---

## 🔗 Wallet Integration

### **Supported Wallets**
- **MetaMask** - Browser extension & mobile
- **WalletConnect** - Universal connection protocol  
- **Coinbase Wallet** - Centralized exchange wallet
- **Trust Wallet** - Mobile-first experience
- **Rainbow Wallet** - Ethereum-focused wallet
- **50+ Additional Wallets** via RainbowKit

### **Network Switching**
- Automatic network detection
- One-click network switching
- Wrong network notifications
- Custom RPC configuration

---

## 🧪 Testing

### **Local Development**
```bash
# Run development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run serve
```

### **Network Testing**
1. **Sepolia Testnet** - Primary testing environment
2. **Base Testnet** - L2 scaling validation
3. **Kadena Chain 20/21** - EVM testnet validation
4. **Rootstock Testnet** - Bitcoin L2 testing
5. **Local Hardhat** - Smart contract testing

