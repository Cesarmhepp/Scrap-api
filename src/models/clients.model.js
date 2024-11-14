import * as bd from '../database'
import { Client } from 'pg'

export const getClientsBd = async () => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const query = "select * from clients"
        await client.connect()
        resp = await client.query(query)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.end()
        return resp
    }
}

export const getClientsDistributorsBd = async (id) => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        const query = "select cl.name as client_name,d.name as distributor,d.id as d_id, st.name as service_type,d.has_scrap,d.has_parser from clients cl inner join clients_distributors cd on cd.fk_client_id=cl.id inner join distributors d on cd.fk_distributor_id=d.id inner join service_type st on st.id=fk_service_type where cl.id=" + id
        await client.connect()
        resp = await client.query(query)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.end()
        return resp
    }

}

export const getClientsCredentialsBd = async (body) => {
    const { client_name, dx_name } = body
    const client = new Client(bd.connectionDataUbm)
    let resp;
    try {
        const query = "select c.id as c_id,c.user_dni1,c.user_dni2,c.password,d.id as d_name,d.name as d_name,c.name as c_name from " + client_name.replaceAll(/\s/g, '') + ".credentials c inner join " + client_name.replaceAll(/\s/g, '') + ".distributors d on d.id=c.distributor_id where d.name='" + dx_name.toUpperCase() + "'";
        await client.connect()
        resp = await client.query(query)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.end()
        return resp
    }
}