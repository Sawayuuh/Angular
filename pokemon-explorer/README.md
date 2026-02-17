# Pokédex Angular — TP Examen JavaScript et Framework

## Membres du groupe

- **Ozturk Natael**
- **Nizar Sarah**

---

## API sélectionnée

**PokéAPI** — API publique et gratuite dédiée aux données Pokémon.

- Documentation : https://pokeapi.co/docs/v2
- URL de base : `https://pokeapi.co/api/v2`
- Aucune clé d'authentification requise
- Aucune règle de lancement particulière (API publique, accessible directement)

### Endpoints utilisés

| Endpoint | Description |
|---|---|
| `GET /pokemon?limit=151` | Récupère la liste des 151 premiers Pokémon |
| `GET /pokemon/{name}` | Récupère le détail d'un Pokémon par son nom |

---

## Lancement du projet

### Prérequis

- Node.js >= 18
- Angular CLI >= 18

### Installation et démarrage

```bash
npm install
ng serve
```

L'application est ensuite accessible sur `http://localhost:4200`.

### Build production

```bash
ng build
```

---

## Fonctionnalités du projet

- **Page d'accueil** : affichage de la liste des 151 Pokémon de la première génération avec sprite, numéro et nom
- **Recherche** : formulaire réactif permettant de filtrer les Pokémon par nom, avec validation (minimum 2 caractères) et message d'erreur
- **Page détail** : fiche complète d'un Pokémon (types, taille, poids, statistiques, capacités)
- **Gestion des états** : indicateur de chargement, message d'erreur et bouton de retry en cas d'échec de l'API
- **Routing** : navigation entre les pages avec route dédiée à la page 404
- **Guard** : protection de la route détail pour empêcher l'accès avec un nom vide

---

## Architecture du projet

```
src/app/
├── interfaces/       → Types TypeScript (IPokemon, IPokemonList, ...)
├── enums/            → LoadState (IDLE, LOADING, SUCCESS, ERROR)
├── services/         → PokemonService (appels HTTP)
├── guards/           → pokemonGuard (protection de route)
├── components/
│   └── pokemon-card/ → Composant réutilisable carte Pokémon
└── pages/
    ├── home/         → Liste + formulaire de recherche
    ├── pokemon-detail/ → Fiche détaillée d'un Pokémon
    └── not-found/    → Page 404
```

---

## Axes d'amélioration possibles

- Pagination pour charger les générations suivantes (Gen 2, 3, ...)
- Filtre par type de Pokémon (Feu, Eau, Plante...)
- Affichage du sprite shiny au survol
- Comparaison de deux Pokémon côte à côte
