# GeriApp 1.6.0 Stable

Tato verze obsahuje:
- Opravený `UserContext` a obalení celé aplikace
- Vyčištěné hooky a importy
- Odstranění chyb v `Sidebar`, `PWAInstallButton` a `serviceWorkerRegistration`
- Odebrání závislosti na `husky` (fix pro Vercel build)
- Zavedení ESLint + Prettier
- Přidání základních testů pomocí Jest a React Testing Library

## Spuštění

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Testy

```bash
npm test
```
