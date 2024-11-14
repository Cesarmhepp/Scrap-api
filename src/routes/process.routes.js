import { Router } from 'express'
import * as processCtrl from '../controlers/process.controller';
const router = Router();
import { authjwt, preFlight } from "../middlewares";

router.get('/', [authjwt.verifyToken], processCtrl.getAllNodeProcess)
router.delete('/:pid', [authjwt.verifyToken, authjwt.isAdmin], processCtrl.deleteNodeProcess)

export default router

