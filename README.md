# AssetX DApp

> The World's First Real-World Asset (RWA) Launchpad & DeFi Trading Platform


## 🌟 Project Overview

AssetX revolutionizes the DeFi space by introducing the world's first **RWA Launchpad**. Our platform enables the tokenization and trading of real-world assets, allowing users to invest in and trade assets that have traditionally been confined to centralized financial institutions.

### 🎯 Mission
To enhance **liquidity**, **transparency**, and **accessibility** in the RWA market through innovative blockchain technology.

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
│
├── 📁 src/                      # Source code directory
│   ├── 📁 assets/               # Static media files
│   │
│   ├── 📁 components/           # Reusable UI components (17 components)
│   │   ├── AccreditedProfile/   # → Accredited investor profile display
│   │   ├── Button/              # → Custom styled button with variants
│   │   ├── CheckBox/            # → Checkbox input with custom styling
│   │   ├── ExpertModeProfile/   # → Expert trading mode profile
│   │   ├── Footer/              # → Global footer component
│   │   ├── Header/              # → Global header component  
│   │   ├── Heading/             # → Typography heading component
│   │   ├── Img/                 # → Optimized image component
│   │   ├── Input/               # → Text input with validation
│   │   │   ├── index.jsx       # Main input component
│   │   │   └── close.jsx       # Input clear functionality
│   │   ├── Loader/              # → Loading spinner animations
│   │   ├── MySTOList/           # → User's STO portfolio display
│   │   ├── RadioBox/            # → Radio button group component
│   │   ├── ReactTable/          # → Data table with sorting/filtering
│   │   ├── SelectBox/           # → Dropdown select with search
│   │   ├── Text/                # → Typography text component
│   │   ├── ui/
│   │   │   └── modelComponent/  # → Modal dialog wrapper
│   │   ├── UserProfile/         # → Base user profile component
│   │   ├── UserProfile1/        # → Profile variant - Basic info
│   │   ├── UserProfile2/        # → Profile variant - Investment portfolio
│   │   ├── UserProfile3/        # → Profile variant - Trading stats
│   │   ├── UserProfile4/        # → Profile variant - KYC status
│   │   ├── UserProfile5/        # → Profile variant - Wallet info
│   │   ├── UserProfile6/        # → Profile variant - Settings panel
│   │   ├── UserRegistration/    # → New user registration form
│   │   └── index.jsx           # Components barrel export
│   │
│   ├── 📁 data/                 # Static data and constants
│   │   └── constant.jsx        # App constants and configuration
│   │
│   ├── 📁 features/             # Feature-based modules (Domain Logic)
│   │   ├── kyc/                # → KYC verification system
│   │   │   ├── components/
│   │   │   │   ├── stepComponentTitle/  # → KYC progress step titles
│   │   │   │   └── submittedKyc/        # → KYC submission confirmation
│   │   │   ├── corporate/      # → Corporate KYC workflow
│   │   │   │   ├── corporateInfo/       # → Company information form
│   │   │   │   │   ├── index.jsx       # Corporate info component
│   │   │   │   │   └── config.jsx      # Form field configuration
│   │   │   │   ├── legalRepresentative/ # → Legal representative details
│   │   │   │   └── UBOVerification/     # → Beneficial ownership verification
│   │   │   │       ├── index.jsx       # UBO verification form
│   │   │   │       └── UBOVerificationFormConfig.jsx # UBO form schema
│   │   │   ├── individual/     # → Individual KYC workflow
│   │   │   │   ├── personalInfo/        # → Personal details form (name, DOB, address)
│   │   │   │   ├── secondaryContract/   # → Emergency contact information
│   │   │   │   └── verifyDocuments/     # → ID document upload & verification
│   │   │   └── index.jsx       # KYC feature orchestrator
│   │   ├── popularMarkets/     # → Market trending & discovery
│   │   │   ├── errorModel/      # → Error handling modal
│   │   │   ├── successModel/    # → Success confirmation modal  
│   │   │   └── index.jsx       # Popular markets controller
│   │   ├── securityTokens/     # → STO (Security Token Offering) system
│   │   │   ├── createSTO/      # → STO creation workflow
│   │   │   │   ├── index.jsx   # STO creation form container
│   │   │   │   ├── formConfig.jsx # Form validation & field config
│   │   │   │   └── apiFunctions.jsx # STO blockchain interactions
│   │   │   ├── listSTO/        # → STO marketplace & discovery
│   │   │   │   ├── timeline/    # → STO phase timeline display
│   │   │   │   ├── tokenInfo/   # → Token details (price, supply, etc.)
│   │   │   │   ├── tokenomics/  # → Token distribution & economics
│   │   │   │   └── index.jsx   # STO listing controller
│   │   │   └── index.jsx       # Security tokens orchestrator
│   │   └── swap/               # → Token swapping & DEX integration
│   │       ├── manageTokenList/ # → Custom token list management
│   │       ├── selectToken/     # → Token picker with search & filters
│   │       └── index.jsx       # Swap feature controller
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   └── index.jsx           # Hooks barrel export
│   │
│   ├── 📁 pages/                # → Route-based page components
│   │   ├── Components/         # → Shared page components
│   │   │   ├── SecurityTokensSection.jsx # Security tokens display section
│   │   │   └── index.jsx       # Page components export
│   │   ├── investments/        # → Investment portfolio pages
│   │   │   ├── investmentDetail/        # → Individual investment details
│   │   │   └── investmentsList/         # → Portfolio overview & list
│   │   │       ├── index.jsx   # Main investment list
│   │   │       └── index copy.jsx # Backup/alternative version
│   │   ├── kyc/                # → KYC verification pages
│   │   │   ├── corporateKyc/    # → Corporate KYC workflow page
│   │   │   ├── individualKyc/   # → Individual KYC workflow page  
│   │   │   └── kycPage/         # → KYC type selection page
│   │   ├── liquidity/          # → Liquidity provider pages
│   │   │   ├── addLiquidity/    # → Add liquidity to pools
│   │   │   ├── liquidityList/   # → View all liquidity pools
│   │   │   └── liquiditySettings/ # → Pool configuration & management
│   │   ├── popularMarkets/     # → Market discovery pages
│   │   │   ├── components/
│   │   │   │   └── popularMarketCard/   # → Market preview card
│   │   │   ├── marketDetailPage/        # → Individual market analysis
│   │   │   └── popularMarketsPage/      # → Trending markets overview
│   │   ├── securityTokens/     # → STO & token pages
│   │   │   ├── securityTokenDetails/    # → Token deep-dive page
│   │   │   │   ├── index.jsx   # Token details view
│   │   │   │   └── chartConfig.jsx # Price/volume chart setup
│   │   │   └── securityTokensList/      # → Browse all available STOs
│   │   ├── swap/               # → Token swapping interface (738 lines)
│   │   │   └── index.jsx       # DEX trading interface with Uniswap
│   │   ├── Home.jsx            # → Landing page & platform overview
│   │   └── index.jsx           # Pages routing export
│   │
│   ├── 📁 providers/            # Context providers
│   │   └── WalletConnectProvider.jsx # Wallet & network configuration
│   │
│   ├── 📁 redux/                # State management
│   │   ├── securityTokens/
│   │   │   └── listSTO.jsx     # STO list reducer
│   │   └── store.jsx           # Redux store configuration
│   │
│   ├── 📁 rootLayout/           # App shell components
│   │   ├── footer               # Footer layout component
│   │   ├── header/              # Header layout component
│   │   └── index.jsx           # Root layout wrapper
│   │
│   ├── 📁 routes/               # Routing configuration
│   │   ├── ROUTE_PATH.js       # Route path constants
│   │   └── index.jsx           # Router setup and configuration
│   │
│   ├── 📁 services/             # → API & blockchain services (7 services)
│   │   ├── ercTokens/          # → ERC-20 token interactions
│   │   │   ├── index.jsx       # Token balance, transfer, approve functions
│   │   │   └── ercApiFunctions.jsx # Token metadata & allowance utilities
│   │   ├── launchpad/          # → Project launchpad services
│   │   │   ├── index.jsx       # Project creation & management API
│   │   │   └── launchpadApiFunctions.jsx # Funding & milestone utilities
│   │   ├── pinata/             # → IPFS file storage via Pinata
│   │   │   └── index.jsx       # Document upload & metadata storage
│   │   ├── RWAToken/           # → Real-World Asset tokenization
│   │   │   ├── index.jsx       # Asset wrapping & unwrapping API
│   │   │   └── RWAApiFunctions.jsx # Custody & compliance utilities
│   │   ├── STO/                # → Security Token Offering services
│   │   │   └── index.jsx       # STO creation, investment, & distribution
│   │   ├── uniswap/            # → DEX integration services
│   │   │   ├── index.jsx       # Swap execution & routing
│   │   │   └── uniswapApiFunctions.jsx # Price quotes & liquidity utilities
│   │   └── apiConfig.jsx       # → Global API endpoints & configuration
│   │
│   ├── 📁 styles/               # Global styles
│   │   ├── font.css            # Custom font definitions
│   │   ├── index.css           # Additional global styles
│   │   └── tailwind.css        # Tailwind CSS imports
│   │
│   ├── 📁 utils/                # Utility functions
│   │   ├── kyc/                # KYC-specific utilities
│   │   │   └── index.js        # KYC helper functions
│   │   └── index.jsx           # General utility functions
│   │
│   ├── index.css               # Global CSS styles
│   ├── index.jsx               # App entry point
│   └── main.jsx                # React DOM rendering
├── .env                        # Environment variables (local)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── .nvmrc                      # Node.js version specification
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── jsconfig.json               # JavaScript configuration
├── package.json                # Project dependencies & scripts
├── package-lock.json           # Dependency lock file
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment configuration
├── vite.config.js              # Vite build tool configuration
└── README.md                   # Project documentation
```

### **Key Directory Explanations**

| Directory | Purpose | Key Files | Count |
|-----------|---------|-----------|-------|
| **`/src/components/`** | Reusable UI components | Button, Input, Loader, UserProfile variants, Modal | 17 components |
| **`/src/features/`** | Domain-specific business logic | KYC, SecurityTokens, Swap, PopularMarkets | 4 feature modules |
| **`/src/pages/`** | Route-based page components | Home, Swap, Liquidity, KYC, Investments | 15+ pages |
| **`/src/services/`** | API & blockchain integrations | STO, RWA, Uniswap, Pinata, ERC tokens, Launchpad | 7 services |
| **`/src/providers/`** | React context providers | WalletConnectProvider for blockchain connectivity | 1 provider |
| **`/src/redux/`** | State management | Store configuration, STO reducers | 2 files |
| **`/src/hooks/`** | Custom React hooks | Wallet, contract, trading hooks | 1 barrel file |
| **`/src/utils/`** | Helper functions | KYC utilities, general helper functions | 2 files |
| **`/src/styles/`** | Global styling | Tailwind CSS, custom fonts, global styles | 3 files |
| **`/src/routes/`** | Routing configuration | Route paths constants, router setup | 2 files |
| **`/src/rootLayout/`** | App shell components | Header, Footer, Layout wrapper | 3 components |

### **Feature Modules Deep Dive**

| Feature | Components | Purpose | Files |
|---------|------------|---------|-------|
| **`/features/kyc/`** | 8+ components | Individual & Corporate KYC verification | Personal info, Document verification, UBO verification |
| **`/features/securityTokens/`** | 5+ components | STO creation and management | Token creation, Timeline, Tokenomics |
| **`/features/swap/`** | 2 components | Token swapping functionality | Token selection, List management |
| **`/features/popularMarkets/`** | 2 components | Market display and interaction | Success/Error modals |

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

## 🎭 User Roles & Permissions

| Role | Capabilities | Access Level |
|------|-------------|--------------|
| **WERC20 Creators** | Create tokens, manage projects | Project Owner |
| **Investors** | Trade, stake, redeem assets | Public Access |
| **Governors** | Platform governance, upgrades | Admin Level |
| **Stakers** | Earn rewards, vote on proposals | *Coming Soon* |
| **Lenders/Borrowers** | DeFi lending protocols | *Coming Soon* |

---

## 🔒 Compliance & Security

### **Legacy Compliance Modules**
- `ApproveTransfer.sol` - Transfer approval mechanisms
- `CountryRestrictions.sol` - Geographic restrictions
- `DayMonthLimits.sol` - Time-based transfer limits
- `MaxBalance.sol` - Wallet balance limitations
- `SupplyLimit.sol` - Token supply management

### **Modular Compliance System**
- `ConditionalTransferModule.sol` - Smart transfer conditions
- `CountryAllowModule.sol` - Whitelist management
- `ExchangeMonthlyLimitsModule.sol` - Exchange restrictions
- `TransferFeesModule.sol` - Dynamic fee structures
- `TimeExchangeLimitsModule.sol` - Temporal trading limits

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

## 📊 Platform Features

### **✅ Current Features**
- [x] Multi-wallet connectivity
- [x] Cross-chain token swapping
- [x] RWA tokenization system
- [x] Liquidity pool management
- [x] Project launchpad
- [x] Investor dashboard
- [x] Compliance modules
- [x] Custodial integration
- [x] Kadena EVM chains integration

### **🚧 Coming Soon**
- [ ] Prediction markets
- [ ] Staking & restaking protocols
- [ ] Lending & borrowing features
- [ ] Advanced governance system
- [ ] Mobile application
- [ ] Institutional custody solutions

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
3. **Local Hardhat** - Smart contract testing

---

## 📚 API Documentation

### **Core Contracts**
```solidity
// Factory Contract
function createPair(address tokenA, address tokenB) external returns (address pair);

// Wrapping Contract  
function wrapSecurityToken(address asset, uint256 amount) external returns (address wrappedToken);

// Swap Contract
function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path) external;
```

### **Frontend Integration**
```javascript
// Wallet Connection
import { useAccount, useConnect } from 'wagmi';

// Contract Interaction
import { useContract, useContractWrite } from 'wagmi';

// Chain Management
import { useNetwork, useSwitchNetwork } from 'wagmi';
```

---
