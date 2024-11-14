import { Router } from 'express'
import * as clientsCtrl from '../controlers/clients.controller';
const router = Router();
import { authjwt,preFlight } from "../middlewares";

router.get('/:id', [authjwt.verifyToken], clientsCtrl.getClientsDistributors)
router.get('/', [authjwt.verifyToken], clientsCtrl.getClients)
router.post('/credentials', [authjwt.verifyToken], clientsCtrl.getClientsCredentials)

export default router