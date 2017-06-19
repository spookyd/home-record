/**
 * Created by lukedavis on 1/10/17.
 */

import express from 'express';
import userCtrl from '../controller/user.controller';

const router = express.Router();

router.route('/login')
    /** POST api/authentication/login */
    .post(userCtrl.login);

export default router;