import { Client } from 'pg';
import * as bd from '../database'
import { formatDate } from '../js/formatDate';

export const getClientsNumbersBd = async (client, distributor, invoicesToDownload, c_id) => {
    const clientbd = new Client(bd.connectionDataUbm)
    const date = new Date()
    let query, firstDate, lastDate
    try {
        if (invoicesToDownload === true) {
            query = "select se.client_number,m.description, d.name from " + client + ".service_accounts se " +
                "inner join " + client + ".metrics m on m.service_account_id = se.id  " +
                "inner join " + client + ".distributors d on se.distributor_id = d.id " +
                "where d.name ='" + distributor.toUpperCase() + "' and m.description = 'opened' and se.dont_scrap=false and m.final_date IS NULL " +
                "and se.credential_id=" + c_id

        } else if (invoicesToDownload === false) {

            if (date.getDate() <= 10) {
                firstDate = formatDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
                lastDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 10));

            } else if (date.getDate() > 10) {
                firstDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
                lastDate = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 10));
            }
            query = "select s.client_number,d.name,m.description " +
                "FROM " + client + ".service_accounts s " +
                "inner join " + client + ".metrics m on s.id=m.service_account_id " +
                "inner join " + client + ".distributors d on s.distributor_id=d.id " +
                "inner join " + client + ".credentials cr on cr.id=s.credential_id " +
                "WHERE s.client_number NOT IN " +
                "(SELECT c.client_number FROM " + client + ".consumptions c WHERE c.document_date BETWEEN '" + firstDate + "' AND '" + lastDate + "')" +
                //"(SELECT c.client_number FROM " + client + ".consumptions c WHERE c.document_date BETWEEN '06-01-2022' AND '7-10-2022')" +
                "and s.dont_scrap=false and m.description='opened' AND m.final_date IS NULL " +
                // "and d.name='" + distributor.toUpperCase() + "' " +
                "and cr.id=" + c_id
        } else if (invoicesToDownload === null) {
            query = "select COUNT(se.id) from " + client + ".service_accounts se " +
                "inner join " + client + ".metrics m on m.service_account_id = se.id  " +
                "inner join " + client + ".distributors d on se.distributor_id = d.id " +
                "where d.name ='" + distributor.toUpperCase() + "' and m.description = 'opened' and m.final_date IS NULL ";
        }
        await clientbd.connect();
        const rows = await clientbd.query(query)
        const resp = {
            respQuery: rows,
            firstDate: firstDate,
            lastDate: lastDate
        }
        return resp
    } catch (error) {
        console.log(error)
    } finally {
        await clientbd.end()
    }
}

export const getClientsNumbersByCredentialsBd = async (body) => {
    const clientbd = new Client(bd.connectionDataUbm);
    let resp
    try {
        const { c_id, client, distributor } = body
        const query = "select se.client_number,m.description, d.name from " + client + ".service_accounts se " +
            "inner join " + client + ".metrics m on m.service_account_id = se.id  " +
            "inner join " + client + ".distributors d on se.distributor_id = d.id " +
            // "where d.name ='" + distributor.toUpperCase() +
            "where m.description ='opened' " +
            "and se.dont_scrap=false and m.final_date IS NULL " +
            "and se.credential_id=" + c_id

        await clientbd.connect()
        resp = await clientbd.query(query)
    } catch (error) {
        console.log(error)
    }
    finally {
        await clientbd.end()
        return resp
    }

}

export const getMissingClientsNumbersBd = async (body) => {
    const clientbd = new Client(bd.connectionDataUbm)
    let date = new Date()
    let firstDate, lastDate
    let resp;
    if (date.getDate() <= 10) {
        firstDate = formatDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        lastDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 10));

    } else if (date.getDate() > 10) {
        firstDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
        lastDate = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 10));
    }

    try {
        const { c_id, client, distributor } = body
        const query = "select s.client_number,d.name,m.description " +
            "FROM " + client + ".service_accounts s " +
            "inner join " + client + ".metrics m on s.id=m.service_account_id " +
            "inner join " + client + ".distributors d on s.distributor_id=d.id " +
            "inner join " + client + ".credentials cr on cr.id=s.credential_id " +
            "WHERE s.client_number NOT IN " +
            "(SELECT c.client_number FROM " + client + ".consumptions c " +
            "WHERE c.document_date BETWEEN '" + firstDate + "' AND '" + lastDate + "') " +
            //"(SELECT c.client_number FROM " + client + ".consumptions c WHERE c.document_date BETWEEN '06-01-2022' AND '7-10-2022')" +
            "and s.dont_scrap=false " +
            "and m.description='opened' " +
            "AND m.final_date IS NULL " +
            "and d.name='" + distributor.toUpperCase() + "' " +
            "and cr.id=" + c_id
        await clientbd.connect()
        resp = await clientbd.query(query);

    } catch (err) {
        console.log(err);
    } finally {
        clientbd.end()
        return resp
    }
}