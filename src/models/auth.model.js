import * as bd from '../database'
import { Client } from 'pg'

export const signInBd = async (email,pass) => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const queryOne = "select * from user_login where email='" + email + "'";
        await client.connect()
        resp = await client.query(queryOne);
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.end()
        return resp;
    }

}


