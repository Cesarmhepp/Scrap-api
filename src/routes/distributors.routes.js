import { Router } from 'express'
import * as distributorsCtrl from '../controlers/distributors.controller';
const router = Router();
import { authjwt, preFlight } from "../middlewares";

router.get('/', [authjwt.verifyToken], distributorsCtrl.getDistributors)
router.get('/client', [authjwt.verifyToken], distributorsCtrl.getDistributorsClients)
router.put('/:id', [authjwt.verifyToken], distributorsCtrl.updateDistributor)
router.post('/', [authjwt.verifyToken, authjwt.isAdmin], distributorsCtrl.createDistributor)
router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin], distributorsCtrl.deleteDistributors)

export default router