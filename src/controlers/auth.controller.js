import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'
import { signInBd } from '../models/auth.model'

export const signIn = async (req, res) => {
    try {
        const { email, pass } = req.body
        const resp = await signInBd(email, pass)
        if (resp.rowCount != 0) {
            const bol = bcrypt.compareSync(pass, resp.rows[0].pass)
            if (bol) {
                const token = jwt.sign({
                    id: resp.rows[0].id,
                    username: resp.rows[0].username,
                    email: resp.rows[0].email,
                    type: resp.rows[0].fk_user_type
                }, config.SECRET, {
                    expiresIn: 86400
                })
                res.status(200).json({
                    message: "success", token, user: {
                        username: resp.rows[0].username,
                        email: resp.rows[0].email,
                        type: resp.rows[0].fk_user_type
                    }
                })
            } else {
                res.status(404).json({ message: "El correo o la contraseña son incorrectos", token: null })
            }
        }
        else if (resp.rowCount === 0) {
            res.status(404).json({ message: "El usuario no existe" })
        }
    } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error al iniciar sesion" })
        console.log(error)
    }

}

export const signUp = (req, res) => { res.json("signup") }



