# LightFlix

Documentation pour le projet.
L'architecture du projet est (pas encore) dans `ARCHITECTURE.md`


## Pour run le projet

```
npm i -g yarn
yarn install
```

## Pour le api key

Ensuite, créer un fichier dans le root du projet intitulé `.env.local`

Dans ce fichier, ajouter `NEXT_PUBLIC_TMDB_API_KEY=<<API_KEY>>` (sans quotes, comme `NEXT_PUBLIC_TMDB_API_KEY=123abc`)

## Pour démarrer

```
yarn dev
```
## Issues

Si jamais webpack throw une erreur concernant le casing lors du bundling au run time, et que le path dans lequel le repo a été cloné passe par le desktop, essayer de voir si le D de desktop est en majuscule. Si ce n'est pas le cas, faire le changement.

> Enjoy le bootleg Netflix