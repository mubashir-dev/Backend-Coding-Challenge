const jwt = require("jsonwebtoken");

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

exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(httpError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(httpError.Unauthorized(message));
    }
    req.user = payload;
    next();
  });
};

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
