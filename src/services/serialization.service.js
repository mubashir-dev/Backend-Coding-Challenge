exports.serilizeUser = (accessToken, refreshToken, user) => {
  const data = {
    tokenType: "Bearer",
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: process.env.JWT_TIMEOUT_DURATION,
    user: user,
  };
  return data;
};
