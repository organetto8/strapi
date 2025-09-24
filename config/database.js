// config/database.js
module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'sqlite');
  
    if (client === 'sqlite') {
      return {
        connection: {
          client: 'sqlite',
          connection: {
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
          },
          useNullAsDefault: true,
        },
      };
    }
  
    // Se c'è DATABASE_URL (Railway prod)
    if (env('DATABASE_URL')) {
      return {
        connection: {
          client: 'postgres',
          connection: {
            connectionString: env('DATABASE_URL'),
            ssl: env.bool('DATABASE_SSL', true)
              ? { rejectUnauthorized: false }
              : false,
          },
          pool: { min: 0, max: 7 },
        },
      };
    }
  
    // Se ci sono variabili separate (locale dev)
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
        pool: { min: 0, max: 7 },
      },
    };
  };