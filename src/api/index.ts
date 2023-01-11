import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();
const auth = require('./auth/auth.routes');

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);

export default router;
