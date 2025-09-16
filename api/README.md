# Partie 1 : API de consultation des données

## Objectif
Créer des endpoints permettant d’interroger la base de données.

---


## Technologies principales utilisées

- **JavaScript (Node.js)** 
- **Express.js** 
- **SQLite3** 

---
## Installation & Lancement

```bash
# Installer les dépendances
npm install  

# Lancer le serveur
npm start
```
---
## Endpoints disponibles

### Cours

| Méthode | Endpoint             | Description                     |
|---------|----------------------|---------------------------------|
| GET     | `/cours`             | Lister tous les cours           |
| GET     | `/cours/:mnemonique` | Récupérer un cours par code     |
| POST    | `/cours`             | Ajouter un nouveau cours        |
| DELETE  | `/cours/:mnemonique` | Supprimer un cours              |

---

### Inscriptions

| Méthode | Endpoint                         | Description                                   |
|---------|----------------------------------|-----------------------------------------------|
| GET     | `/inscriptions`                  | Lister toutes les inscriptions                |
| GET     | `/inscriptions/:matricule`       | Récupérer une inscription par matricule       |
| POST    | `/inscriptions`                  | Ajouter une nouvelle inscription              |
| DELETE  | `/inscriptions/:matricule`       | Supprimer une inscription                     |
| POST    | `/inscriptions/:matricule/cours` | Ajouter un cours à une personne inscrite      |

---

### Notes

| Méthode | Endpoint       | Description                  |
|---------|----------------|------------------------------|
| GET     | `/notes`       | Lister toutes les notes      |
| GET     | `/notes/:id`   | Récupérer une note par ID    |
| POST    | `/notes`       | Ajouter une nouvelle note    |
| DELETE  | `/notes/:id`   | Supprimer une note par ID    |

---