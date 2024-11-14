import * as bd from '../database'
import bcrypt from 'bcryptjs'
import { Client } from 'pg'

export const createUserbD = async (body, hash) => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const { email, pass, username, fk_user_type } = body
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(pass, salt);
        client.connect()
        const sql = "insert into user_login(email,pass,username,fk_user_type) values('" + email + "','" + hash + "','" + username + "'," + fk_user_type + ")"
        resp = await client.query(sql)
    } catch (error) {
        console.log(error)
    } finally {
        client.end()
        return resp
    }

}

export const getUsersBd = async () => {
    let resp;
    const client = new Client(bd.connectionData)
    await client.connect()
    try {
        const sql = "select u.id, u.username,u.email,u.create_at,ut.type_name from user_login u inner join user_type ut on u.fk_user_type=ut.id order by u.id ASC";
        resp = await client.query(sql);
    } catch (error) {
        console.log(error)
    }
    finally {
        client.end()
        return resp
    }

}

export const getUserByIdBd = async (id) => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        client.connect()
        resp = await client.query("select * from user_login where id=" + id)
    } catch (error) {
        console.log(error)
    }
    finally {
        client.end()
        return resp
    }
}

export const updateUserByIdBd = async (req) => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const { email, pass, username, fk_user_type } = req.body
        let salt = bcrypt.genSaltSync(10);
        let hash;
        if (pass !== undefined || pass!=='') {
            hash = bcrypt.hashSync(pass, salt);
        }
        const sqlWithoutPass = "update user_login set email='" + email + "', username='" + username + "', fk_user_type=" + fk_user_type + " where id=" + req.params.userid
        const sqlWithPass = "update user_login set email='" + email + "', pass='" + hash + "', username='" + username + "', fk_user_type=" + fk_user_type + " where id=" + req.params.userid
        await client.connect()
        resp = await client.query(pass === undefined || pass === '' ? sqlWithoutPass : sqlWithPass)

    } catch (error) {
        console.log(error)
    }
    finally {
        await client.end()
        return resp
    }


}

export const deleteUserByIdBd = async (id) => {
    const client = new Client(bd.connectionData)
    let resp2
    try {
        const sql = "delete from user_login where id=" + id
        const sqlValidate = "select * from user_login where id=" + id
        await client.connect()
        const resp = await client.query(sqlValidate)
        if (resp.rowCount !== 0) {
            resp2 = await client.query(sql)
        }
    } catch (err) {
        console.log(err);
    }
    finally {
        await client.end()
        return resp2
    }
}
