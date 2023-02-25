const jwt = require("jsonwebtoken");
const httpError = require("http-errors");

//generating access token
exports.signAccessToken = (userPlayload) => {
  return new Promise((resolve, reject) => {
    const { id, name, role } = userPlayload;
    const options = {
      expiresIn: process.env.JWT_TIMEOUT_DURATION,
      issuer: process.env.APP_NAME,
    };
    jwt.sign(
      { id, name, role },
      process.env.JWT_SECRET,
      options,
      (error, token) => {
        if (error) {
          reject("JWT access token has not been issued");
          return;
        }
        resolve(token);
      }
    );
  });
};

//verifying verifying token
exports.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(httpError(400, "Invalid/Expired access token"));
      resolve(payload);
    });
  });
};

//generating refresh token
exports.signARefreshToken = (userPlayload) => {
  return new Promise((resolve, reject) => {
    const { id, name, role } = userPlayload;
    const options = {
      expiresIn: process.env.JWT_REFRESH_DURATION,
      issuer: process.env.APP_NAME,
    };
    jwt.sign(
      { id, name, role },
      process.env.JWT_REFRESH_SECRET,
      options,
      (error, token) => {
        if (error) {
          reject("JWT refresh token has not been issued");
          return;
        }
        resolve(token);
      }
    );
  });
};

//verifying refresh token
exports.verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (error, payload) => {
        if (error) return reject(error);
        resolve(payload);
      }
    );
  });
};
