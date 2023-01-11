import { NextFunction, Request, Response } from 'express';
const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { findUserById } = require('./users.services');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req: any, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
