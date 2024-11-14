import { Client } from 'pg'
require('dotenv').config();

export const connectionData = {
    user: process.env.USER_BD,
    host: process.env.HOST,
    database:  process.env.DATABASE,
    password:  process.env.PASS,
    port:  process.env.PORT
}

export const connectionDataUbm = {
    user: process.env.UBM_USER,
    host: process.env.UBM_HOST,
    database: process.env.UBM_DATABASE,
    password: process.env.UBM_PASS,
    port: process.env.UBM_PORT
}


export const client = new Client(connectionData);
export const clientUbm=new Client(connectionDataUbm) 

/* /*  console.log(connectionData)
  client.connect()
 .then(db=>console.log("db is connected"))  */

/*   console.log(connectionDataUbm)
 clientUbm.connect()
 .then(db=>console.log("db ubm is connected"))  */  


/* export const clientUbm = new Client(connectionDataUbm) */




