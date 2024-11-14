import * as bd from "../database"
import { Client } from 'pg'

export const verifyDuplicateUser = async (req, res, next) => {
    const client = new Client(bd.connectionData)

    try {
        await client.connect()
        const user = await client.query("select * from user_login where email='" + req.body.email + "'")
        if (user.rows != 0) {
            return res.status(400).json("El usuario ya existe")
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
    }
    finally {
        await client.end()
    }



}