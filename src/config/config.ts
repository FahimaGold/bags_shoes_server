interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres';
}

interface JWTConfig {
  secret: string;
}

interface AppConfig {
  dev: DBConfig;
  prod: DBConfig;
  jwt: JWTConfig;
}

export const config: AppConfig = {
  dev: {
    username: process.env.POSTGRES_USERNAME || 'postgres_user',
    password: process.env.POSTGRES_PASSWORD || 'secure_dev_password',
    database: process.env.POSTGRES_DATABASE || 'myapp_dev',
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
  },
  prod: {
    username: process.env.PROD_DB_USERNAME || '',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'myapp_prod',
    host: process.env.PROD_DB_HOST || '',
    dialect: 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_dev_secret',
  },
};
