import { RefreshToken } from "@prisma/client";

const { db } = require('../../utils/db');
const { hashToken } = require('../../utils/hashToken');

interface RefreshTokenProps {
  jti: RefreshToken;
  refreshToken: RefreshToken;
  userId: string;
};

// used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: RefreshTokenProps) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id: string) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(userId: string) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
};
