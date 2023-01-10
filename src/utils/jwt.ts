import { RefreshToken, User } from "@prisma/client";

const jwt = require('jsonwebtoken');

function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '5m',
  });
}

function generateRefreshToken(user: User, jti: RefreshToken) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '8h',
  });
}

function generateTokens(user: User, jti: RefreshToken) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
