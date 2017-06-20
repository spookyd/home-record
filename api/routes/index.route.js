/**
 * Created by lukedavis on 6/17/17.
 */
const express = require('express')
    , eventRoutes = require('./recordEvent.route')
    , authRoutes = require('./authentication.route')
    , authMiddleware = require('../middleware/requestValidation');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.status(200).send('OK')
);

// mount auth routes at /authentication
router.use('/authentication', authRoutes);

// To apply authentication to all event actions uncomment the line below
// router.use(authMiddleware);
// mount event routes at /event
router.use('/event', eventRoutes);

module.exports = router;