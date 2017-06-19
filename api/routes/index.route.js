/**
 * Created by lukedavis on 6/17/17.
 */
import express from 'express';
import eventRoutes from './recordEvent.route';
import authRoutes from './authentication.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.status(200).send('OK')
);

// mount event routes at /event
router.use('/event', eventRoutes);

// mount auth routes at /authentication
router.use('/authentication', authRoutes);

export default router;