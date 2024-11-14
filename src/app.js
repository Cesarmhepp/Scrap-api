import express from "express";
import morgan from 'morgan'
import pkg from '../package.json'
import usersRoutes from './routes/user.routh'
import authRoutes from './routes/auth.routes'
import clientsRoutes from './routes/clients.routes'
import distributorsRoutes from './routes/distributors.routes'
import clientsdistributorsRoutes from './routes/clientsDistributors.routes'
import clientsNumberRoutes from './routes/clientsNumbers.routes'
import processRoutes from './routes/process.routes'
import cors from 'cors'

require('dotenv').config();

const app = express()



app.set('pkg', pkg);
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin: ['http://52.90.64.111', 'http://52.90.64.111:3000','http://127.0.0.1:3000','http://localhost:3000','http://localhost:3030']
}));

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/distributors', distributorsRoutes)
app.use('/api/clientsdistributors', clientsdistributorsRoutes)
app.use('/api/clientsnumbers', clientsNumberRoutes)
app.use('/api/process',processRoutes)
export default app



