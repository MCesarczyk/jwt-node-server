import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();
const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);

router.use('/users', users);

export default router;
