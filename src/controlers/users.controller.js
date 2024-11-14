import * as users from '../models/users.model'
export const createUser = async (req, res) => {
    try {
        const resp = await users.createUserbD(req.body)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json("Se ha creado el usuario correctamente.")
                : res.status(404).json("No se han encontrado clientes")
        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        console.log(error)
        res.status(404).json("Error al crear el usuario")

    }

}

export const getUsers = async (req, res) => {
    try {
        const resp = await users.getUsersBd()
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
        res.status(404).json("Error al realizar la consulta. intente mas tarde")
    }

}

export const getUserById = async (req, res) => {

    try {
        const resp = await users.getUserByIdBd(req.params.userid)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json(resp.rows)
                : res.status(200).json("Usuario no encontrado.")

        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        res.status(404).json("Error al buscar el usuario")
    }
}

export const updateUserById = async (req, res) => {
    try {
        const resp = await users.updateUserByIdBd(req)
        if (resp) {
            resp.rowCount !== 0
                ? res.status(200).json("Usuario Actualizado.")
                : res.status(200).json("Usuario no encontrado.")

        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (error) {
        res.status(200).json("El usuario a modificar no existe")
    }


}

export const deleteUserById = async (req, res) => {
    try {
        let resp
        resp = await users.deleteUserByIdBd(req.params.userid)
        if (resp) {
            resp.rowCount === 1
                ? res.status(200).json("Usuario Eliminado.")
                : res.status(200).json("Usuario no encontrado.")

        }
        else {
            res.status(404).json("Error al realizar la consulta de clientes.")
        }
    } catch (err) {
        console.log(err);
        res.status(404).json("Ha ocurrido un error en la consulta")
    }
}
