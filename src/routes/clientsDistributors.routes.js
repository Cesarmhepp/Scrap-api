import { Router } from 'express'
import * as clientsDistributorsCtrl from '../controlers/clientsDistributors.controller'

const router = Router();
import { authjwt, preFlight } from "../middlewares";

router.post('/', [authjwt.verifyToken, authjwt.isAdmin], clientsDistributorsCtrl.addClientDistributor)
router.delete('/', [authjwt.verifyToken, authjwt.isAdmin], clientsDistributorsCtrl.deleteClientDistributor)

export default router