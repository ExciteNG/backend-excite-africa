module.exports = {
"development":  {
    "username":"postgres",
    "password":"postgres",
    "database":"postgres",
    "host":"127.0.0.1",
    "port":"5432",
    "dialect":"postgres",
    "logging":false
  },
  "test":{
    "username":"postgres",
    "password":"postgres",
    "database":"postgres",
    "host":"127.0.0.1",
    "port":"5432",
    "dialect":"postgres",
    "logging":false
  },
  "production": {
    "use_env_variable": "postgres://yspwdafvwniobd:8b34a48902f9fe06f0dbb4ad09421140b5d67f5c1d65b994987f836c0668e9d7@ec2-3-222-11-129.compute-1.amazonaws.com:5432/d27k83hqhjo247",
    "dialect": "postgres"
  }

}
