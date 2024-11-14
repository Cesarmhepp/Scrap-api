import * as bd from '../database'
import { Client } from 'pg'

export const addClientDistributorBd = async (body) => {

    const client = new Client(bd.connectionData)
    let resp
    try {
        const { d_id, c_id } = body
        const query = "insert into clients_distributors(fk_client_id,fk_distributor_id) values(" + c_id + "," + d_id + ");"
        await client.connect()
        resp = await client.query(query)
    } catch (error) {
        console.log(error)
    }
    finally { client.end(); return resp }

}

export const deleteClientDistributorBd = async (body) => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const { d_id, c_id } = body
        const query = "delete from clients_distributors where fk_client_id=" + c_id + " and fk_distributor_id=" + d_id + ";"
        await client.connect()
        resp = await client.query(query)
    } catch (error) {
        console.log(err)
    }
    finally {
        client.end()
        return resp;
    }

}

