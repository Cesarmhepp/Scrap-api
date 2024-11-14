import jwt from 'jsonwebtoken'
import config from '../config'
import * as bd from '../database'
import { Client } from 'pg'
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json("no token provided")

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json("No autorizado")
    }
}

export const isAdmin = async (req, res, next) => {
    const client = new Client(bd.connectionData)
    try {
        const userTypeSql = "select u.id,u.email,u.username,t.id,t.type_name from user_login u" +
            " inner join user_type t on u.fk_user_type=t.id where u.id=" + req.userId;
        await client.connect()
        const user = await client.query(userTypeSql)
        if (user.rows[0].type_name === "ADMIN") {
            next()
        }
        else {
            return res.status(403).json("Require Admin Role")
        }
    } catch (err) {
        console.log(err)
    } finally {
        await client.end()
    }



}

export const verifyPreToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "no token provided" })
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        return res.status(200).json({
            msg: "Autorizado",
            user: { username: decoded.username, email: decoded.email }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json("No autorizado")
    }
}

export const preFlight = (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://52.90.64.111/"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
}

