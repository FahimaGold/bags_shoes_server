export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME || 'fahima',
    "password": process.env.POSTGRESS_PASSWORD || '123456',
    "database": process.env.POSTGRESS_DATABASE || 'fahimashop',
    "host": process.env.POSTGRESS_HOST || 'localhost',
    "dialect": "postgres"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "bags_shoes",
    "host": "",
    "dialect": "postgres"
  },
  "jwt":{
    "secret": process.env.JWT
  }
}