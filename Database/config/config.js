module.exports = {
development:  {
    username:"postgres",
    password:"postgres",
    database:"postgres",
    host:"127.0.0.1",
    port:"5432",
    dialect:"postgres",
    logging:false
  },
  test:{
    username:"postgres",
    password:"postgres",
    database:"postgres",
    host:"127.0.0.1",
    port:"5432",
    dialect:"postgres",
    logging:false
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: "postgres"
  }

}
