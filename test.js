const first = [].sort( () => Math.random() - 0.5)

const second = [1,2,3,4,5,6,7].sort( () => Math.random() - 0.5)

console.log(first)
console.log(second)



const generateRefCode = () =>{
    let possibleComboCode = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let  genCode = [];

    for (let i = 0; i<6; i++){
        genCode.push(possibleComboCode[Math.floor(possibleComboCode.length*Math.random())])
    }
    return genCode.join('')
}
console.log(generateRefCode())
// {
//     "full_name":  "John Doe",
//     "refcode":"1001",
//             "email": "jane@gmail.com",
//             "username":"emmy",
//                 "phone_no": "+2347081927814",
//                     "address": "lagos",
//                         "state_of_origin": "usa",
//                             "lga": "gra",
//                                 "means_of_id": "nin",
//                                     "passport": "zenn",
                                        //    "username":"emmy"
//                                         "password": "hello",
// }


// {
//     "full_name":  "Jane Doe",
//             "email": "jone@gmail.com",
//             "username":"emmii",
//                 "phone_no": "+2347081927814",
//                     "address": "lagos",
//                         "state_of_origin": "usa",
//                             "lga": "gra",
//                                 "means_of_id": "nin",
//                                     "passport": "zennww",
//                                         "password": "hello"
// }

// referralCodes.generate({
//     length: 8,
//     count: 1
// }).join('')


// "production": {
//     "username":"cewdcwdw",
//     "password":"C5M_klQSoZV25bgnoYONNas4rbKkd_bw",
//     "database":"cewdcwdw",
//     "host":"queenie.db.elephantsql.com",
//     "port":"5432",
//     "dialect":"postgres",
//     "pool": {
//       "max": 4,
//       "min": 0,
//       "acquire": 30000,
//       "idle": 10000
//     },
//     "dialectOptions": {
//       "ssl": { "require": true }
//     },
//     "logging":false

//   }

// "dialectOptions": {
//     "ssl":{"require": false}
//   },

// "production": {

//     "username":"postgres",
//     "password":"postgres",
//     "database":"postgres",
//     "host":"127.0.0.1",
//     "port":"5432",
//     "dialect":"postgres",
//     "logging":false
//   },
// "production": {
//     "use_env_variable": "postgres://yspwdafvwniobd:8b34a48902f9fe06f0dbb4ad09421140b5d67f5c1d65b994987f836c0668e9d7@ec2-3-222-11-129.compute-1.amazonaws.com:5432/d27k83hqhjo247",
//     "dialect": "postgres"
//   }


// { 
// development:  {
//     username:"postgres",
//     password: "postgres",
//     database:"postgres",
//     "host":"127.0.0.1",
//     "port":"5432",
//     "dialect":"postgres",
//     "logging":false
//   },
//   "test":{
//     "username":"postgres",
//     "password":"postgres",
//     "database":"postgres",
//     "host":"127.0.0.1",
//     "port":"5432",
//     "dialect":"postgres",
//     "logging":false
//   },
//   "production": {
//     "use_env_variable": "postgres://yspwdafvwniobd:8b34a48902f9fe06f0dbb4ad09421140b5d67f5c1d65b994987f836c0668e9d7@ec2-3-222-11-129.compute-1.amazonaws.com:5432/d27k83hqhjo247",
//     "dialect": "postgres"
//   }

// }

{
    development:{
        'username':'postgres',
        password:'postgres',

    }
}
