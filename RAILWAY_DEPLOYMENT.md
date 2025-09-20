# Railway Deployment Guide

## Configurazione completata

Il progetto è stato convertito da Yarn a npm per essere compatibile con Railway. Le seguenti modificazioni sono state apportate:

### Modifiche effettuate:

1. **Rimosso yarn.lock** - Eliminato per evitare conflitti con npm
2. **Aggiornato package.json** - Rimossa dipendenza yarn e allineate tutte le versioni Strapi a 5.23.6
3. **Creato .nvmrc** - Specifica Node.js 20.18.1 per compatibilità con le dipendenze
4. **Aggiornato engines** - Richiede Node.js >= 20.18.1 per risolvere il problema con cheerio
5. **Configurato railway.json** - Specifica npm come package manager

### File di configurazione:

- `.nvmrc`: Specifica la versione Node.js 20.18.1
- `railway.json`: Configurazione Railway con npm
- `package.json`: Tutte le dipendenze Strapi allineate alla versione 5.23.6

## Deployment su Railway

### Prerequisiti:
- Account Railway
- Repository Git collegato

### Passi per il deployment:

1. **Push del codice su Git**:
   ```bash
   git add .
   git commit -m "Convert from yarn to npm for Railway compatibility"
   git push
   ```

2. **Configurazione Railway**:
   - Collega il repository su Railway
   - Railway rileverà automaticamente che è un progetto Node.js
   - Userà npm install e npm start automaticamente

3. **Variabili d'ambiente necessarie**:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-database-url>
   APP_KEYS=<your-app-keys>
   API_TOKEN_SALT=<your-api-token-salt>
   ADMIN_JWT_SECRET=<your-admin-jwt-secret>
   TRANSFER_TOKEN_SALT=<your-transfer-token-salt>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Database**:
   - Il progetto è configurato per PostgreSQL (vedi `pg` nelle dipendenze)
   - Railway può fornire un database PostgreSQL automaticamente

### Comandi disponibili:
- `npm install` - Installa le dipendenze
- `npm run build` - Builda l'admin panel
- `npm start` - Avvia il server in produzione
- `npm run dev` - Avvia in modalità sviluppo

### Note importanti:
- La versione Node.js 20.18.1+ è richiesta
- Tutte le dipendenze Strapi sono allineate alla versione 5.23.6
- Il progetto ora usa npm invece di yarn per evitare conflitti
