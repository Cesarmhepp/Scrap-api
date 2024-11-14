import * as bd from '../database'
import { Client } from 'pg';
import { getDistributorsBd, getDistributorsClientsBd, updateDistributorBd, deleteDistributorsBd, createDistributorBd } from '../models/distributors.model';

export const getDistributors = async (req, res) => {
    try {
        const resp = await getDistributorsBd()
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("No se han encontrado distribuidores.")
        }
        else {
            res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
    } catch (err) {
        res.status(404).json("Error al realizar la consulta de distribuidores.")
        console.log(err)
    }

}

export const getDistributorsClients = async (req, res) => {
    try {
        const resp = await getDistributorsClientsBd()
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
        else {
            res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
    } catch (err) {
        console.log(err)
        res.status(404).json("Error al buscar las distribuidoras segun distribuidores")
    }


}

export const updateDistributor = async (req, res) => {
    
    try {
        const resp = await updateDistributorBd(req)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
        else {
            res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
    } catch (err) {
        console.log(err);
        res.status(400).json("Ha ocurrido un error en modificar la distribuidora")
    }


}

export const deleteDistributors = async (req, res) => {
    try {
        const resp = await deleteDistributorsBd(req.params.id)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
        else {
            res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
    } catch (err) {
        console.log(err)
        res.status(400).json("Ha ocurrido un error al eliminar el distribuidor")
    }
}

export const createDistributor = async (req, res) => {
    try {
        const resp = await createDistributorBd(req)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
        else {
            res.status(404).json("Error al realizar la consulta de distribuidores.")
        }
    } catch (err) {
        console.log(err)
        res.status(400).json("Ha ocurrido un error al crear la distribuidora")
    }
}

