# 🚂 Railway Deployment Setup

## ISTRUZIONI CRITICHE PER RAILWAY

### 1. Variabili d'Ambiente Railway

Nel pannello Railway, vai su **Environment Variables** e assicurati di avere TUTTE queste variabili:

```bash
# ⚠️ CRITICO: Questa variabile DEVE essere presente!
DATABASE_CLIENT=postgres

# Strapi Configuration
HOST=::
PORT=1337
NODE_ENV=production
STRAPI_DISABLE_UPDATE_NOTIFICATION=true
STRAPI_TELEMETRY_DISABLED=true
BROWSER=false
URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

# Security Keys (MANTIENI QUELLI CHE HAI GIÀ)
ADMIN_JWT_SECRET=dai2sao92uz7w81duhua2sid5i00do94
API_TOKEN_SALT=uma03wuzajejkukaf56nr8sj5bjdfh08
APP_KEYS=idl3wxc1lvvzkbb00121worcj0o14o4o
JWT_SECRET=p83d3ol5xy0j9xmjvoxonc8kgkeoubv3
TRANSFER_TOKEN_SALT=cv5p0om97t1xpzwq0nkaax1jzkl12rgf

# Database Configuration (Railway PostgreSQL)
# IMPORTANTE: Usa le variabili PostgreSQL dirette, non template annidate!
DATABASE_URL=postgresql://${{POSTGRES_USER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{POSTGRES_DB}}
DATABASE_PUBLIC_URL=postgresql://${{POSTGRES_USER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}/${{POSTGRES_DB}}
DATABASE_HOST=${{RAILWAY_PRIVATE_DOMAIN}}
DATABASE_PORT=5432
DATABASE_NAME=${{POSTGRES_DB}}
DATABASE_USERNAME=${{POSTGRES_USER}}
DATABASE_PASSWORD=${{POSTGRES_PASSWORD}}
DATABASE_SSL=true

# Variabili PostgreSQL native (Railway le crea automaticamente)
POSTGRES_DB=${{POSTGRES_DB}}
POSTGRES_USER=${{POSTGRES_USER}}
POSTGRES_PASSWORD=${{POSTGRES_PASSWORD}}
PGHOST=${{RAILWAY_PRIVATE_DOMAIN}}
PGPORT=5432
PGUSER=${{POSTGRES_USER}}
PGPASSWORD=${{POSTGRES_PASSWORD}}
PGDATABASE=${{POSTGRES_DB}}
```

### 2. Servizi Railway Necessari

Assicurati di avere questi servizi nel tuo progetto Railway:

1. **PostgreSQL Database** - Deve essere collegato al tuo progetto
2. **Web Service** - Il tuo codice Strapi

### 3. Build Command

Nel pannello Railway, imposta:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 4. Checklist Pre-Deploy

- [ ] PostgreSQL service è attivo e collegato
- [ ] Tutte le variabili d'ambiente sono impostate
- [ ] `DATABASE_CLIENT=postgres` è presente
- [ ] Le template variables `${{Postgres.*}}` sono configurate
- [ ] Il codice è pushato su Git

### 5. Debug

Se non funziona, controlla i logs Railway per questi messaggi:
- `🔍 Database client: postgres` ✅
- `🔍 DATABASE_URL exists: true` ✅
- `🚂 Railway DATABASE_URL detected` ✅

Se vedi `🔍 Database client: sqlite` ❌ significa che manca `DATABASE_CLIENT=postgres`!

### 6. Comandi Utili

```bash
# Test locale con PostgreSQL
npm run develop

# Build per produzione
npm run build

# Start produzione
npm start
```

## 🆘 Troubleshooting

### Errore: "Client does not support authentication protocol"
- Assicurati che `DATABASE_SSL=true`
- Verifica che Railway PostgreSQL sia configurato correttamente

### Errore: "Connection refused"
- Controlla che il servizio PostgreSQL sia attivo
- Verifica le template variables `${{Postgres.*}}`

### Errore: "Using SQLite in production"
- Aggiungi `DATABASE_CLIENT=postgres` nelle variabili d'ambiente
- Verifica che `NODE_ENV=production`
