import { Router } from 'express'
import * as authCtrl from '../controlers/auth.controller'
import { authjwt, preFlight } from "../middlewares";
const router = Router();

router.post("/signin", authCtrl.signIn)
router.post("/verify", authjwt.verifyPreToken)


export default router