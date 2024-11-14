import { getClientsBd, getClientsDistributorsBd, getClientsCredentialsBd } from '../models/clients.model'
export const getClientsDistributors = async (req, res) => {
    try {
        const resp = await getClientsDistributorsBd(req.params.id)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("No se han encontrado clientes")
        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        res.status(404).json("Error al realizar la consulta de clientes.")
        console.log(error)

    }
}

export const getClients = async (req, res) => {
    try {
        const resp = await getClientsBd()
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("No se han encontrado clientes")
        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("Error al realizar la consulta de clientes.")
    }

}

export const getClientsCredentials = async (req, res) => {
    try {
        const resp = await getClientsCredentialsBd(req.body)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(404).json("No se han encontrado clientes")
        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("Error al realizar la consulta de de credenciales.")
    }
}

