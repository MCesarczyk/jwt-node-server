import { RefreshToken } from "@prisma/client";

const crypto = require('crypto');

function hashToken(token: RefreshToken) {
  return crypto.createHash('sha512').update(token).digest('hex');
}

module.exports = { hashToken };
