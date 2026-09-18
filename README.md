# gigSaathi 🤝
> **Your Trusted Saathi for Every Service**  
> *Cooperative Gig Services Platform for Household & Community Services*  
> **Smart India Hackathon (SIH) 2026 Prototype**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpaditya2705-del%2FSIH)

---

## 🌟 Overview

**gigSaathi** is a community-driven cooperative platform that fundamentally reimagines the informal household services sector. Unlike conventional gig platforms that impose predatory 20–30% aggregator commissions and opaque ranking algorithms, **gigSaathi** connects verified, skilled trade workers directly to local residents through cooperative ownership, transparent pricing, and fair workload allocation.

---

## 🎯 Key Differentiators for SIH 2026

1. **Cooperative Ownership & 5% Welfare Pool:**
   - Aggregator markups are replaced with a direct cooperative model. 
   - A transparent 5% from every service fee feeds directly into worker healthcare, accident insurance, and emergency family welfare funds.
2. **Fair Work Allocation Engine:**
   - Prevents the "starvation" of informal gig workers using an interactive fairness scoring formula:
     $$\text{Score} = (\text{Idle Time} \times 0.35) + (\text{Workload Deficit} \times 0.25) + (\text{Proximity} \times 0.20) + (\text{Rating} \times 0.20)$$
3. **7-Day Predictive Demand Forecasting:**
   - Predictive capacity-versus-demand analytics to preempt neighborhood service shortages and guide cooperative shift schedules.
4. **Inclusive Accessibility (Low Digital Literacy Mode):**
   - High-contrast visual cues, large touch targets, and simulated native Hindi audio guidance (`useVoiceGuide`).
5. **Interactive Broken Item Photo Diagnostic:**
   - Customers can upload photos of broken appliances, leaky pipes, or faulty switches during booking for accurate upfront quotes.
6. **Bilingual & Dark/Light Theming:**
   - One-click language toggle between English and Hindi (`हिन्दी`) across all customer, worker, and cooperative interfaces.
   - Fluid Light/Dark mode transitions.

---

## 🏗️ Architecture & Clean Code Principles

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design System
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`) with 8 feature slices
- **Business Logic Layer:** 100% of domain and business logic is decoupled into custom React hooks (`src/hooks/`):
  - `useAuth`: User session, role state, and demo personas
  - `useServices`: Category filtering, search, and service catalog
  - `useWorkers`: Worker directory, credentials, and union badges
  - `useBookings`: Customer booking flow and lifecycle tracking
  - `useWorkerJobs`: Worker acceptance, execution, and job completion
  - `useCooperative`: Operational analytics, fair allocation scoring, and demand forecasts
  - `useLanguage`: Bilingual English ↔ Hindi translations
  - `useTheme`: Synchronized dark/light mode
  - `useVoiceGuide`: Native Hindi speech assistance
- **Data Layer:** Stateful in-memory repository syncing with `localStorage` (Zero external backend required for demonstration).

---

## 👥 Personas & Live Demonstration

| Persona | Demo Account | Focus Areas |
| :--- | :--- | :--- |
| **Customer** | Amit Sharma | Explore 12 categories, book repairs, upload damage photos, track live status. |
| **Worker** | Rahul Verma | Incoming jobs, Hindi voice cues, accept/complete work, track daily earnings. |
| **Cooperative Admin** | Pune Urban Workers Union | Fair allocation simulator, 7-day demand projections, member KYC roster. |

*Quick persona switching is accessible at any time from the top navigation bar (`Role: ...` dropdown).*

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/paditya2705-del/SIH.git
cd SIH

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 📁 Repository Structure

```
├── public/
│   └── logo.png                          # Official gigSaathi branding
├── src/
│   ├── components/                       # Common, Customer, Worker & Cooperative components
│   ├── hooks/                            # Decoupled domain business logic
│   ├── layouts/                          # Public, Customer, Worker & Cooperative layouts
│   ├── mock/                             # Stateful mock database synced with localStorage
│   ├── pages/                            # Public, Customer, Worker & Cooperative views
│   ├── routes/                           # Role-aware routing & route guards
│   ├── services/                         # Axios client & mock API handlers
│   ├── store/                            # Redux Toolkit store & feature slices
│   ├── utils/translations.js             # Bilingual dictionary (EN / HI)
│   ├── App.jsx                           # Application root with router
│   ├── index.css                         # Tailwind v4 configuration & base styles
│   └── main.jsx                          # Redux provider & entry point
└── package.json
```

---

## 📄 License
MIT License. Developed for Smart India Hackathon 2026.
