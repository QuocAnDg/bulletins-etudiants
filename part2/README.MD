# Partie 2 : Bulletins ECTS & Rapport d’anomalies

## Objectif
1. Se connecter à l’API : `https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/api`
2. Générer un bulletin par étudiant et par année, incluant :
   - Moyennes pondérées
   - Crédits totaux et obtenus
   - Statut de réussite
   - Détails des cours suivis
3. Générer un rapport d’anomalies pour le contrôle qualité.

---

## Technologies principales
- **JavaScript (Node.js)**  
- **JavaScript**  
- **Axios**  


---

## Installation & Lancement

```bash
# Installer les dépendances
npm install   

# Lancer le script
npm start
``` 
### Output

Les rapports sont des fichiers JSON qui ont été générés dans le dossier /output, situé à la racine du projet.
- bulletins.json
- anomalies.json