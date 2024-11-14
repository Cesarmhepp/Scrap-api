import * as dc from '../models/clientsDistributors.model'

export const addClientDistributor = async (req, res) => {
    try {

        const resp = await dc.addClientDistributorBd(req.body)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json("Asignacion creada correctamente.")
                : res.status(404).json("Error al asignar la relacion.")
        }
        else {
            res.status(404).json("Error al asignar la relacion")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("Error al asignar la relacion")
    }

}

export const deleteClientDistributor = async (req, res) => {

    try {
        const resp = await dc.deleteClientDistributorBd(req.body)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json("Asignacion eliminada correctamente.")
                : res.status(404).json("Error al asignar la relacion.")
        }
        else {
            res.status(404).json("Error al asignar la relacion")
        }
    } catch (error) {
        console.log(err)
        res.status(404).json("Error al asignar la relacion")
    }

}

