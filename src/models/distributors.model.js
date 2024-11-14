import * as bd from '../database'
import { Client } from 'pg';

export const getDistributorsBd = async () => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        client.connect()
        const query = "select d.id as d_id,d.name as d_name,st.name as st_type,st.id as st_id ,d.credentials as d_credentials,d.max_bill,d.has_scrap,d.has_parser from distributors d inner join service_type st on st.id=d.fk_service_type;"
        resp = await client.query(query)
    } catch (err) {
        console.log(err)
    }
    finally {
        client.end()
        return resp
    }
}

export const getDistributorsClientsBd = async () => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        const query = "select d.id as d_id,d.name as d_name,d.max_bill,cl.id as cl_id,cl.name as cl_name,st.name as st_name from distributors d inner join clients_distributors cd on d.id=fk_distributor_id inner join clients cl on cd.fk_client_id=cl.id inner join service_type st on d.fk_service_type=st.id";
        client.connect()
        resp = await client.query(query)
    } catch (err) {
        console.log(err)
    }
    finally {
        client.end()
        return resp
    }

}

export const updateDistributorBd = async (req) => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        const { name, credentials, max_bill, has_scrap, has_parser, fk_service_type } = req.body
        const query = "update distributors set name='" + name + "',credentials=" + credentials + ",max_bill=" + max_bill + ",has_scrap=" + has_scrap + ",has_parser=" + has_parser + ",fk_service_type=" + fk_service_type + " where id=" + req.params.id;
        client.connect()
        resp = await client.query(query)
    } catch (err) {
        console.log(err);
    }
    finally {
        client.end()
        return resp
    }

}

export const deleteDistributorsBd = async (id) => {
    const client = new Client(bd.connectionData)
    let resp
    try {
        const query = "delete from distributors where id=" + id
        client.connect()
        resp = await client.query(query)
    } catch (err) {
        client.end()
        console.log(err)
    }
    finally {
        client.end()
        return resp
    }

}

export const createDistributorBd = async (req) => {
    const client = new Client(bd.connectionData)
    let resp;
    try {
        const { name, credentials, max_bill, has_scrap, has_parser, fk_service_type } = req.body
        const query = "insert into distributors (name,fk_service_type,credentials,max_bill,has_scrap,has_parser) " +
            "values('" + name + "'," + fk_service_type + "," + credentials + "," + max_bill + "," + has_scrap + "," + has_parser + ");"
        client.connect()
        resp = await client.query(query)
    } catch (err) {
        console.log(err)
    }
    finally {
        client.end()
        return resp
    }
}