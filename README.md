# Test Frontend 2

Application de gestion d'outils internes avec analytics, construite avec TypeScript, TanStack Query, et Tailwind CSS v4.

## 1. 🚀 Quick Start

### Installation et lancement

```bash
npm install && npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Prérequis

- **Node.js** 18+ et npm
- **Backend JSON Server** (voir `docs/JSON_serve_backend.md` pour la configuration)

### Commandes disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run lint     # Vérifie le code avec ESLint
npm run preview  # Prévisualise le build de production
```

## 2.🏗️ Architecture

### Structure du projet

L'application suit une architecture en couches et modulaire :

```
src/
├── components/         # Composants React réutilisables
│   ├── analytics/      # Composants d'analytics (graphiques, KPIs)
│   ├── common/         # Composants communs (forms, layout)
│   └── tool/           # Composants spécifiques aux outils
├── config/             # Configuration (API, query client, settings)
├── context/            # Contextes React (Theme)
├── hooks/              # Hooks personnalisés
│   └── queries/        # Hooks TanStack Query par domaine
├── icons/              # Bibliothèque d'icônes SVG
├── layout/             # Composants de layout (Header, Footer, NavBar)
├── pages/              # Pages de l'application
│   ├── analytics/      # Page Analytics
│   └── tool/           # Pages Tools (Dashboard, List, Details, Create, Edit)
├── routes/             # Configuration des routes
├── services/           # Services API (logique métier)
├── types/              # Types TypeScript
│   ├── api/            # Types pour les réponses API
│   └── entities/       # Types pour les entités métier
├── utils/              # Utilitaires (api-client, formatters)
└── mock/               # Données mock pour le développement
```

### Architecture de données

**Flux de données :**

```
Composant → Hook (TanStack Query) → Service → Client HTTP → Backend JSON Server
```

**Technologies clés :**

- **TanStack Query** : Gestion du cache, synchronisation automatique, états de chargement
- **Axios** : Client HTTP avec intercepteurs (via `axios-instance.ts` et `api-client.ts`)
- **TypeScript** : Typage strict pour la sécurité de type
- **React Router v7** : Navigation et routing

## 🎨 Design System Evolution

**Jour 1 - Fondations**

- Layout : Header avec Placeholder pour le Theme, le Userdropdown
- DashboardPage
- Hook et service pour les endpoints de base

**Jour 2 - Composants avancés**

- Finalisation du Header et création du context pour le Thème
- ToolCatalog : structure principale et ajout de hook et service
- Début du CRUD de ToolsCatalog

**Jour 3 - Analytics & Visualisation**

- Fin du CRUD de Tools
- Identification des endpoints pour CostAnalytics
- Mock des endpoints manquants
- Intégration Recharts avec palette de couleurs centralisée

### Système de thèmes

- **Tailwind CSS v4** avec variables CSS (`--color-*`)
- **ThemeProvider** React Context pour la gestion d'état
- **2 thèmes** : `light` (par défaut) et `dark`
- **Persistance** : Choix utilisateur sauvegardé dans localStorage

## 🔗 Navigation & User Journey

**1. Dashboard (`/`)**

- Arrivée sur la page d'accueil
- Vue d'ensemble avec KPIs (coûts, outils actifs, utilisateurs)
- Liste des outils récents
- Navigation rapide vers Tools ou Analytics

**2. Tools (`/tools`)**

- Catalogue complet des outils
- Filtres avancés (statut, catégorie, coût, département)
- Recherche en temps réel
- Pagination et tri
- Actions : Voir détails, Créer, Modifier, Supprimer

**3. Tool Details (`/tools/:id`)**

- Informations complètes d'un outil
- Métriques d'utilisation
- Liste des utilisateurs associés
- Actions : Modifier, Supprimer

**4. Tool Create/Edit (`/tools/add`, `/tools/:id/edit`)**

- Formulaire complet avec validation
- Gestion des erreurs
- Redirection après création/modification

**5. Analytics (`/analytics`)**

- 3 sections principales :
  - **Cost Analytics** : Évolution mensuelle, répartition par département, top outils coûteux
  - **Usage Analytics** : Taux d'adoption, outils les plus/moins utilisés
  - **Insights Dashboard** : Alertes, optimisations, ROI

## 📊 Data Integration Strategy

### Gestion des données avec JSON Server

**Architecture en couches :**

1. **Client HTTP** (`utils/api-client.ts` + `utils/axios-instance.ts`)

   - Wrapper autour d'Axios avec instance configurée
   - Intercepteurs pour le logging et la gestion d'erreurs
   - Gestion d'erreurs centralisée
   - Construction automatique des query strings

2. **Services** (`services/`)

   - Logique métier par domaine
   - `tools.service.ts`, `users.service.ts`, `analytics.service.ts`, etc.
   - Méthodes CRUD typées

3. **Hooks TanStack Query** (`hooks/queries/`)

   - Cache intelligent automatique
   - Synchronisation entre composants
   - Gestion des états (loading, error, success)
   - Invalidation de cache

4. **Composants**
   - Utilisation simple des hooks
   - Affichage conditionnel selon l'état

### Configuration

- **Endpoints** : Définis dans `config/api.ts`
- **Query Client** : Configuré dans `config/query-client.ts`
  - Cache time : 5 minutes
  - Stale time : 10 minutes pour analytics
  - Retry : 3 tentatives automatiques

## 📱 Progressive Responsive Design

**Breakpoints Tailwind :**

- **Mobile** : `< 768px` (par défaut)
- **Tablet** : `md: >= 768px`
- **Desktop** : `lg: >= 1024px`

### Adaptation par page

**Dashboard**

- Mobile : 1 colonne, cartes empilées
- Desktop : Grid 2-3 colonnes pour les KPIs

**Tools Page**

- Mobile : Liste verticale, filtres en accordéon
- Desktop : Table avec colonnes multiples, sidebar de filtres

**Analytics**

- Mobile : Graphiques empilés, légendes simplifiées
- Desktop : Grid 2 colonnes, graphiques côte à côte

### Composants responsives

- **NavBar** : Menu hamburger sur mobile, navigation horizontale sur desktop
- **Tables** : Scroll horizontal sur mobile, affichage complet sur desktop
- **Modals** : Plein écran sur mobile, centré sur desktop
- **Graphiques** : `ResponsiveContainer` de Recharts pour adaptation automatique

## **🧪 Testing Strategy**

### Tests unitaires

**À implémenter :**

- Tests des hooks personnalisés (`useTools`, `useAnalytics`)
- Tests des services API

## ⚡ Performance Optimizations

### Techniques utilisées

**1. Code Splitting**

- Routes chargées à la demande (React Router lazy loading)
- Composants lourds chargés dynamiquement

**2. Cache intelligent (TanStack Query)**

- Cache automatique des requêtes
- Réutilisation des données entre composants
- Stale time configuré pour réduire les appels API

**3. Optimisations React**

- `React.memo` pour les composants coûteux
- `useMemo` et `useCallback` pour éviter les recalculs
