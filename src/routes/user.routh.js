import { Router } from 'express'
import * as userCtrl from '../controlers/users.controller';
const router = Router();
import { authjwt, verifysignup, preFlight } from "../middlewares";

router.get('/', [authjwt.verifyToken], userCtrl.getUsers)

router.post('/', [authjwt.verifyToken, authjwt.isAdmin, verifysignup.verifyDuplicateUser], userCtrl.createUser)

router.get('/:userid', [authjwt.verifyToken], userCtrl.getUserById)

router.put('/:userid', [authjwt.verifyToken, authjwt.isAdmin], userCtrl.updateUserById)

router.delete('/:userid', [authjwt.verifyToken, authjwt.isAdmin], userCtrl.deleteUserById)




export default router