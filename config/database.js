// config/database.js
module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'sqlite');
    
    console.log('🔍 Database client:', client);
    console.log('🔍 DATABASE_URL exists:', !!env('DATABASE_URL'));
    console.log('🔍 DATABASE_URL value:', env('DATABASE_URL'));
    console.log('🔍 NODE_ENV:', env('NODE_ENV'));
    console.log('🔍 DATABASE_HOST:', env('DATABASE_HOST'));
    console.log('🔍 RAILWAY_PRIVATE_DOMAIN:', env('RAILWAY_PRIVATE_DOMAIN'));
  
    // Force PostgreSQL in production or when DATABASE_CLIENT is postgres
    if (client === 'postgres' || env('NODE_ENV') === 'production' || env('DATABASE_URL')) {
      console.log('🐘 Using PostgreSQL configuration');
      
      // Railway production - prova prima con variabili separate
      if (env('DATABASE_HOST') && env('DATABASE_NAME') && env('DATABASE_USERNAME') && env('DATABASE_PASSWORD')) {
        console.log('🚂 Railway separate variables detected');
        console.log('🔧 Host:', env('DATABASE_HOST'));
        console.log('🔧 Port:', env('DATABASE_PORT'));
        console.log('🔧 Database:', env('DATABASE_NAME'));
        console.log('🔧 User:', env('DATABASE_USERNAME'));
        
        return {
          connection: {
            client: 'postgres',
            connection: {
              host: env('DATABASE_HOST'),
              port: env.int('DATABASE_PORT', 5432),
              database: env('DATABASE_NAME'),
              user: env('DATABASE_USERNAME'),
              password: env('DATABASE_PASSWORD'),
              ssl: env.bool('DATABASE_SSL', true)
                ? { 
                    rejectUnauthorized: false,
                    ca: false,
                    key: false,
                    cert: false
                  }
                : false,
            },
            pool: { 
              min: env.int('DATABASE_POOL_MIN', 0), 
              max: env.int('DATABASE_POOL_MAX', 10),
              acquireTimeoutMillis: 60000,
              createTimeoutMillis: 30000,
              destroyTimeoutMillis: 5000,
              idleTimeoutMillis: 30000,
              reapIntervalMillis: 1000,
              createRetryIntervalMillis: 100,
            },
            debug: env.bool('DATABASE_DEBUG', false),
          },
        };
      }
      
      // Fallback to DATABASE_URL if separate variables not available
      if (env('DATABASE_URL')) {
        console.log('🚂 Railway DATABASE_URL detected (fallback)');
        return {
          connection: {
            client: 'postgres',
            connection: {
              connectionString: env('DATABASE_URL'),
              ssl: env.bool('DATABASE_SSL', true)
                ? { 
                    rejectUnauthorized: false,
                    ca: false,
                    key: false,
                    cert: false
                  }
                : false,
            },
            pool: { 
              min: env.int('DATABASE_POOL_MIN', 0), 
              max: env.int('DATABASE_POOL_MAX', 10),
              acquireTimeoutMillis: 60000,
              createTimeoutMillis: 30000,
              destroyTimeoutMillis: 5000,
              idleTimeoutMillis: 30000,
              reapIntervalMillis: 1000,
              createRetryIntervalMillis: 100,
            },
            debug: env.bool('DATABASE_DEBUG', false),
          },
        };
      }
      
      // Separate database variables (local dev or other hosting)
      console.log('🔧 Using separate database variables');
      return {
        connection: {
          client: 'postgres',
          connection: {
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: env.bool('DATABASE_SSL', false)
              ? { rejectUnauthorized: false }
              : false,
          },
          pool: { 
            min: env.int('DATABASE_POOL_MIN', 0), 
            max: env.int('DATABASE_POOL_MAX', 10) 
          },
          debug: env.bool('DATABASE_DEBUG', false),
        },
      };
    }
    
    // SQLite fallback (only for local development)
    console.log('💾 Using SQLite configuration');
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        useNullAsDefault: true,
      },
    };
  };