//import Scrapinit from '/home/cesar/scrapers/index.js'
import jwt from 'jsonwebtoken'
import config from '../config'
import { fork } from 'child_process'
import { listProcess } from './process.controller'
import * as sa from '../models/serviceAccounts.model';

export const getClientsNumbers = async (req, res) => {
    const childProcess = fork("/home/" + process.env.USER_LINUX + "/scrapers-nodejs/index.js")
    try {
        const { client, distributor, lastBills, credentials, invoicesToDownload, c_id } = req.body
        const resp = await sa.getClientsNumbersBd(client, distributor, invoicesToDownload, c_id)

        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, config.SECRET)

        if (resp.respQuery.rowCount === 0) {
            res.status(404).json("No se han encontrado numeros de clientes asociados.")
        }
        else {
            childProcess.send(
                {
                    "client": client,
                    "distributor": distributor,
                    "clientNumbersList": resp.respQuery.rows,
                    "lastBills": lastBills,
                    "credentials": credentials,
                    "username": decoded.username,
                    "firstDate": resp.firstDate,
                    "lastDate": resp.lastDate
                })
            childProcess.on("message", message => {
                if (message.r_msg === 'Distribuidora no disponible para Scrapear') {
                    res.status(400).json(message.r_msg)
                }
                else {
                    res.status(200).json(message)
                    listProcess.push(message)
                }
            })
        }


    } catch (error) {
        res.status(404).json("Ha ocurrido un error al iniciar el scraper")
        console.log(error)
    }
}

export const getClientsNumbersByCredentials = async (req, res) => {
    try {
        const resp = await sa.getClientsNumbersByCredentialsBd(req.body)

        if (resp) {
            resp.rowCount === 0
                ? res.status(404).json("No se han encontrado numeros de clientes asociados.")
                : res.status(200).json(resp)
        }
        else {
            res.status(404).json("No se han encontrado numeros de clientes asociados.")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("No se han encontrado numeros de clientes asociados.")
    }
}

export const getMissingClientsNumbers = async (req, res) => {
    try {
        const resp = await sa.getMissingClientsNumbersBd(req.body)
        if (resp) {
            resp.rowCount === 0
                ? res.status(404).json("No se han encontrado numeros de clientes asociados.")
                : res.status(200).json(resp)
        }
        else {
            res.status(404).json("No se han encontrado numeros de clientes asociados.")
        }
    } catch (err) {
        console.log(err);
        res.status(404).json("No se han encontrado numeros de clientes asociados.");
    }
}

export const getClientsNumbersGeneral = async (req, res) => {
    try {
        const { client, distributor } = req.body
        const resp = await sa.getClientsNumbersBd(client, distributor, null, null)

        if (resp) {
            resp.rowCount === 0
                ? res.status(404).json("No se han encontrado numeros de cliente asociados.")
                : res.status(200).json(resp.respQuery)
        }
    } catch (e) {
        console.log(e)
        res.status(404).json("No se han encontrado numeros de cliente asociados.")
    }

}




