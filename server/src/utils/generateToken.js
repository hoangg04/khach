const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
// Generate access token


function generateAccessToken({ id, uuid }) {
	return jwt.sign({ id, uuid }, accessTokenSecret, { expiresIn: "3d" });
}

// Generate refresh token
function generateRefreshToken({ id, uuid }) {
	return jwt.sign({ id, uuid }, refreshTokenSecret, { expiresIn: "7d" });
}
function generateTokenPair({ id, uuid }) {
	return {
		accessToken: generateAccessToken({ id, uuid }),
		refreshToken: generateRefreshToken({ id, uuid }),
	}
}
module.exports = { generateTokenPair };
