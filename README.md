## Exercice refacto de code

### Installer le projet

Créez votre fichier d’environnement `.env` en copiant le fichier `.env.example`, puis renseignez-y vos données confidentielles pour vous connecter à votre base de données

```bash
git clone git@github.com:simplon-grenoble-cda-juin/exo_refacto.git
cd exo_refacto
npm install
npm run build:all
npm run dev
```

ℹ️ Assurez-vous d'avoir une base de données Postgresql `library` avec tables et données. Le script `/library.sql` est à votre disposition.

## Vos tickets

### N°55874 – Refacto légère n°1
**Consigne** : Dans le fichier `DTO/Cart.ts`, mutualiser les méthodes `addBook`, `addTicket` et `addArtwork` en une seule méthode.
___

### N°55875 – Refacto légère n°2
**Consigne** : Dans le fichier `DTO/Cart.ts`, mutualiser les méthodes `getBooksCount`, `getTicketsCount` et `getArtworksCount` en une seule méthode.
___

### N°55876 – Refacto moyenne
**Consigne** : Dans le fichier `DTO/Cart.ts`, mutualiser les méthodes `findBookByTitle`, `findTicketByTitle` et `findArtworkByTitle` en une seule méthode.
___

### N°55877 – Refacto du collègue
**Consigne** : Dans le fichier `DTO/Cart.ts`, un collègue a créé une méthode complexe pour calculer le panier d’un client. Celle-ci mériterait d’être découpée afin d’isoler chaque partie du traitement dans des méthodes distinctes, ce qui améliorerait la maintenabilité et la compréhension du code pour l’ensemble de l’équipe.
