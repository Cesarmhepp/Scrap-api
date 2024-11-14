import { Router } from 'express'
import * as clientsNumbersCtrl from '../controlers/clientsNumbers.controller'

const router = Router();
import { authjwt, preFlight } from "../middlewares";

router.post('/', [authjwt.verifyToken, authjwt.isAdmin], clientsNumbersCtrl.getClientsNumbers)
router.post('/clientbycreden', [authjwt.verifyToken, authjwt.isAdmin], clientsNumbersCtrl.getClientsNumbersByCredentials)
router.post('/missingclientsnumbers', [authjwt.verifyToken, authjwt.isAdmin], clientsNumbersCtrl.getMissingClientsNumbers)
router.post('/general', [authjwt.verifyToken, authjwt.isAdmin], clientsNumbersCtrl.getClientsNumbersGeneral)

export default router